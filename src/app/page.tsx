'use client'

import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import { useGames } from '@/lib/useGames'
import GameCard from '@/components/GameCard'
import Loading from '@/components/Loading'
import GameModal from '@/components/GameModal'
import HeroGame from '@/components/TopGame'

const platforms = [
    { id: 4, name: 'PC' },
    { id: 187, name: 'PS5' },
    { id: 18, name: 'PS4' },
    { id: 1, name: 'Xbox One' },
    { id: 7, name: 'Nintendo Switch' },
]

const currentYear = new Date().getFullYear()
const years = Array.from({ length: 20 }, (_, i) => currentYear - i)

export default function Home() {
    const [searchInput, setSearchInput] = useState('')
    const [debouncedSearchTerm] = useDebounce(searchInput, 500)
    const [selectedPlatform, setSelectedPlatform] = useState<number | null>(null)
    const [selectedYear, setSelectedYear] = useState<number | null>(null)
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
        <main
            className="min-h-screen bg-white text-black dark:bg-zinc-900 dark:text-white transition-colors duration-300 p-6">


            {/* Vyhledávací a filtrační sekce */}
            <section className="max-w-7xl mx-auto px-4 mb-12">
                <div className="bg-zinc-800/70 rounded-xl p-6 shadow-lg ring-1 ring-zinc-700 backdrop-blur-md">
                    <h2 className="text-xl font-semibold text-white mb-6">Najdi si svou hru</h2>

                    <div className="flex flex-col lg:flex-row items-stretch gap-4">
                        {/* SEARCH */}
                        <div className="flex flex-1 items-center bg-zinc-700 rounded-full px-5 py-3 shadow-inner">
                            <input
                                type="text"
                                placeholder="Hledej mezi stovkami her..."
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                className="w-full bg-transparent text-white placeholder-zinc-400 outline-none"
                            />
                            {searchInput.length > 0 && (
                                <button
                                    onClick={handleClear}
                                    className="ml-3 text-sm text-zinc-400 hover:text-white transition"
                                >
                                    ✕
                                </button>
                            )}
                        </div>

                        {/* PLATFORM FILTER */}
                        <div
                            className="flex items-center bg-zinc-700 rounded-full px-4 py-2 text-sm text-white relative">
                            <span className="mr-2 text-zinc-400">Platforma:</span>
                            <select
                                value={selectedPlatform ?? ''}
                                onChange={(e) => setSelectedPlatform(e.target.value ? Number(e.target.value) : null)}
                                className="bg-transparent outline-none appearance-none pr-6"
                            >
                                <option value="">Všechny</option>
                                {platforms.map((p) => (
                                    <option key={p.id} value={p.id}>{p.name}</option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}
                                     viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                                </svg>
                            </div>
                        </div>


                        {/* YEAR FILTER */}
                        <div
                            className="flex items-center bg-zinc-700 rounded-full px-4 py-2 text-sm text-white relative">
                            <span className="mr-2 text-zinc-400">Rok:</span>
                            <select
                                value={selectedYear ?? ''}
                                onChange={(e) => setSelectedYear(e.target.value ? Number(e.target.value) : null)}
                                className="bg-transparent outline-none appearance-none pr-6"
                            >
                                <option value="">Všechny</option>
                                {years.map((y) => (
                                    <option key={y} value={y}>{y}</option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}
                                     viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                                </svg>
                            </div>
                        </div>

                    </div>
                </div>
            </section>


            {/* STAVY */}
            {isLoading && <Loading/>}
            {isError && <p className="text-center text-red-500 mb-6">Chyba při načítání her.</p>}
            {!isLoading && allGames.length === 0 && (
                <p className="text-center text-gray-500 mt-12">😕 Žádné hry nenalezeny.</p>
            )}
            {/* Topgame sekce */}
            {topGame && <HeroGame game={topGame} onClick={() => setSelectedGameId(topGame.id)}/>}
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
