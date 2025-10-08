"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { useMediaQuery } from "usehooks-ts";

interface ContainerProps {
  children?: React.ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  // Detect if screen width is 1024px or smaller (tablet/mobile)
  const isMobile = useMediaQuery("(max-width: 1024px)");

  // Zustand store
  const { collapsed, onCollapse, onExpand } = useSidebar((state) => state);

  // Automatically collapse on mobile, expand on desktop
  useEffect(() => {
    if (isMobile) {
      onCollapse();
    } else {
      onExpand();
    }
  }, [isMobile, onCollapse, onExpand]);

  return (
    <div
      className={cn(
        "flex-1 transition-all duration-300",
        collapsed ? "ml-[70px]" : "ml-60"
      )}
    >
      {children}
    </div>
  );
};
