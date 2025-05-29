use crate::traceroute::TracerouteEmitter;
use rand::random;
use std::time::Duration;
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
            "duration": duration.as_nanos(),
            "id": random::<u8>(),
        });
        self.webview_window.emit("traceroute-hop", data).unwrap();
        println!("traceroute-hop: {:?} {:?} {:?}", hop, ip, duration);
    }

    fn on_destination_reached(&self, hop: u32, ip: String, duration: Duration) {
        let data = serde_json::json!({
            "hop": hop,
            "ip": ip,
            "duration": duration.as_nanos(),
            "id": random::<u8>(),
        });
        self.webview_window
            .emit("traceroute-destination-reached", data)
            .unwrap();
        println!(
            "traceroute-destination-reached: {:?} {:?} {:?}",
            hop, ip, duration
        );
    }

    fn on_error(&self, error: String) {
        let data = serde_json::json!({
            "error": error,
            "id": random::<u8>(),
        });
        self.webview_window.emit("traceroute-error", data).unwrap();
        println!("traceroute-error: {:?}", error);
    }

    fn on_timeout(&self, hop: u32) {
        let data = serde_json::json!({
            "hop": hop,
            "id": random::<u8>(),
        });
        self.webview_window
            .emit("traceroute-timeout", data)
            .unwrap();
        println!("traceroute-timeout: {:?}", hop);
    }
}
