mod notif;

use tauri::{WebviewUrl, WebviewWindowBuilder};
use tauri_plugin_opener::OpenerExt;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            let app_handle = app.handle().clone();

            WebviewWindowBuilder::new(
                app,
                "main",
                WebviewUrl::App("index.html".into()),
            )
            .title("EPHEC Desktop")
            .inner_size(1280.0, 840.0)
            .min_inner_size(900.0, 600.0)
            .center()
            .on_navigation(move |url| {
                let host = url.host_str().unwrap_or("");
                let allowed = host.ends_with("ephec.be")
                    || host.ends_with("microsoft.com")
                    || host.ends_with("microsoftonline.com")
                    || host.ends_with("msauth.net")
                    || host.ends_with("live.com");

                if !allowed {
                    let _ = app_handle.opener().open_url(url.as_str(), None::<&str>);
                    return false;
                }
                true
            })
            .on_document_title_changed(|window, title| {
                if let Some(payload) = title.strip_prefix("EPHEC_NOTIF|") {
                    let parts: Vec<&str> = payload.splitn(2, '|').collect();
                    let notif_title = parts.first().copied().unwrap_or("ePerso — EPHEC").to_string();
                    let notif_body = parts.get(1).copied().unwrap_or("").to_string();
                    notif::show_native_windows_balloon(notif_title, notif_body);
                    let _ = window.set_title("EPHEC Desktop");
                }
            })
            .initialization_script(include_str!("../custom-ui.js"))
            .initialization_script(include_str!("../custom-notes.js"))
            .initialization_script(include_str!("../custom-settings.js"))
            .build()?;

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("Erreur au lancement de l'application Tauri");
}
