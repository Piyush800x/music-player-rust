// Prevents additional console window on Windows in release, DO NOT REMOVE!!
// #![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

pub mod audio;
mod playback;
// use crate::audio2::{
//     load_playlist, next_song, pause_audio, play_audio, previous_song, resume_audio, set_volume,
//     AudioState,
// };
use crate::playback::play;

use audio::{get_audio_devices, get_audio_files, get_music_path, save_music_path, FolderPath};
use std::fs::File;
use std::io::{Read, Seek, SeekFrom};
use std::path::PathBuf;
use std::sync::mpsc::channel;
use std::sync::{Arc, Mutex};
use std::thread;
use tiny_http::{Header, Response, Server};
use tokio::runtime::Runtime;
use warp::{http::StatusCode, Filter, Rejection, Reply};

// Using http stream
// fn main() {
//     let mut base_directory = get_music_path().unwrap().path;
//     let mut value = base_directory.clone();

//     // let base_directory_clone = Arc::clone(&base_directory);

//     // Start the HTTP server in a separate thread
//     thread::spawn(move || {
//         let server = Server::http("0.0.0.0:3001").unwrap();
//         for request in server.incoming_requests() {
//             let url_path = request.url().trim_start_matches('/');
//             let decoded_path = urlencoding::decode(url_path).unwrap();

//             // let base_directory = base_directory_clone.lock().unwrap().clone();
//             let file_path = PathBuf::from(value.clone()).join(decoded_path.as_ref());

//             let response = if file_path.is_file() {
//                 match File::open(&file_path) {
//                     Ok(mut file) => {
//                         let mut buffer = Vec::new();
//                         file.read_to_end(&mut buffer).unwrap();
//                         Response::from_data(buffer)
//                     }
//                     Err(_) => Response::from_data("Internal Server Error".as_bytes().to_vec())
//                         .with_status_code(500),
//                 }
//             } else {
//                 Response::from_data("File not found".as_bytes().to_vec()).with_status_code(404)
//             };
//             request.respond(response).unwrap();
//         }
//     });

//     tauri::Builder::default()
//         .manage(base_directory)
//         .invoke_handler(tauri::generate_handler![
//             get_audio_files,
//             save_music_path,
//             get_music_path
//         ])
//         .run(tauri::generate_context!())
//         .expect("error while running tauri application");
// }

// using wrap stream

fn parse_range(range: &str, file_size: u64) -> Option<(u64, u64)> {
    if range.starts_with("bytes=") {
        let range = &range[6..]; // Strip "bytes="
        let parts: Vec<&str> = range.split('-').collect();
        if let (Some(start), Some(end)) = (parts.get(0), parts.get(1)) {
            let start: u64 = start.parse().ok()?;
            let end: u64 = if end.is_empty() {
                file_size - 1
            } else {
                end.parse().ok()?
            };
            if start <= end && end < file_size {
                return Some((start, end));
            }
        }
    }
    None
}

fn main() {
    let mut base_directory = get_music_path().unwrap().path;
    let mut value = base_directory.clone();

    // let base_directory_clone = Arc::clone(&base_directory);

    // Start the HTTP server in a separate thread
    thread::spawn(move || {
        let server = Server::http("0.0.0.0:3001").unwrap();
        for request in server.incoming_requests() {
            let url_path = request.url().trim_start_matches('/');
            let decoded_path = urlencoding::decode(url_path).unwrap();
            let file_path = PathBuf::from(value.clone()).join(decoded_path.as_ref());

            if file_path.is_file() {
                let file_size = std::fs::metadata(&file_path).unwrap().len();
                let mut file = File::open(&file_path).unwrap();

                // Handle byte-range requests
                let mut response = if let Some(range) =
                    request.headers().iter().find(|h| h.field.equiv("Range"))
                {
                    let range_header = range.value.as_str();
                    if let Some((start, end)) = parse_range(range_header, file_size) {
                        // Adjust the file read position
                        file.seek(SeekFrom::Start(start)).unwrap();

                        // Determine the number of bytes to read
                        let length = end - start + 1;
                        let mut buffer = vec![0; length as usize];
                        file.read_exact(&mut buffer).unwrap();

                        Response::from_data(buffer)
                            .with_status_code(206) // Partial Content
                            .with_header(
                                Header::from_bytes(
                                    "Content-Range",
                                    format!("bytes {}-{}/{}", start, end, file_size),
                                )
                                .unwrap(),
                            )
                    } else {
                        Response::from_data("Invalid Range".as_bytes().to_vec())
                            .with_status_code(416) // Range Not Satisfiable
                    }
                } else {
                    // No Range header, serve the full file
                    let mut buffer = Vec::new();
                    file.read_to_end(&mut buffer).unwrap();
                    Response::from_data(buffer)
                };

                response.add_header(Header::from_bytes("Accept-Ranges", "bytes").unwrap());
                request.respond(response).unwrap();
            } else {
                let response =
                    Response::from_data("File not found".as_bytes().to_vec()).with_status_code(404);
                request.respond(response).unwrap();
            }
        }
    });

    tauri::Builder::default()
        .manage(base_directory)
        .invoke_handler(tauri::generate_handler![
            get_audio_files,
            save_music_path,
            get_music_path
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

// fn main() {
//     // println!("{:?}", get_audio_devices());
//     // println!("{:?}", get_audio_files("E:\\Musics\\Others".to_string()));
//     play();
// }
