// src/components/GameCard.tsx
import { Game } from '@/lib/types/game'

type GameCardProps = {
    game: Game
    onClick: () => void
}

export default function GameCard({ game, onClick }: GameCardProps) {
    return (
        <div
            onClick={onClick}
            className="bg-white dark:bg-zinc-900 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer"
        >
            {game.background_image && (
                <img
                    src={game.background_image}
                    alt={game.name}
                    className="w-full h-48 object-cover"
                />
            )}
            <div className="p-4">
                <h2 className="text-lg font-semibold text-zinc-800 dark:text-white mb-1">
                    {game.name}
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">
                    {game.released ? `🎯 ${game.released}` : 'Datum neuveden'}
                </p>
                <p className="text-sm text-zinc-700 dark:text-zinc-300">
                    💻 {game.platforms.map((p) => p.platform.name).join(', ')}
                </p>
                <p className="text-sm text-yellow-600 mt-1">
                    ⭐ {game.rating.toFixed(1)}
                </p>
            </div>
        </div>
    )
}
