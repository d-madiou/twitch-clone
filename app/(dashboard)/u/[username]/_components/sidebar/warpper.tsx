"use client"

import { useSidebar } from "@/store/use-sidebar";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";

interface WrapperProps {
    children: React.ReactNode;
};

export const Wrapper = ({ children }: WrapperProps) => {

    const [isClient, setIsClient] = useState(false);

            //let's add the hook
    const { collapsed } = useCreatorSidebar((state) => state);
    
    // useEffect(() => {
    //     setIsClient(true);
    // }, []);

    // if (!isClient) {
    //     return(
    //         <aside className="fixed flex left-0 top-20 flex-col w-60 h-full bg-[252731] border-r border-[2D2E35] z-50">
             
    //         </aside>
    //     )
    // };


    return (
        <aside className={cn("fixed flex left-0 top-20 flex-col w-[70px] lg:w-60 h-full bg-[#252731] border-r border-[#2D2E35] z-50"
        , collapsed && 'lg:w-[70px]')}>
            {children}
        </aside>
    );
}