import { visit } from 'unist-util-visit'

export default function plugin() {
    function transformer(tree: any) {
        visit(tree, 'code', n => {
            if (n.lang === null) {
                n.lang = 'plaintext'
            }
        })
    }
    return transformer
}
