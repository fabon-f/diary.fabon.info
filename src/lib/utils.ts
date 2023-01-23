import { basename, extname } from 'node:path'
import { addDays, format } from 'date-fns'

export function startDate(filePath: string) {
    const filename = basename(filePath, extname(filePath))
    const date = new Date(filename)
    const dayNum = date.getDay()
    // 0 -> Sunday, -6
    // Otherwise -> 1 - n
    return addDays(date, dayNum === 0 ? -6 : 1 - dayNum)
}

export function getSlugFromPath(path: string) {
    return format(startDate(path), "yyyy-MM-dd")
}

export function getTitleFromSlug(slug: string) {
    const start = new Date(slug)
    const end = addDays(start, 6)
    return `週記 (${format(start, "yyyy/MM/dd")} - ${format(end, "yyyy/MM/dd")})`
}

export function getArticles() {
    const mdFiles = Object.keys(import.meta.glob('../posts/*.mdx'))
    return mdFiles.map(f => ({
        date: startDate(f),
        url: `/${getSlugFromPath(f)}/`,
        title: getTitleFromSlug(getSlugFromPath(f))
    }))
}

export function getPrevAndNextArticle(date: Date) {
    const articles = getArticles()
    return {
        next: articles.find(a => a.date > date),
        prev: [...articles].reverse().find(a => a.date < date)
    }
}
