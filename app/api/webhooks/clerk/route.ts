import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'
// Import the necessary types from the server package
import type { WebhookEvent, UserJSON } from '@clerk/nextjs/server' 

import { db } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    // Cast the returned event to the general WebhookEvent type
    const evt = await verifyWebhook(req) as WebhookEvent; 

    const eventType = evt.type
    
    if (eventType === 'user.created') {
        
        const { id, username, image_url } = evt.data as UserJSON;

        await db.user.create({
            data:{
                externalId: id,
                username: username || `user_${id.slice(5, 12)}`,
                imageUrl: image_url,
                stream: {
                    create: {
                        name: `${username}'s stream`
                    }
                }
            }
        });
    }

    if (eventType === 'user.updated'){
        const currentUser = await db.user.findUnique({
            where: { externalId: evt.data.id }
        })

        if(!currentUser) {
            return new Response('user not found', { status: 400});
        } 
        
        await db.user.update({
            where: { externalId: evt.data.id },
            data: {
                username: evt.data.username || `user_${evt.data.id.slice(5, 12)}`,
                imageUrl: evt.data.image_url,
            }
        })
    }

    if (eventType === 'user.deleted') {
        await db.user.delete({
            where: { externalId: evt.data.id }
        })
    }


    return new Response('Webhook received', { status: 200 })
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }
}