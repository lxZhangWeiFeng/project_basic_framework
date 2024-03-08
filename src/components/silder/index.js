import { isFunction } from '@/utils/judge-type'
import React, { useEffect, useRef, useState } from 'react'
import styles from './index.less'

const Slider = ({ list, render, scrollHeight = 22 }) => {
    // const [list] = useState([1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13])

    const [isScrolle, setIsScrolle] = useState(true)

    // 滚动速度，值越小，滚动越快
    const speed = 0.2
    const warper = useRef()
    const childDom1 = useRef()
    const childDom2 = useRef()

    let timer = useRef()

    const animate = () => {
        warper.current.scrollTop >= childDom1.current.scrollHeight ? (warper.current.scrollTop = 0) : (warper.current.scrollTop += 0.5)
        timer.current = requestAnimationFrame(animate)
    }

    // 开始滚动
    useEffect(() => {
        // 多拷贝一层，让它无缝滚动
        if (list?.length > 1) {
            childDom2.current.innerHTML = childDom1.current.innerHTML
            timer.current = requestAnimationFrame(animate)
        } else if (timer.current) {
            cancelAnimationFrame(timer.current)
        }

        return () => {
            cancelAnimationFrame(timer.current)
        }
    }, [list])

    const hoverHandler = (flag) => {
        if (!flag) {
            cancelAnimationFrame(timer.current)
        } else {
            timer.current = requestAnimationFrame(animate)
        }
    }

    return (
        <>
            <div className={styles['parent']} ref={warper} style={{ height: scrollHeight }}>
                <div className={styles['child']} ref={childDom1} onMouseOver={() => hoverHandler(false)} onMouseLeave={() => hoverHandler(true)}>
                    {list.map((item, i) =>
                        isFunction(render) ? (
                            render(item, i)
                        ) : (
                            <div className={styles['item']} key={item}>
                                {item}
                            </div>
                        )
                    )}
                </div>
                <div className={styles['child']} ref={childDom2}></div>
            </div>
        </>
    )
}

export default Slider
