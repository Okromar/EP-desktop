use std::os::windows::process::CommandExt;
use std::process::Command;
use tauri::{WebviewUrl, WebviewWindowBuilder};
use tauri_plugin_opener::OpenerExt;

const CREATE_NO_WINDOW: u32 = 0x08000000;

#[tauri::command]
fn send_win_notif(title: String, body: String) {
    let safe_title = title.replace('"', "'");
    let safe_body = body.replace('"', "'");

    let ps_script = format!(
        r#"
        [Windows.UI.Notifications.ToastNotificationManager, Windows.UI.Notifications, ContentType = WindowsRuntime] | Out-Null
        [Windows.Data.Xml.Dom.XmlDocument, Windows.Data.Xml.Dom.XmlDocument, ContentType = WindowsRuntime] | Out-Null
        $template = @"
<toast>
  <visual>
    <binding template="ToastGeneric">
      <text>{0}</text>
      <text>{1}</text>
    </binding>
  </visual>
</toast>
"@
        $xml = New-Object Windows.Data.Xml.Dom.XmlDocument
        $xml.LoadXml($template)
        $appId = '{{1AC14E77-02E7-4E5D-B744-2EB1AE5198B7}}\WindowsPowerShell\v1.0\powershell.exe'
        $notifier = [Windows.UI.Notifications.ToastNotificationManager]::CreateToastNotifier($appId)
        $toast = [Windows.UI.Notifications.ToastNotification]::new($xml)
        $notifier.Show($toast)
        "#,
        safe_title, safe_body
    );

    let _ = Command::new("powershell")
        .args(["-NoProfile", "-WindowStyle", "Hidden", "-Command", &ps_script])
        .creation_flags(CREATE_NO_WINDOW)
        .spawn();
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_notification::init())
        .invoke_handler(tauri::generate_handler![send_win_notif])
        .setup(|app| {
            let _app_handle = app.handle().clone();

            WebviewWindowBuilder::new(
                app,
                "main",
                WebviewUrl::External("https://eperso.ephec.be/".parse().unwrap()),
            )
            .title("ePerso — EPHEC")
            .inner_size(1280.0, 840.0)
            .min_inner_size(900.0, 600.0)
            .center()
            .initialization_script(include_str!("../custom-ui.js"))
            .build()?;

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("Erreur au lancement de l'application Tauri");
}
