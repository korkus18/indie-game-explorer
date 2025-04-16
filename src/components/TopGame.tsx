'use client'

import { Game } from '@/lib/types/game'

type HeroGameProps = {
    game: Game
    onClick: () => void
}

export default function TopGame({ game, onClick }: HeroGameProps) {
    return (
        <section className="relative rounded-xl overflow-hidden shadow-lg mb-10">
            {game.background_image && (
                <img
                    src={game.background_image}
                    alt={game.name}
                    className="w-full h-96 object-cover brightness-[.4]"
                />
            )}
            <div className="absolute inset-0 p-6 text-white flex flex-col justify-end bg-gradient-to-t from-zinc-900/80 to-transparent">
                <p className="text-sm uppercase text-indigo-400">Top hra roku</p>
                <h2 className="text-4xl font-bold mb-2">{game.name}</h2>
                <p className="text-sm max-w-xl text-zinc-200">{game.released && `Vydáno: ${game.released}`}</p>
                <button
                    onClick={onClick}
                    className="mt-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 transition rounded text-white font-semibold w-fit"
                >
                    Zobrazit detail
                </button>
            </div>
        </section>
    )
}
