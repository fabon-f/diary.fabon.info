import { visit } from 'unist-util-visit'

export default function plugin() {
    function transformer(tree: any) {
        const footnotes = {} as Record<string, string>
        visit(tree, 'footnoteDefinition', n => {
            let content = ''
            visit(n, 'text', t => {
                content += t.value
            })
            footnotes[n.identifier] = content
        })
        visit(tree, 'footnoteReference', n => {
            if (!footnotes[n.identifier]) { return }
            n.data = { hProperties: { title: footnotes[n.identifier] } }
        })
    }
    return transformer
}
