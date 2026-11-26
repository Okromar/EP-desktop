use std::panic;
use std::thread;
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

pub fn show_native_windows_balloon(title: String, body: String) {
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
