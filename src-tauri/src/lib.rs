mod traceroute;

#[tauri::command]
async fn trace(webview_window: tauri::WebviewWindow, value: &str) -> Result<(), String> {
    traceroute::traceroute::trace(webview_window, value.to_string());
    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![trace])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
