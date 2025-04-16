'use client'

import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'

const GameDetailSchema = z.object({
    id: z.number(),
    name: z.string(),
    description_raw: z.string(),
    background_image: z.string().nullable(),
    released: z.string().nullable(),
    rating: z.number(),
    genres: z.array(z.object({ id: z.number(), name: z.string() })),
})

type GameDetail = z.infer<typeof GameDetailSchema>

export const useGameDetail = (id?: number) => {
    return useQuery<GameDetail>({
        enabled: !!id,
        queryKey: ['game', id],
        queryFn: async () => {
            const res = await fetch(`https://api.rawg.io/api/games/${id}?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`)
            if (!res.ok) throw new Error('Failed to fetch game detail')
            const json = await res.json()
            return GameDetailSchema.parse(json)
        }
    })
}
