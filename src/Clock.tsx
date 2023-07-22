import React, {useEffect, useState} from 'react';

const zeroClock = (num: number) => num < 10 ? '0' + num : num
export const Clock = () => {

    const [clock, setClock] = useState(new Date())

    useEffect(() => {
        const intervalID = setInterval(() => {
            setClock(new Date())
        }, 1000)
        return () => clearInterval(intervalID)
    }, [])

    return (
        <div>
            <span> {zeroClock(clock.getHours())} </span>
            :
            <span>{zeroClock(clock.getMinutes())}</span>
            :
            <span>{zeroClock(clock.getSeconds())}</span>

        </div>
    )
}

