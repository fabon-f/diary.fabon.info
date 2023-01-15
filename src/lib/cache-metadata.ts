import fetchSiteMetadata from 'fetch-site-metadata'
import type { Metadata, Options } from 'fetch-site-metadata'

const cache = new Map<string, Metadata>()

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
