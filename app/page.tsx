import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl text-white">Dashboard Name</h1>
      <UserButton afterSignOutUrl="/"/>
    </div>
  );
}
