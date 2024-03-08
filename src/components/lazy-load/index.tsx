import React, { FC, Suspense, ComponentType, lazy } from 'react'

const LazyLoad = (loader: () => Promise<{ default: ComponentType<any> }>) => {
    return (Loading?: FC) => {
        const LazyComponent = lazy(loader)

        const Component: FC<any> = (props) => {
            return (
                <Suspense fallback={Loading ? <Loading /> : <div />}>
                    <LazyComponent {...props} />
                </Suspense>
            )
        }

        return Component
    }
}

// 和 lazyLoad 统一格式
export const requireLoad = (load: () => any) => {
    return () => load()
}

export default LazyLoad
