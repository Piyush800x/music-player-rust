// Prevents additional console window on Windows in release, DO NOT REMOVE!!
// #![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

pub mod audio;

use audio::{get_audio_devices, get_audio_files};
use tiny_http::{Server, Response};
use std::sync::mpsc::channel;
use std::thread;
use std::fs::File;
use std::io::{Cursor, Read};
use std::path::PathBuf;

const BASE_DIRECTORY: &str = "E:\\Musics\\Others";

fn main() {

    // Start the HTTP server in a separate thread
    thread::spawn(move || {
        let server = Server::http("0.0.0.0:3001").unwrap();
        for request in server.incoming_requests() {
            let url_path = request.url().trim_start_matches('/');
            let decoded_path = urlencoding::decode(url_path).unwrap();
            let file_path = PathBuf::from(BASE_DIRECTORY).join(decoded_path.as_ref());

            let response = if file_path.is_file() {
                match File::open(&file_path) {
                    Ok(mut file) => {
                        let mut buffer = Vec::new();
                        file.read_to_end(&mut buffer).unwrap();
                        Response::from_data(buffer)
                    }
                    Err(_) => Response::from_data("Internal Server Error".as_bytes().to_vec()).with_status_code(500),
                }
            } else {
                Response::from_data("File not found".as_bytes().to_vec()).with_status_code(404)
            };
            request.respond(response).unwrap();
        }
    });


    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_audio_files])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

// fn main() {
//     // println!("{:?}", get_audio_devices());
//     println!("{:?}", get_audio_files("E:\\Musics\\Others".to_string()));
// }
