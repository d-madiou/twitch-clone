"use server"

import { followUser, UnfollowUser } from "@/lib/follow-service"
import { revalidatePath } from "next/cache"
import { relative } from "path"

export const onFollow = async(id: string)=>{
    try{
        const followedUser = await followUser(id)

        revalidatePath("/");

        if(followedUser){
            revalidatePath(`/${followedUser.following.username}`)
        }

        return followedUser;
    } catch{
        throw new Error("internal Error")
    }
}

export const onUnfollow = async(id: string)=>{
    try{
        const unfollowedUser = await UnfollowUser(id);

        revalidatePath("/");

        if(unfollowedUser){
            revalidatePath(`/${unfollowedUser.following.username}`)
        }
        return unfollowedUser;

    } catch(error){
        throw new Error("Internal Error")
    }
}