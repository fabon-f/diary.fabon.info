import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import image from '@astrojs/image'
import solid from '@astrojs/solid-js'

import { ecsstatic } from '@acab/ecsstatic/vite'

import remarkBreaks from 'remark-breaks'
import remarkMath from 'remark-math'
import remarkDendenRuby from 'remark-denden-ruby'
import remarkFootnoteTitle from './src/lib/remark-plugins/footnote-title'
import remarkPlainCodeblock from './src/lib/remark-plugins/plain-codeblock'
import rehypeKatex from 'rehype-katex'
import rehypeImgSize from 'rehype-img-size'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeEmbeddedLink from './src/lib/rehype-plugins/mark-embedded-link'
import rehypeCyrillicGreek from './src/lib/rehype-plugins/cyrillic-greek'

// https://astro.build/config
export default defineConfig({
    integrations: [mdx(), sitemap(), solid(), image({
        serviceEntryPoint: '@astrojs/image/sharp'
    })],
    build: {
        inlineStylesheets: 'auto'
    },
    compressHTML: true,
    markdown: {
        syntaxHighlight: false,
        remarkPlugins: [
            remarkMath, remarkBreaks, remarkDendenRuby, remarkFootnoteTitle, remarkPlainCodeblock
        ],
        remarkRehype: {
            footnoteLabel: '脚注',
            footnoteBackLabel: '本文に戻る'
        },
        rehypePlugins: [
            rehypeKatex,
            [rehypeImgSize as any, { dir: 'public' }],
            rehypeEmbeddedLink,
            [rehypePrettyCode, {
                theme: 'nord', keepBackground: true,
                onVisitLine(node: any) {
                    if (node.children.length === 0) {
                        node.children = [{ type: 'text', value: ' ' }]
                    }
                }
            }],
            rehypeCyrillicGreek
        ]
    },
    scopedStyleStrategy: 'class',
    site: "https://diary.fabon.info",
    vite: {
        plugins: [ecsstatic()]
    }
})
