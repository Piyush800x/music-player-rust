use cpal::traits::{DeviceTrait, HostTrait};


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