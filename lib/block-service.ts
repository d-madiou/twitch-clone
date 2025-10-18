import { db } from "./db";
import { getSelf } from "./auth-service";

export const isBlockedByUser = async(id: string) =>{
    try{
        const self = await getSelf();

        const otherUser = await db.user.findUnique({
            where: { id }
        });

        if(!otherUser){
            throw new Error("user not found")
        }
        if(otherUser.id === self.id){
            return false;
        }
        // using the find Unique here can give us faster result, we could use find first but
        // will go through the entire db
        const existingBlock = await db.block.findUnique({
            where:{
                blockerId_blockedId: {
                    blockerId: otherUser.id,
                    blockedId: self.id,
                }
            }
        });

        return !!existingBlock;

    } catch{
        return false;
    }
}

export const BlockUser = async(id: string) =>{
    const self = await getSelf();

    if(self.id === id){
        throw new Error("Cannot block yourself")
    }

    const otherUser = await db.user.findUnique({
        where: { id }
    })

    if(!otherUser){
        throw new Error("user not found");
    }

    const existingBlock = await db.block.findUnique({
        where:{
            blockerId_blockedId: {
                blockerId: self.id,
                blockedId: otherUser.id,
            }
        }
    });

    if(existingBlock){
        throw new Error("Already blocked")
    }

    // If the user is not blocked then, let's block him
    const block = await db.block.create({
        data: {
            blockerId: self.id,
            blockedId: otherUser.id,
        },
        include:{
            blocked: true,
        }
    });

    return block;
};

export const unBlockUser = async (id: string) =>{
    const self = await getSelf();

    if(self.id === id){
        throw new Error("Cannot block yourself")
    }

    const otherUser = await db.user.findUnique({
        where: { id }
    })

    if(!otherUser){
        throw new Error("user not found");
    }

    const existingBlock = await db.block.findUnique({
        where:{
            blockerId_blockedId: {
                blockerId: self.id,
                blockedId: otherUser.id,
            }
        }
    });

    if(!existingBlock){
        throw new Error("Not blocked")
    }

    // If the user is not blocked then, let's unblock him
    const unblock = await db.block.delete({
        where: {
            id: existingBlock.id,
        },
        include:{
            blocked: true,
        }
    });

    return unblock;
}