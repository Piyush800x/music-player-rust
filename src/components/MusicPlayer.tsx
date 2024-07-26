'use client';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import AudioPlayer, {RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useEffect, useState } from "react";
import { invoke } from '@tauri-apps/api/tauri';

export default function MusicPlayer() {
    return (
      <div className="fixed bottom-20 left-0 right-0 bg-background border-t flex items-center justify-between px-6 pt-4 pb-4">
        <div className="flex w-full items-center gap-4">
            <div className="flex w-full items-center gap-2">
                <span className="text-sm text-muted-foreground">0:30</span>
                <Progress value={50} className="flex-1 h-1" />
                <span className="text-sm text-muted-foreground">3:45</span>
            </div>
        </div>
      <div className="fixed bottom-0 left-0 right-0 bg-background flex items-center justify-between px-6 py-6">
          <div className="flex items-center gap-4">
            <img src="/placeholder.svg" alt="Song cover" width={50} height={50} className="rounded-md" />
              <div>
                  <h3 className="text-base font-medium line-clamp-1">Melodic Sunrise</h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">Jared Palmer</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button size="icon" variant="ghost">
                  <ShuffleIcon className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost">
                  <SkipBackIcon className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost">
                  <PlayIcon className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost">
                  <SkipForwardIcon className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost">
                  <RepeatIcon className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Volume2Icon className="h-5 w-5" />
              <Slider
                  defaultValue={[50]}
                  max={100}
                  step={1}
                  className="w-24 [&>span:first-child]:h-1 [&>span:first-child]:bg-muted-foreground [&_[role=slider]]:bg-primary [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-primary [&_[role=slider]:focus-visible]:ring-0 [&_[role=slider]:focus-visible]:ring-offset-0 [&_[role=slider]:focus-visible]:scale-105 [&_[role=slider]:focus-visible]:transition-transform"
              />
          </div>
      </div>
      </div>
    )
}

export const CustomMusicPlayer = () =>  {
  const [tracks, setTracks] = useState<String[]>([])
  const [currentTrack, setCurrentTrack] = useState<null | String>(null)

  useEffect(() => {
    async function fetchMusicFiles() {
      try {
        const musicFiles = await invoke('get_audio_files', { directory: 'E:/Musics/Others' });
        console.log(musicFiles);
        const musicFilesUrls = musicFiles.map(file => `http://localhost:3001/${encodeURIComponent(file)}`);
        setTracks(musicFilesUrls);
        if (musicFilesUrls.length > 0) setCurrentTrack(musicFilesUrls[0]);
      } catch (error) {
        console.error('Error fetching music files:', error);
      }
    }

    fetchMusicFiles();
  }, [])

  const handleClickPrevious = () => {
    const currentIndex = tracks.indexOf(currentTrack);
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    setCurrentTrack(tracks[prevIndex]);
  }

  const handleClickNext = () => {
    const currentIndex = tracks.indexOf(currentTrack);
    const nextIndex = (currentIndex + 1) % tracks.length;
    setCurrentTrack(tracks[nextIndex]);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background flex items-center justify-between px-6 py-6">
      <AudioPlayer 
      src={`${currentTrack}`}
      onClickNext={handleClickNext}
      onClickPrevious={handleClickPrevious}
      showSkipControls={true}
      showJumpControls={false}
      header={"Here goes song name"}
      customIcons={{
        play: <PlayIcon/>,
        pause: <PauseIcon/>,
        next: <SkipForwardIcon/>,
        previous: <SkipBackIcon/>,
        loop: <RepeatIcon/>,
        // loopOff: ,
        volume: <Volume2Icon/>,
        volumeMute: <VolumeOff/>,

      }}
      />
    </div>
  )
}

function MaximizeIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 3H5a2 2 0 0 0-2 2v3" />
        <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
        <path d="M3 16v3a2 2 0 0 0 2 2h3" />
        <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
      </svg>
    )
}

