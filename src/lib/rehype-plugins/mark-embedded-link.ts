import { visit } from 'unist-util-visit'

export default function plugin() {
    function transformer(tree: any) {
        visit(tree, { type: 'element', tagName: 'p' }, (node, index, parent) => {
            if (index === null) { return }
            if (!Array.isArray(node.children)) { return }
            if (node.children.length !== 1) { return }
            const child = node.children[0]
            if (child.tagName !== 'a') { return }
            if (!Array.isArray(child.children)) { return }
            if (child.children.length !== 1) { return }
            if (child.children[0].type !== 'text') { return }
            if (child.properties.href === child.children[0].value) {
                child.properties['dataEmbedLink'] = ''
            }
            parent.children[index] = child
        })
    }
    return transformer
}
