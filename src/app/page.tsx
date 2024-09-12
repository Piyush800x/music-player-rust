import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import Image from "next/image";
import RecentlyPlayed from "@/components/Home/RecentlyPlayed";
import {CustomMusicPlayer} from "@/components/MusicPlayer";
import MainSettings from "@/components/Settings/MainSettings";

export default function Home() {
  return (
    <main className="flex justify-center">
      <div>
        <Navbar/>
      </div>
      <div className="flex flex-col w-full">
        {/* <div className="flex justify-end items-end">
          
        </div> */}
        <SearchBar/>
        {/* <RecentlyPlayed/> */}
        <MainSettings/>
      </div>
      <div className="sticky bottom-5">
        <CustomMusicPlayer/>
      </div>
    </main>
  );
}
