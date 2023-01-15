import fetchSiteMetadata from 'fetch-site-metadata'
import type { Metadata, Options } from 'fetch-site-metadata'
import fetchHtml from './twitter-embed'

const cache = new Map<string, Metadata>()

const twitterCache = new Map<string, string>()

export async function fetchTwitterEmbed(url: string) {
    const data = twitterCache.get(url)
    if (data) {
        return data
    }
    const res = await fetchHtml(url)
    twitterCache.set(url, res)
    return res
}

export default async function fetchMetadata(url: string, options?: Options) {
    const data = cache.get(url)
    if (data) {
        return data
    } else {
        const res = await fetchSiteMetadata(url, options)
        cache.set(url, res)
        return res
    }
}
