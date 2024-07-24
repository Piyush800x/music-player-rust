import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";


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