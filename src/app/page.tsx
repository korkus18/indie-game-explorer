'use client'

import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import { useGames } from '@/lib/useGames'
import GameCard from '@/components/GameCard'
import Loading from '@/components/Loading'
import GameModal from '@/components/GameModal'
import HeroGame from '@/components/HeroGame'
import { XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const platforms = [
    { id: 4, name: 'PC' },
    { id: 187, name: 'PS5' },
    { id: 18, name: 'PS4' },
    { id: 1, name: 'Xbox One' },
    { id: 7, name: 'Nintendo Switch' },
]

const currentYear = new Date().getFullYear()
const years = [currentYear]

export default function Home() {
    const [searchInput, setSearchInput] = useState('')
    const [debouncedSearchTerm] = useDebounce(searchInput, 500)
    const [selectedPlatform, setSelectedPlatform] = useState<number | null>(null)
    const [selectedYear, setSelectedYear] = useState<number | null>(years[0])
    const [selectedGameId, setSelectedGameId] = useState<number | null>(null)
    const closeModal = () => setSelectedGameId(null)

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError
    } = useGames(debouncedSearchTerm, selectedPlatform ?? undefined, selectedYear ?? undefined)

    const allGames = data?.pages.flatMap((page) => page.results) ?? []
    const topGame = allGames[0]

    const handleClear = () => setSearchInput('')

    return (
        <main className="min-h-screen bg-white text-black dark:bg-zinc-900 dark:text-white transition-colors duration-300 p-6">


            {/* Hero sekce */}
            {topGame && <HeroGame game={topGame} onClick={() => setSelectedGameId(topGame.id)}/>}

            {/* Search bar */}
                <div className="relative mb-6 max-w-xl mx-auto">
                    <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-3.5 text-gray-400"/>
                    <input
                        type="text"
                        placeholder="Vyhledej hru..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="w-full pl-10 pr-10 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {searchInput.length > 0 && (
                        <button
                            onClick={handleClear}
                            className="absolute right-2 top-2.5 text-gray-400 hover:text-gray-600"
                            aria-label="Clear search"
                        >
                            <XMarkIcon className="w-5 h-5"/>
                        </button>
                    )}
                </div>

                {/* Filtrace */}
                <div className="flex flex-wrap gap-4 justify-center mb-6">
                    <select
                        value={selectedPlatform ?? ''}
                        onChange={(e) => setSelectedPlatform(e.target.value ? Number(e.target.value) : null)}
                        className="border p-2 rounded-md shadow-sm"
                    >
                        <option value="">Všechny platformy</option>
                        {platforms.map((platform) => (
                            <option key={platform.id} value={platform.id}>
                                {platform.name}
                            </option>
                        ))}
                    </select>

                    <select
                        value={selectedYear ?? ''}
                        onChange={(e) => setSelectedYear(e.target.value ? Number(e.target.value) : null)}
                        className="border p-2 rounded-md shadow-sm"
                    >
                        <option value="">Všechny roky</option>
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>

                {/* STAVY */}
                {isLoading && <Loading/>}
                {isError && <p className="text-center text-red-500 mb-6">Chyba při načítání her.</p>}
                {!isLoading && allGames.length === 0 && (
                    <p className="text-center text-gray-500 mt-12">😕 Žádné hry nenalezeny.</p>
                )}

                {/* GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {allGames.map((game) => (
                        <GameCard key={game.id} game={game} onClick={() => setSelectedGameId(game.id)}/>
                    ))}
                </div>

                {/* LOAD MORE */}
                {hasNextPage && (
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={() => fetchNextPage()}
                            disabled={isFetchingNextPage}
                            className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                        >
                            {isFetchingNextPage ? 'Načítám...' : 'Načíst další'}
                        </button>
                    </div>
                )}

                {/* MODAL */}
                {selectedGameId && (
                    <GameModal gameId={selectedGameId} isOpen={!!selectedGameId} onClose={closeModal}/>
                )}
        </main>
)
}
