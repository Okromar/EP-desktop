use std::panic;
use std::thread;
use tauri::{WebviewUrl, WebviewWindowBuilder};
use tauri_plugin_opener::OpenerExt;
use windows_sys::Win32::Foundation::HWND;
use windows_sys::Win32::System::LibraryLoader::GetModuleHandleW;
use windows_sys::Win32::UI::Shell::{
    Shell_NotifyIconW, NIF_ICON, NIF_INFO, NIF_MESSAGE, NIM_ADD, NIM_DELETE, NOTIFYICONDATAW,
    NIIF_INFO,
};
use windows_sys::Win32::UI::WindowsAndMessaging::{
    CreateWindowExW, DefWindowProcW, DestroyWindow, LoadIconW, RegisterClassW, IDI_INFORMATION,
    WM_APP, WNDCLASSW, WS_OVERLAPPED,
};

fn copy_wide(src: &str, dst: &mut [u16]) {
    for (i, ch) in src.encode_utf16().enumerate() {
        if i + 1 >= dst.len() {
            break;
        }
        dst[i] = ch;
    }
}

fn show_native_windows_balloon(title: String, body: String) {
    let _ = thread::spawn(move || {
        let _ = panic::catch_unwind(|| unsafe {
            let class_name: Vec<u16> = "EphecNotifDummyClass\0".encode_utf16().collect();
            let hinstance = GetModuleHandleW(std::ptr::null());

            let wc = WNDCLASSW {
                style: 0,
                lpfnWndProc: Some(DefWindowProcW),
                cbClsExtra: 0,
                cbWndExtra: 0,
                hInstance: hinstance,
                hIcon: std::ptr::null_mut(),
                hCursor: std::ptr::null_mut(),
                hbrBackground: std::ptr::null_mut(),
                lpszMenuName: std::ptr::null(),
                lpszClassName: class_name.as_ptr(),
            };
            RegisterClassW(&wc);

            let hwnd: HWND = CreateWindowExW(
                0,
                class_name.as_ptr(),
                class_name.as_ptr(),
                WS_OVERLAPPED,
                0,
                0,
                0,
                0,
                std::ptr::null_mut(),
                std::ptr::null_mut(),
                hinstance,
                std::ptr::null_mut(),
            );

            if hwnd.is_null() {
                return;
            }

            let mut nid: NOTIFYICONDATAW = std::mem::zeroed();
            nid.cbSize = std::mem::size_of::<NOTIFYICONDATAW>() as u32;
            nid.hWnd = hwnd;
            nid.uID = 1;
            nid.uFlags = NIF_MESSAGE | NIF_ICON | NIF_INFO;
            nid.uCallbackMessage = WM_APP + 1;
            nid.hIcon = LoadIconW(std::ptr::null_mut(), IDI_INFORMATION);
            nid.dwInfoFlags = NIIF_INFO;

            copy_wide(&title, &mut nid.szInfoTitle);
            copy_wide(&body, &mut nid.szInfo);
            copy_wide("ePerso — EPHEC", &mut nid.szTip);

            Shell_NotifyIconW(NIM_ADD, &nid);
            thread::sleep(std::time::Duration::from_secs(6));
            Shell_NotifyIconW(NIM_DELETE, &nid);
            DestroyWindow(hwnd);
        });
    });
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            let app_handle = app.handle().clone();

            WebviewWindowBuilder::new(
                app,
                "main",
                WebviewUrl::External("https://eperso.ephec.be/".parse().unwrap()),
            )
            .title("ePerso — EPHEC")
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
                    show_native_windows_balloon(notif_title, notif_body);
                    let _ = window.set_title("ePerso — EPHEC");
                }
            })
            .initialization_script(include_str!("../custom-ui.js"))
            .build()?;

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("Erreur au lancement de l'application Tauri");
}
