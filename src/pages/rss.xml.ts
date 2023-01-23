import type { APIRoute } from 'astro'
import { generateFeed } from '../lib/feed'

export const get: APIRoute = async function get (context) {
    return {
        body: await generateFeed(context.site!, 'rss')
    }
}
