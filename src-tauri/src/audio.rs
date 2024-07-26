use cpal::traits::{DeviceTrait, HostTrait};
use tauri::command;
use std::fs;
use std::path::PathBuf;

const BASE_DIRECTORY: &str = "E:/Musics/Others";

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
pub fn get_audio_files(directory: String) -> Vec<String> {
    let mut paths = Vec::new();
    let dir_path = PathBuf::from(&directory);

    if dir_path.is_dir() {
        for entry in std::fs::read_dir(dir_path).expect("Directory not found") {
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

    return paths;

}