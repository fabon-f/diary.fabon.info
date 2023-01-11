import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'

import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import remarkMath from 'remark-math'
import remarkDendenRuby from 'remark-denden-ruby'
import remarkFootnoteTitle from './src/lib/remark-plugins/footnote-title'
import rehypeKatex from 'rehype-katex'
import rehypeEmbeddedLink from './src/lib/rehype-plugins/mark-embedded-link'

// https://astro.build/config
export default defineConfig({
    integrations: [mdx(), sitemap()],
    markdown: {
        remarkPlugins: [
            remarkGfm, remarkMath, remarkBreaks, remarkDendenRuby, remarkFootnoteTitle,
        ],
        rehypePlugins: [rehypeKatex, rehypeEmbeddedLink]
    },
    site: "https://diary.fabon.info"
})
