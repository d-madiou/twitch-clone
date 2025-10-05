"use client"

import { useSidebar } from "@/store/use-sidebar";
import { cn } from "@/lib/utils";

interface WrapperProps {
    children: React.ReactNode;
};

export const Wrapper = ({ children }: WrapperProps) => {

    //let's add the hook
    const { collapsed } = useSidebar((state) => state);
    return (
        <aside className={cn("fixed flex left-0 top-20 flex-col w-60 h-full bg-[#252731] border-r border-[#2D2E35] z-50"
        , collapsed && 'w-[70px]')}>
            {children}
        </aside>
    );
}