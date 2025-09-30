import Image from "next/image";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const Logo = () => {
    console.log("Logo component is rendering"); 
    return (
        <div className="flex flex-col items-center gap-y-4">
            <div className="bg-white rounded-full p-1">
                <Image
                    src="/logo.jpg"
                    alt="logo"
                    width={48}
                    height={48}
                    className="rounded-full"
                />
            </div>
            <div className="flex flex-col items-center">
                <p className={cn("text-xl font-bold", font.className)}>
                    ThRRvillage
                </p>
                <p className={cn("text-sm text-muted-foreground", font.className)}>
                    Let's play together!!!
                </p>
            </div>
        </div>
    )
}