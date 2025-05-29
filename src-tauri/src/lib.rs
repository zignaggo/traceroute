mod traceroute;
mod webview_traceroute_emitter;
use traceroute::traceroute_with_emitter;
use webview_traceroute_emitter::TracerouteWebViewEmitter;

#[tauri::command]
async fn trace(webview_window: tauri::WebviewWindow, value: &str) -> Result<(), String> {
    let emitter = TracerouteWebViewEmitter::new(webview_window);
    traceroute_with_emitter(value, None, None, emitter);
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
