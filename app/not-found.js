"use client";
import { Player } from '@lottiefiles/react-lottie-player'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="h-60 w-60 relative">
                <Player src='/error/404People.json' autoplay loop className='object-contain w-full' />
            </div>
            <Link href="/">Return Home</Link>
        </div>
    )
}
