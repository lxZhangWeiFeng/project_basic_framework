import { useEffect, useState } from 'react'

export default function useStateFromValue(v: any) {
    const [value, setValue] = useState(v)

    useEffect(() => {
        setValue(v)
    }, [JSON.stringify(v)])

    return [value, setValue]
}
