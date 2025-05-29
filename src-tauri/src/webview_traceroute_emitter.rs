use std::time::Duration;

use crate::traceroute::TracerouteEmitter;
use tauri::Emitter;

pub struct TracerouteWebViewEmitter {
    webview_window: tauri::WebviewWindow,
}

impl TracerouteWebViewEmitter {
    pub fn new(webview_window: tauri::WebviewWindow) -> Self {
        Self { webview_window }
    }
}

impl TracerouteEmitter for TracerouteWebViewEmitter {
    fn on_hop(&self, hop: u32, ip: String, duration: Duration) {
        let data = serde_json::json!({
            "hop": hop,
            "ip": ip,
            "duration": duration.as_millis(),
        });
        self.webview_window.emit("traceroute-hop", data).unwrap();
    }

    fn on_destination_reached(&self, hop: u32, ip: String, duration: Duration) {
        let data = serde_json::json!({
            "hop": hop,
            "ip": ip,
            "duration": duration.as_millis(),
        });
        self.webview_window
            .emit("traceroute-destination-reached", data)
            .unwrap();
    }

    fn on_error(&self, error: String) {
        let data = serde_json::json!({
            "error": error,
        });
        self.webview_window.emit("traceroute-error", data).unwrap();
    }

    fn on_timeout(&self, hop: u32) {
        let data = serde_json::json!({
            "type": "timeout",
            "hop": hop,
        });
        self.webview_window
            .emit("traceroute-timeout", data)
            .unwrap();
    }
}
