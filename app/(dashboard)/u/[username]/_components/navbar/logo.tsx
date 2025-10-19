import Image from "next/image";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const Logo = () => {
    console.log("Logo component is rendering"); 
    return (
        <Link href="/">
            <div className="flex items-center gap-x-4 hover:opacity-75 transition">
                <div className="bg-white rounded-full p-1 mr-12 shrink-0 lg:mr-0 lg:shrink">
                    <Image
                        src="/logo.jpg"
                        alt="logo"
                        width={32}
                        height={32}
                        className="rounded-full"
                    />
                </div>
                <div className={cn("hidden lg:block", font.className)}>
                    <p className="text-lg font-semibold">GameHub</p>
                    <p className="text-xs text-muted-foreground">creator Dashboard</p>
                </div>
            </div>
        </Link>
    )
}