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
            className="cursor-pointer bg-zinc-800 hover:bg-zinc-700 rounded-xl overflow-hidden shadow hover:shadow-xl transition"
        >
            {game.background_image && (
                <img
                    src={game.background_image}
                    alt={game.name}
                    className="w-full h-48 object-cover"
                />
            )}
            <div className="p-4">
                <h3 className="text-base font-semibold">{game.name}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">
                    {game.released ? `🎯 ${game.released}` : 'Datum neuveden'}
                </p>
                <p className="text-sm text-zinc-400">
                    🎮 {game.platforms.map(p => p.platform.name).join(', ')}
                </p>
                <p className="text-sm text-yellow-500 mt-1">⭐ {game.rating.toFixed(1)}</p>
            </div>
        </div>
    )
}
