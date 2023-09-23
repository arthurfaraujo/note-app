import z from 'zod'

export const signinSchema = z.object({
  body: z.object({
    nickname: z.string().min(4),
    password: z.string().min(8)
  })
})

export const signupSchema = z.object({
  body: z.object({
    nickname: z.string().min(4),
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8)
  })
})
