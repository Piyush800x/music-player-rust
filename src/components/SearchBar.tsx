import { ModeToggle } from "./Home/ToggleTheme"
import { Input } from "./ui/input"

export default function SearchBar() {
  return (
    (
      <div className="flex h-16 shrink-0 items-center  ml-auto">
        <div className="relative flex flex-row max-w-md">
          <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search" className="w-full rounded-lg bg-background pl-8 transition-all focus-within:border-2 focus-within:border-blue-200" />
          <div className="px-5">
            <ModeToggle/>
          </div>
        </div>
      </div>
    )
  )
}
