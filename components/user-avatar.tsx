import { cva, VariantProps } from "class-variance-authority";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";
import { LiveBadge } from "./live-badge";
import { Skeleton } from "./ui/skeleton";

interface UserAvatarProps extends VariantProps<typeof avatarSizes> {
    username: string;
    imageUrl: string;
    isLive?: boolean;
    showBadge?: boolean;
}
// let's build our avatarsize
const avatarSizes = cva(
    "",
    {
        variants: {
            size: {
                default: "h-8 w-8",
                lg: "h-14 w-14",
                xl: "h-20 w-20",
            }
        },
        defaultVariants: {
            size: "default",
        },
    },
);


export const UserAvatar = ({ username, imageUrl, isLive, showBadge, size}: UserAvatarProps)  =>{
    const canShowBadge = showBadge && isLive;
    return(
        <div className="relative"> 
          <Avatar 
          className={cn(isLive && "ring-2 ring-rose-500 border border-background", avatarSizes({size}))}>
            <AvatarImage src={imageUrl} alt={username} className="object-cover" />
            <AvatarFallback>
                {username[0]}
                {username[username.length - 1]}
            </AvatarFallback>
          </Avatar>
          {canShowBadge && (
            <div 
            className="absolute -bttom-3 left-1/2 transform -translate-x-1/2">
                <LiveBadge />
            </div>
          )}
        </div>
    )
}

// Let's use skeleton for loading state
interface UserAvatarSkeletonProps extends VariantProps<typeof avatarSizes> {};

export const UserAvatarSkeleton = ({ size }: UserAvatarSkeletonProps) => {
    return(
        <Skeleton 
        className={cn("rounded-full", avatarSizes({ size }))} />
    )
}