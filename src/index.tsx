import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import RenderRoute from '@/routes/render-route'
import routeMenu from '@/routes/menu'
import dva, { DvaContext } from '@/utils/dva'
import { message, ConfigProvider } from 'antd'
import antdZhCN from 'antd/es/locale/zh_CN'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
// import customHistory from '@/utils/custom-history'
import './index.less'

const App = () => {
    message.config({ maxCount: 1 })
    const _history = createBrowserHistory()
    const app = dva(_history)
    const store = app.getStore()

    return (
        <Router history={_history}>
            <ConfigProvider locale={antdZhCN}>
                <Provider store={store}>
                    <DvaContext.Provider value={{ app }}>
                        <RenderRoute menu={routeMenu} />
                    </DvaContext.Provider>
                </Provider>
            </ConfigProvider>
        </Router>
    )
}

ReactDom.render(<App />, document.getElementById('root'))
