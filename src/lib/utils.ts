import { basename, extname } from 'node:path'
import { addDays, format } from 'date-fns'

export function getSlugFromPath(path: string) {
    const filename = basename(path, extname(path))
    const date = new Date(filename)
    const dayNum = date.getDay()
    // 0 -> Sunday, -6
    // Otherwise -> 1 - n
    return format(addDays(date, dayNum === 0 ? -6 : 1 - dayNum), "yyyy-MM-dd")
}

export function getTitleFromSlug(slug: string) {
    const start = new Date(slug)
    const end = addDays(start, 6)
    return `週記 (${format(start, "yyyy/MM/dd")} - ${format(end, "yyyy/MM/dd")})`
}
