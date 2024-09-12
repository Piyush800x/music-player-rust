use cpal::traits::{DeviceTrait, HostTrait};
use tauri::{command, State};
use std::fs;
use std::fs::File;
use std::io::{Read, Write};
use std::path::PathBuf;
use serde::{Deserialize, Serialize};
use serde::de::Unexpected::Str;
use serde_json::Value::String as SerdeString;
use std::string::String;
use std::sync::{Arc, Mutex};


#[derive(Serialize, Deserialize)]
pub struct FolderPath {
    pub path: String,
}

pub fn get_audio_devices() -> Vec<String> {
    const ARRAY_REPEAT_VALUE: String = String::new();
    let mut devices: Vec<String> = Vec::new();
    let host = cpal::default_host();
    for device in host.output_devices().unwrap() {
        // println!("Output device: {:?}", device.name());
        devices.push(device.name().unwrap());
    }
    return devices;
}

#[command]
pub fn get_audio_files() -> Result<Vec<String>, String> {
    let mut directory = get_music_path_locally().unwrap().path;
    let mut paths = Vec::new();
    let dir_path = PathBuf::from(&directory);

    if dir_path.is_dir() {
        for entry in std::fs::read_dir(dir_path).map_err(|_| "Directory not found".to_string()).unwrap() {
            if let Ok(entry) = entry {
                let path = entry.path();
                if path.is_file() {
                    if let Ok(relative_path) = path.strip_prefix(&directory) {
                        paths.push(relative_path.to_string_lossy().to_string());
                    }
                }
            }
        }
    }

    return Ok(paths);
}

#[command]
pub fn save_music_path(folder_path: FolderPath) -> Result<(), String> {
    let json_data = serde_json::to_string(&folder_path).map_err(|e| e.to_string()).unwrap();
    let mut file = File::create("config.json").map_err(|e| e.to_string()).unwrap();
    file.write_all(json_data.as_bytes()).map_err(|e| e.to_string()).unwrap();

    Ok(())
}

#[command]
pub fn get_music_path() -> Result<FolderPath, String> {
    let mut file = File::open("config.json").map_err(|_| "Config file doesn't exist".to_string()).unwrap();
    let mut contents = String::new();
    file.read_to_string(&mut contents).map_err(|e| e.to_string()).unwrap();
    let folder_path: FolderPath = serde_json::from_str(&contents).map_err(|e| e.to_string()).unwrap();

    // let mut dir = base_directory.lock().unwrap();
    // *dir = folder_path.path.clone();
// base_directory: State<Arc<Mutex<String>>>
    return Ok(folder_path);
}

#[command]
pub fn get_music_path_locally() -> Result<FolderPath, String> {
    let mut file = File::open("config.json").map_err(|_| "Config file doesn't exist".to_string()).unwrap();
    let mut contents = String::new();
    file.read_to_string(&mut contents).map_err(|e| e.to_string()).unwrap();
    let folder_path: FolderPath = serde_json::from_str(&contents).map_err(|e| e.to_string()).unwrap();

    return Ok(folder_path);
}