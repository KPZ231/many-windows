// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

use tauri::{WebviewUrl, WebviewWindowBuilder};
use tauri::{AppHandle, Manager};

// Floating window function built in Rust
#[tauri::command]
fn floating(app: AppHandle) -> tauri::Result<()> {
    match app.webview_windows().get("floating") {
        None => {
            WebviewWindowBuilder::new(&app, "floating", WebviewUrl::App("index.html".into()))
                .always_on_top(true)
                .decorations(false)
                .inner_size(400.0, 400.0)
                .position(0.0, 0.0)
                .build()?;
        }
        Some(window) => {
            window.close()?;
        }
    }
    Ok(())
}
 

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![floating])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
