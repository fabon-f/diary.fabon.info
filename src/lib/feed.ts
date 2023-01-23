import { escapeUTF8 } from 'entities'
import { Feed } from 'feed'
import type { Item } from 'feed'
import { getTitleFromSlug, getSlugFromPath, getPublishDate } from './utils'

const stringifyStyleAttribute = (style: Record<string, string>) => {
    let res = ''
    for (const key in style) {
        if (key === 'backgroundColor') {
            res += `background-color: ${style[key]};`
        } else if (key === 'color') {
            res += `color: ${style[key]};`
        }
    }
    return res
}

const vnodeToHtml = (node: any): string => {
    if (node === undefined) { return '' }
    if (typeof node === 'string') {
        return escapeUTF8(node)
    }
    if (typeof node.type === 'symbol' && Symbol.keyFor(node.type) === 'astro:fragment') {
        return node.props.children.map((n: any) => vnodeToHtml(n)).join('')
    }
    if (typeof node.type === 'string') {
        if (node.type === 'br') {
            return '<br />'
        }
        if (node.type === 'a' && typeof node.props['data-embed-link'] === 'string') {
            delete node.props['data-embed-link']
            return `<p>${vnodeToHtml(node)}</p>`
        }
        let attributes = ''
        for (const key in node.props) {
            if (key === 'children') { continue }
            if (key === 'style') {
                const style = stringifyStyleAttribute(node.props['style'])
                attributes += ` style="${escapeUTF8(style)}"`
                continue
            }
            if (typeof node.props[key] !== 'string') {
                throw new Error(`Unknown prop: ${JSON.stringify(node.props[key])}`)
            }
            attributes += ` ${key}="${escapeUTF8(node.props[key])}"`
        }
        const children = Array.isArray(node.props.children) ? node.props.children.map((n: any) => vnodeToHtml(n)).join('') : vnodeToHtml(node.props.children)
        return `<${node.type}${attributes}>${children}</${node.type}>`
    }
    throw new Error(`Unknown node: ${JSON.stringify(node)}`)
}

type FeedType = 'rss'
const MAX_ITEMS = 15

export async function generateFeed(site: URL, type: FeedType) {
    const articles = Object.values(import.meta.glob('../posts/*.mdx', { eager: true }))
    const siteString = site.toString()
    const author = {
        name: 'ふぁぼん',
        email: 'syobon.hinata.public@gmail.com',
        link: 'https://www.fabon.info/'
    }
    const feed = new Feed({
        title: 'Hebdomadary',
        description: 'ふぁぼんの週記',
        id: siteString,
        link: siteString,
        language: 'ja',
        image: new URL('/images/fabon.png', site).toString(),
        favicon: new URL('/favicon.ico', site).toString(),
        copyright: 'CC BY 4.0, ふぁぼん',
        author
    })
    const feedItems = [] as Item[]
    for (const a of articles as any[]) {
        const slug = getSlugFromPath(a.file)
        const title = a.frontmatter['title'] ?? getTitleFromSlug(slug)
        const content = vnodeToHtml(a.Content({ title }))
        const url = new URL(`/${slug}/`, site).toString()
        const description = a.frontmatter['description'] ?? ''
        const date = await getPublishDate(a.file, a.frontmatter)
        if (date.getTime() > Date.now()) { continue }
        feedItems.push({
            title,
            id: url,
            link: url,
            description,
            content,
            author: [author],
            date,
            // image: ''
        })
    }
    feedItems.sort((a, b) => b.date.getTime() - a.date.getTime())
    for (const item of feedItems.slice(0, MAX_ITEMS)) {
        feed.addItem(item)
    }
    if (type === 'rss') {
        return feed.rss2()
    }
    throw new Error(`Unknown type: ${type}`)
}
