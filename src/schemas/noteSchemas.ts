import { z } from 'zod'

export const createSchema = z.object({
  body: z.object({
    title: z.string(),
    content: z.string().nullish()
  })
})

export const updateSchema = z.object({
  body: z.object({
    title: z.string().nullish(),
    content: z.string().nullish()
  }),
  params: z.object({
    id: z.string().transform((id) => Number(id))
  })
})

export const deleteSchema = z.object({
  params: z.object({
    id: z.string().transform((id) => Number(id))
  })
})
