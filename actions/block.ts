"use server"

import { BlockUser, unBlockUser } from "@/lib/block-service";
import { revalidatePath } from "next/cache";

export const onBlock = async(id: string)=>{

    //TODO: Adapt to disconnect from livestream
    //TODO: Allow ability to kick the user
        const blockedUser = await BlockUser(id)
        revalidatePath("/");

        if(blockedUser){
            revalidatePath(`/${blockedUser.blocked.username}`)
        }

        return blockedUser;
}

// Unblock action function here:
export const unBlock = async(id: string)=>{
        const unBlockedUser = await unBlockUser(id)

        revalidatePath("/");

        if(unBlockedUser){
            revalidatePath(`/${unBlockedUser.blocked.username}`)
        }
        return unBlockedUser;
}
