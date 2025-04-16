'use client'

import { useGameDetail } from '@/lib/useGameDetail'
import { Dialog } from '@headlessui/react'
import { Fragment } from 'react'
import Loading from "@/components/Loading";

type GameModalProps = {
    gameId: number
    isOpen: boolean
    onClose: () => void
}

export default function GameModal({ gameId, isOpen, onClose }: GameModalProps) {
    const { data, isLoading, isError } = useGameDetail(gameId)

    return (
        <Dialog open={isOpen} onClose={onClose} as={Fragment}>
            <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4">
                <Dialog.Panel className="bg-zinc-900 text-white max-w-5xl w-full rounded-xl shadow-xl p-6 overflow-y-auto max-h-[90vh] relative">
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-zinc-400 hover:text-white text-2xl"
                    >
                        ×
                    </button>

                    {/* Loading / Error */}
                    {isLoading && <Loading/>}
                    {isError && <p className="text-center text-red-400">Chyba při načítání detailu.</p>}

                    {/* Content */}
                    {data && (
                        <>
                            {/* Title */}
                            <Dialog.Title className="text-3xl font-bold mb-4">{data.name}</Dialog.Title>


                            {/* Image */}
                            {data.background_image && (
                                <img
                                    src={data.background_image}
                                    alt={data.name}
                                    className="w-full h-64 object-cover rounded-lg mb-6"
                                />
                            )}

                            {/* Info Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 text-sm text-zinc-300">
                                <div>
                                    <p className="mb-1">📅 Vydání:</p>
                                    <p className="text-white">{data.released || 'Neznámé'}</p>
                                </div>
                                <div>
                                    <p className="mb-1">⭐ Hodnocení:</p>
                                    <p className="text-yellow-400">{data.rating?.toFixed(1) ?? 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="mb-1">🏷️ Žánry:</p>
                                    <p className="text-white">
                                        {data.genres?.map((g) => g.name).join(', ') || 'Neznámé'}
                                    </p>
                                </div>



                            </div>

                            {/* Description */}
                            {data.description_raw && (
                                <div className="mb-4 text-sm leading-relaxed text-zinc-300">
                                    <h3 className="text-lg font-semibold mb-2 text-white">📖 Popis</h3>
                                    <p>{data.description_raw}</p>
                                </div>
                            )}
                        </>
                    )}
                </Dialog.Panel>
            </div>
        </Dialog>
    )
}
