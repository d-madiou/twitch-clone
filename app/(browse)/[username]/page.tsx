import { Button } from "@/components/ui/button";
import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { Actions } from "./_components/actions";
import { isBlockedByUser } from "@/lib/block-service";

interface UserPageProps {
  params: {
    username: string;
  };
}

const UserPage = async ({ params }: UserPageProps) => {
  const { username } = await params;
  const user = await getUserByUsername(username);

  if (!user) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBlocked = await isBlockedByUser(user.id);
  
  if (isBlocked) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <p>User: {user.username}</p>
      <p>userId: {user.id}</p>
      <p>is following {`${isFollowing}`}</p>
      <p>is blocked {`${isBlocked}`}</p>
      <Actions userId={user.id} isFollowing={isFollowing} />
    </div>
  );
};

export default UserPage;
