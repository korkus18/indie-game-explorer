'use client'

import { Game } from '@/lib/types/game'

type HeroGameProps = {
    game: Game
    onClick: () => void
}

export default function HeroGame({ game, onClick }: HeroGameProps) {
    return (
        <section className="relative rounded-xl overflow-hidden shadow-lg mb-10">
            {game.background_image && (
                <img
                    src={game.background_image}
                    alt={game.name}
                    className="w-full h-80 object-cover brightness-75"
                />
            )}
            <div className="absolute inset-0 p-6 text-white flex flex-col justify-center">
                <p className="text-sm uppercase opacity-80">Top hra roku</p>
                <h2 className="text-3xl md:text-4xl font-bold">{game.name}</h2>
                <p className="mt-2 max-w-xl text-sm md:text-base">
                    {game.released && `Vydáno: ${game.released}`}
                </p>
                <button
                    onClick={onClick}
                    className="mt-4 w-fit px-6 py-2 bg-indigo-600 hover:bg-indigo-700 transition rounded text-white font-semibold"
                >
                    Zobrazit detail
                </button>
            </div>
        </section>
    )
}
