"use client"

import { onFollow, onUnfollow } from "@/actions/follow"
import { Button } from "@/components/ui/button"
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps{
    isFollowing: boolean;
    userId: string;
};

export const Actions = ({isFollowing, userId}: ActionsProps)=>{
    const[isPending, setTransition] = useTransition();

    const handleFollow = () =>{
        setTransition(()=>{
            onFollow(userId)
            .then((data)=>{
                toast.success(`You are now following ${data.following.username}`)
            })
            .catch(()=>{
                toast.error("Something went wrong")
            })
        });
    };

    const handleUnFollow = () =>{
        setTransition(()=>{
            onUnfollow(userId)
            .then((data)=>{
                toast.success(`You have unfollowed ${data.following.username}`)
            })
            .catch(()=>{
                toast.error("Something went wrong")
            })
        });
    };

    const onClick = ()=>{
        if(isFollowing){
            handleUnFollow();
        }
        else{
            handleFollow();
        }

    }
    

    return(
        <Button 
          onClick={onClick} 
          variant="primary"
          disabled={isPending }>
            {isFollowing ? "Unfollow": "follow"}
        </Button>
    )
}