import { visit } from 'unist-util-visit'
import { u } from 'unist-builder'

const buildTextNode = (str: string) => (
    str === '' ? undefined : u('text', { value: str })
)

const buildSpanNode = (str: string, className: string) => (
    str === '' ? undefined : u('element', { tagName: 'span', properties: { class: className } }, [buildTextNode(str)!])
)

const scan = (str: string, regex: RegExp, className: string) => {
    let match
    let index = 0
    const result = []
    while ((match = regex.exec(str)) !== null) {
        result.push(buildTextNode(str.substring(index, match.index)))
        result.push(buildSpanNode(match[0], className))
        index = match.index + match[0].length
    }
    result.push(buildTextNode(str.substring(index, str.length)))
    return result.filter(s => s !== undefined)
}

export default function plugin() {
    function transformer(tree: any) {
        visit(tree, 'text', (node, index, parent) => {
            if (!/\p{sc=Cyrl}/u.test(node.value)) { return }
            const cyrillicRegex = /[\u0301 «»„“?!.,';:\-\u2014\u2015]*\p{sc=Cyrl}[\p{sc=Cyrl}\u0301 «»„“?!.,';:\-\u2014\u2015]*/ug
            const result = scan(node.value, cyrillicRegex, 'cyrillic')

            parent.children.splice(index, 1, ...result)
            return index! + result.length
        })

        visit(tree, 'text', (node, index, parent) => {
            if (!/\p{sc=Greek}/u.test(node.value)) { return }
            const greekRegex = /[ :·…'«»\-;!,.\u2014\u2015]*\p{sc=Greek}[\p{sc=Greek} :·…'«»\-;!,.\u2014\u2015]*/ug
            const result = scan(node.value, greekRegex, 'greek')

            parent.children.splice(index, 1, ...result)
            return index! + result.length
        })
    }
    return transformer
}
