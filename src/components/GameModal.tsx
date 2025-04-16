'use client'

import { useGameDetail } from '@/lib/useGameDetail'
import { Dialog } from '@headlessui/react'
import { Fragment } from 'react'

type GameModalProps = {
    gameId: number
    isOpen: boolean
    onClose: () => void
}

export default function GameModal({ gameId, isOpen, onClose }: GameModalProps) {
    const { data, isLoading, isError } = useGameDetail(gameId)

    return (
        <Dialog open={isOpen} onClose={onClose} as={Fragment}>
            <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
                <Dialog.Panel className="bg-white max-w-2xl w-full rounded-lg shadow-xl p-6 overflow-y-auto max-h-[90vh]">
                    <Dialog.Title className="text-2xl font-bold mb-2 text-black">{data?.name}</Dialog.Title>

                    {isLoading && <p>Načítám detail...</p>}
                    {isError && <p>Chyba při načítání detailu.</p>}

                    {data && (
                        <>
                            {data.background_image && (
                                <img src={data.background_image} alt={data.name} className="w-full rounded mb-4" />
                            )}
                            <p className="text-sm text-gray-500 mb-2">Vydáno: {data.released}</p>
                            <p className="mb-4 text-gray-700">{data.description_raw}</p>
                            <div className="flex flex-wrap gap-2 text-sm">
                                {data.genres.map((genre) => (
                                    <span key={genre.id} className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
                    {genre.name}
                  </span>
                                ))}
                            </div>
                        </>
                    )}

                    <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl">
                        ×
                    </button>
                </Dialog.Panel>
            </div>
        </Dialog>
    )
}