function PlayIcon(props: any) {
    return (
      <svg
      {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="6 3 20 12 6 21 6 3" />
      </svg>
    )
}

function PauseIcon(props: any) {
  return (
    <svg 
    width="24" 
    height="24" 
    viewBox="0 0 15 15" 
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg">
      <path d="M6.04995 2.74998C6.04995 2.44623 5.80371 2.19998 5.49995 2.19998C5.19619 2.19998 4.94995 2.44623 4.94995 2.74998V12.25C4.94995 12.5537 5.19619 12.8 5.49995 12.8C5.80371 12.8 6.04995 12.5537 6.04995 12.25V2.74998ZM10.05 2.74998C10.05 2.44623 9.80371 2.19998 9.49995 2.19998C9.19619 2.19998 8.94995 2.44623 8.94995 2.74998V12.25C8.94995 12.5537 9.19619 12.8 9.49995 12.8C9.80371 12.8 10.05 12.5537 10.05 12.25V2.74998Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
    </svg>
  )
}


function RepeatIcon(props: any) {
    return (
      <svg
      {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m17 2 4 4-4 4" />
        <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
        <path d="m7 22-4-4 4-4" />
        <path d="M21 13v1a4 4 0 0 1-4 4H3" />
      </svg>
    )
}

function ShuffleIcon(props: any) {
    return (
      <svg
      {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22" />
        <path d="m18 2 4 4-4 4" />
        <path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2" />
        <path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8" />
        <path d="m18 14 4 4-4 4" />
      </svg>
    )
}
  
  
function SkipBackIcon(props: any) {
    return (
      <svg
      {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="19 20 9 12 19 4 19 20" />
        <line x1="5" x2="5" y1="19" y2="5" />
      </svg>
    )
}
  
  
function SkipForwardIcon(props: any) {
    return (
      <svg
      {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="5 4 15 12 5 20 5 4" />
        <line x1="19" x2="19" y1="5" y2="19" />
      </svg>
    )
}
  
  
function Volume2Icon(props: any) {
    return (
      <svg
      {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      </svg>
    )
}

function VolumeOff(props: any) {
  return (
    <svg 
      width="18"
      height="18"
      viewBox="0 0 15 15"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M7.72361 1.05279C7.893 1.13749 8 1.31062 8 1.5V13.5C8 13.6894 7.893 13.8625 7.72361 13.9472C7.55421 14.0319 7.35151 14.0136 7.2 13.9L3.33333 11H1.5C0.671573 11 0 10.3284 0 9.5V5.5C0 4.67158 0.671573 4 1.5 4H3.33333L7.2 1.1C7.35151 0.986371 7.55421 0.968093 7.72361 1.05279ZM7 2.5L3.8 4.9C3.71345 4.96491 3.60819 5 3.5 5H1.5C1.22386 5 1 5.22386 1 5.5V9.5C1 9.77614 1.22386 10 1.5 10H3.5C3.60819 10 3.71345 10.0351 3.8 10.1L7 12.5V2.5ZM14.8536 5.14645C15.0488 5.34171 15.0488 5.65829 14.8536 5.85355L13.2071 7.5L14.8536 9.14645C15.0488 9.34171 15.0488 9.65829 14.8536 9.85355C14.6583 10.0488 14.3417 10.0488 14.1464 9.85355L12.5 8.20711L10.8536 9.85355C10.6583 10.0488 10.3417 10.0488 10.1464 9.85355C9.95118 9.65829 9.95118 9.34171 10.1464 9.14645L11.7929 7.5L10.1464 5.85355C9.95118 5.65829 9.95118 5.34171 10.1464 5.14645C10.3417 4.95118 10.6583 4.95118 10.8536 5.14645L12.5 6.79289L14.1464 5.14645C14.3417 4.95118 14.6583 4.95118 14.8536 5.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
    </svg>
  )
}