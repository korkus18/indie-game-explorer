'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { GamesResponse, GamesResponseSchema } from './types/game'

const API_URL = 'https://api.rawg.io/api/games'

export const useGames = (
    searchTerm = '',
    platformId?: number,
    year?: number
) => {
    return useInfiniteQuery<GamesResponse>({
        queryKey: ['games', searchTerm, platformId, year],
        queryFn: async ({ pageParam = 1 }) => {
            const params = new URLSearchParams({
                key: process.env.NEXT_PUBLIC_RAWG_API_KEY!,
                page: String(pageParam),
                page_size: '20',
            })

            if (searchTerm) params.append('search', searchTerm)
            if (platformId) params.append('platforms', platformId.toString())
            if (year) {
                const from = `${year}-01-01`
                const to = `${year}-12-31`
                params.append('dates', `${from},${to}`)
            }

            const res = await fetch(`${API_URL}?${params.toString()}`)
            if (!res.ok) throw new Error('Failed to fetch games')

            const json = await res.json()
            return GamesResponseSchema.parse(json)
        },
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.next) {
                return pages.length + 1
            }
            return undefined
        },
        initialPageParam: 1,
    })

}
