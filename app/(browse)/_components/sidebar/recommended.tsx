"use client";

import { useSidebar } from "@/store/use-sidebar";
import { User } from "@prisma/client";
import { use } from "react";
import { UserItem, UserItemSkeleton } from "./user-item";


interface RecommendedProps {
  data: User[];
};

export const Recommended = ({data, } : RecommendedProps) => {
    const { collapsed } = useSidebar((state) => state);
    const showLabel = !collapsed && data.length > 0;
    return (
        <div>
            {showLabel && (
                <div className="pl-6 mb-4">
                    <p className="text-sm text-muted-foreground">
                        Recommended
                    </p>
                </div>
            )}
            <div className="space-y-3">
                {data.map((user) => (
                    <UserItem
                        key={user.id}
                        username={user.username}
                        imageUrl={user.imageUrl || ""}
                        isLive={true}
                    />
                ))}
            </div>
        </div>
    );
}

export const RecommendedSkeleton = () => {
    return(
        <ul className="px-2">
            {[...Array(3)].map((_, index) => (
                <UserItemSkeleton key={index} />
            ))}
        </ul>
    )
}