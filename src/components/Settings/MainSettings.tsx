'use client';

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "../ui/button"
import { useState } from "react";
import { invoke } from '@tauri-apps/api/tauri';


export default function MainSettings() {
    const [path, setPath] = useState('');

    const handleSubmit = async (event:any) => {
        event.preventDefault();
        try {
            await invoke('save_music_path', {folderPath: { path }});
            console.log(`Data saved`)
            alert("data saved");
        }
        catch (error) {
            console.error(`Unknown Error ${error}`);
        }
    }
    
    return (
        <div className="flex flex-col">
            <div className="flex flex-row justify-between">
                <div className="grid w-full max-w-sm gap-y-2 ml-72">
                    <Label htmlFor="music">Music Folder Path</Label>
                    <Input id="music" type="folder" value={path} onChange={(e) => setPath(e.target.value)}/>
                </div>
                <Button onClick={handleSubmit} className="mt-5 px-5 mx-5">Save</Button>
            </div>
        </div>
    )
}