use std::fs::File;
use std::io::BufReader;
use rodio::{Decoder, OutputStream, source::Source};
use crate::audio::{get_music_path_locally, get_audio_files, FolderPath, get_music_path};
use std::path::PathBuf;
use std::fs;

pub fn play() {
    match get_music_path() {
        Ok(folder_path) => {
            let dir = PathBuf::from(folder_path.path);

            // Debugging output to check the directory path
            println!("Attempting to open directory: {:?}", dir);

            // Ensure the directory exists
            if !dir.is_dir() {
                println!("The path is not a valid directory: {:?}", dir);
                return;
            }

            // Find the first audio file in the directory
            let audio_file = match fs::read_dir(&dir) {
                Ok(entries) => entries.filter_map(Result::ok)
                    .find(|entry| {
                        let path = entry.path();
                        if path.is_file() {
                            if let Some(extension) = path.extension() {
                                let ext_str = extension.to_str().unwrap_or("").to_lowercase().trim().to_string();
                                return ext_str == "flac";
                            }
                        }
                        false
                    }),
                Err(e) => {
                    println!("Failed to read directory: {:?}", e);
                    return;
                }
            };

            let audio_file_path = match audio_file {
                Some(file) => file.path(),
                None => {
                    println!("No audio files found in directory: {:?}", dir);
                    return;
                }
            };

            println!("Playing audio file: {:?}", audio_file_path);

            let file = match File::open(&audio_file_path) {
                Ok(file) => BufReader::new(file),
                Err(e) => {
                    println!("Failed to open file: {:?}", e);
                    return;
                }
            };

            // Get an output stream handle to the default physical sound device
            let (_stream, stream_handle) = match OutputStream::try_default() {
                Ok(output) => output,
                Err(e) => {
                    println!("Failed to get default output stream: {:?}", e);
                    return;
                }
            };

            // Decode that sound file into a source
            let source = match Decoder::new(file) {
                Ok(source) => source,
                Err(e) => {
                    println!("Failed to decode file: {:?}", e);
                    return;
                }
            };

            // Play the sound directly on the device
            if let Err(e) = stream_handle.play_raw(source.convert_samples()) {
                println!("Failed to play sound: {:?}", e);
                return;
            }

            // Keep the main thread alive while the sound plays
            std::thread::sleep(std::time::Duration::from_secs(100));
        }
        Err(e) => println!("Error retrieving music path: {:?}", e),
    }

}