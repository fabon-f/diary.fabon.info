import { visit } from 'unist-util-visit'

export default function plugin() {
    function transformer(tree: any) {
        visit(tree, { type: 'element', tagName: 'a' }, n => {
            if (!Array.isArray(n.children)) { return }
            if (n.children.length !== 1) { return }
            if (n.children[0].type !== 'text') { return }
            if (n.properties.href === n.children[0].value) {
                n.properties['dataEmbedLink'] = ''
            }
        })
    }
    return transformer
}
