import LazyLoad, { requireLoad } from '@/components/lazy-load'

// 总路由
const routes = [
    {
        path: '/error/:id',
        title: '服务器错误',
        component: LazyLoad(() => import('@/pages/error'))
    },
    {
        path: '/',
        transition: true,
        component: requireLoad(() => require('@/layouts/out-layout')), // 全局layout
        models: ['global/modalState', 'global/listMultiple'],
        routes: [
            {
                path: '/',
                transition: true,
                component: requireLoad(() => require('@/layouts/basic-layout')), // 登录layout
                routes: [
                    {
                        path: '/',
                        redirect: '/test1'
                    },
                    {
                        component: requireLoad(() => require('@/pages/test1')),
                        hidden: false,
                        icon: 'dash-board-filled',
                        // isDefault: true,
                        models: [],
                        path: '/test1',

                        title: 'test1'
                    },
                    {
                        component: requireLoad(() => require('@/pages/test2')),
                        hidden: false,
                        icon: 'dash-board-filled',
                        // isDefault: false,
                        models: [],
                        path: '/test2',
                        title: 'test2'
                    },
                    {
                        redirect: '/error/404'
                    }
                ]
            }
        ]
    }
]

// menu control 外部嵌套的路由，以及一些不被控制的路由
const menuControlLayout = (menuControl: any[]): any[] => [
    {
        path: '/',
        transition: true,
        component: requireLoad(() => require('@/layouts/basic-layout')), // 登录layout
        routes: [...menuControl]
    }
]

export { menuControlLayout }
export default routes
