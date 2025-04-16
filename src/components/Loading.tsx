'use client'

import dynamic from 'next/dynamic'

// Dynamický import až na klientu
const Lottie = dynamic(() => import('lottie-react'), { ssr: false })
import animationData from '@/../public/lottie/game-controller.json'

export default function Loading() {
    return (
        <div className="flex justify-center items-center h-[50vh]">
            <Lottie animationData={animationData} className="w-48 h-48" loop />
        </div>
    )
}
