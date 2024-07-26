import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import Image from "next/image";
import RecentlyPlayed from "@/components/Home/RecentlyPlayed";
import MusicPlayer, {CustomMusicPlayer} from "@/components/MusicPlayer";

export default function Home() {
  return (
    <main className="flex justify-center">
      <div>
        <Navbar/>
      </div>
      <div className="flex flex-col">
        <SearchBar/>
        <RecentlyPlayed/>
      </div>
      <div className="sticky bottom-5">
        <CustomMusicPlayer/>
      </div>
    </main>
  );
}
