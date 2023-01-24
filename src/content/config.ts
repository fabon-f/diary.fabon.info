import { z, defineCollection } from 'astro:content'

const diaryCollection = defineCollection({
    schema: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        date: z.string().optional()
    })
})

export const collections = {
    'diary': diaryCollection
}
