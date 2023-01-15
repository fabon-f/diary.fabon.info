import { HTMLRewriter } from 'html-rewriter-wasm'

const rewriteHtml = async (html: string) => {
    let output = ''
    const encoder = new TextEncoder()
    const decoder = new TextDecoder()

    const rewriter = new HTMLRewriter(outputChunk => {
        output += decoder.decode(outputChunk)
    })
    rewriter.on('script', {
        element(el) {
            el.remove()
        }
    }).on('a', {
        element(el) {
            const url = el.getAttribute('href')
            if (url === null) { return }
            const urlObj = new URL(url)
            urlObj.searchParams.delete('ref_src')
            el.setAttribute('href', urlObj.toString())
        }
    })

    try {
        await rewriter.write(encoder.encode(html))
        await rewriter.end()
    } finally {
        rewriter.free()
    }


    return output
}

export default async function fetchHtml(url: string) {
    const qs = new URLSearchParams({
        url,
        partner: '',
        hide_thread: 'false'
    }).toString()
    const response = await fetch(`https://publish.twitter.com/oembed?${qs}`)
    if (!response.ok) {
        throw new Error(`Can't fetch data: ${url}`)
    }
    const data = await response.json()
    if (typeof data.html !== 'string') { throw new Error('Unknown response format') }
    return await rewriteHtml(data.html)
}
