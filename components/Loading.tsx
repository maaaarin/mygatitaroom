import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button } from "@heroui/button";

var phrases = [
    "Preparing your room...",
    "Tidying up a bit...",
    "Placing the furniture...",
    "Adjusting the lighting...",
    "Sweeping the floor...",
    "Fluffing the pillows...",
    "Warming up the space...",
    "Finalizing the details...",
    "Almost there...",
    "Just a moment...",
    "Loading your dream room...",
    "Setting the perfect ambiance..."
];

var stickers = [
    "/images/gif/eating.gif",
    "/images/gif/typing.gif",
    "/images/gif/fresh.gif"
];

export const Loading = () => {

    const [isLoaded, setIsLoaded] = useState(false);

    const [phrase, setPhrase] = useState(phrases[0]);
    const [sticker, setSticker] = useState(stickers[Math.floor(Math.random() * stickers.length)]);

    useEffect(() => {
        let phraseInterval = setInterval(() => {
            changePhrase();
        }, 1000);
        return () => clearInterval(phraseInterval)
    }, []);

    function changePhrase() {
        let newPhrase;
        do {
            newPhrase = phrases[Math.floor(Math.random() * phrases.length)];
        } while (newPhrase === phrase);
        setPhrase(newPhrase)
    }

    return (
        <div className='w-screen h-screen relative flex justify-center items-center bg-black'>
            <div className='inset-0 flex flex-col gap-6 justify-center items-center'>
                <Image src={sticker} alt="alt" width={175} height={175} />
                {!isLoaded ?
                    <span className='text-xl text-white'>{phrase}</span>
                    :
                    <Button className='rounded-full bg-white text-primary font-bold px-12'>Enter</Button>
                }
            </div>
        </div>
    )
}
