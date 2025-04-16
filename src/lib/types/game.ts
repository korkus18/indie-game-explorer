// src/lib/types/game.ts
import { z } from 'zod'

export const GameSchema = z.object({
    id: z.number(),
    name: z.string(),
    released: z.string().nullable(),
    rating: z.number(),
    background_image: z.string().url().nullable(),
    platforms: z.array(
        z.object({
            platform: z.object({
                id: z.number(),
                name: z.string(),
                slug: z.string(),
            }),
        })
    )
})

export const GamesResponseSchema = z.object({
    results: z.array(GameSchema),
    count: z.number(),
    next: z.string().nullable(),
    previous: z.string().nullable(),
})

export type Game = z.infer<typeof GameSchema>
export type GamesResponse = z.infer<typeof GamesResponseSchema>
