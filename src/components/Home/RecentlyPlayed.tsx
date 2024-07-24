import Link from "next/link"

export default function RecentlyPlayed() {
    return (
        <div className="ml-64 flex-1 bg-muted/40 p-4 md:p-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Recently Played</h2>
            <Link href="#" className="text-primary" prefetch={false}>
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div className="group relative flex flex-col items-start rounded-lg overflow-hidden">
              <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                <span className="sr-only">View song</span>
              </Link>
              <img
                src="/placeholder.svg"
                alt="Song cover"
                width={200}
                height={200}
                className="w-full h-[200px] object-cover rounded-lg"
              />
              <div className="mt-2 flex flex-col gap-1">
                <h3 className="text-base font-medium line-clamp-1">Melodic Sunrise</h3>
                <p className="text-sm text-muted-foreground line-clamp-1">Jared Palmer</p>
              </div>
            </div>
            <div className="group relative flex flex-col items-start rounded-lg overflow-hidden">
              <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                <span className="sr-only">View song</span>
              </Link>
              <img
                src="/placeholder.svg"
                alt="Song cover"
                width={200}
                height={200}
                className="w-full h-[200px] object-cover rounded-lg"
              />
              <div className="mt-2 flex flex-col gap-1">
                <h3 className="text-base font-medium line-clamp-1">Euphonic Beats</h3>
                <p className="text-sm text-muted-foreground line-clamp-1">Delba</p>
              </div>
            </div>
            <div className="group relative flex flex-col items-start rounded-lg overflow-hidden">
              <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                <span className="sr-only">View song</span>
              </Link>
              <img
                src="/placeholder.svg"
                alt="Song cover"
                width={200}
                height={200}
                className="w-full h-[200px] object-cover rounded-lg"
              />
              <div className="mt-2 flex flex-col gap-1">
                <h3 className="text-base font-medium line-clamp-1">Ambient Soundscapes</h3>
                <p className="text-sm text-muted-foreground line-clamp-1">Lee Robinson</p>
              </div>
            </div>
            <div className="group relative flex flex-col items-start rounded-lg overflow-hidden">
              <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                <span className="sr-only">View song</span>
              </Link>
              <img
                src="/placeholder.svg"
                alt="Song cover"
                width={200}
                height={200}
                className="w-full h-[200px] object-cover rounded-lg"
              />
              <div className="mt-2 flex flex-col gap-1">
                <h3 className="text-base font-medium line-clamp-1">Melodic Bliss</h3>
                <p className="text-sm text-muted-foreground line-clamp-1">Vercel</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}