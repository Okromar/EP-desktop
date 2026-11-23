use tauri::Manager;
use tauri_plugin_opener::OpenerExt;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            let app_handle = app.handle().clone();

            if let Some(window) = app.get_webview_window("main") {
                window.on_navigation(move |url| {
                    let host = url.host_str().unwrap_or("");

                    let allowed_in_app = host.ends_with("ephec.be")
                        || host.ends_with("microsoftonline.com")
                        || host.ends_with("msauth.net")
                        || host.ends_with("msftauth.net")
                        || host.ends_with("live.com");

                    if allowed_in_app {
                        true
                    } else {
                        let _ = app_handle
                            .opener()
                            .open_url(url.as_str(), None::<&str>);
                        false
                    }
                });
            }

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("Erreur au lancement de l'application Tauri");
}
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("Erreur au lancement de l'application Tauri");
}
