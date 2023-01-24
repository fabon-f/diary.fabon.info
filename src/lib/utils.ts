import { basename, extname } from 'node:path'
import * as cp from 'node:child_process'
import { promisify } from 'node:util'
const execFile = promisify(cp.execFile)
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
    const mdFiles = Object.keys(import.meta.glob('../content/diary/*.mdx'))
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

export async function getPublishDate(filePath: string, frontmatter: Record<string, any>) {
    if (frontmatter['date']) {
        return new Date(frontmatter['date'])
    }
    const { stdout } = await execFile('git', ['--no-pager', 'log', '--format=%aI', '--', filePath])
    const firstCommitDate = stdout.split('\n').filter(l => l !== '').at(-1)
    if (typeof firstCommitDate === 'string') {
        return new Date(firstCommitDate)
    }
    return addDays(startDate(filePath), 7)
}
