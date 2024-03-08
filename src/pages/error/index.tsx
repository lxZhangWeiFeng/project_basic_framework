import React, { FC } from 'react'
import { Button } from 'antd'
import { useHistory, useParams } from 'react-router-dom'
import error403 from '@/assets/error/http-status-403.svg'
import error404 from '@/assets/error/http-status-404.svg'
import error500 from '@/assets/error/http-status-500.svg'
import styles from './index.less'

type block = {
    notice: string
    image: string
}

const ErrorTemplate: FC = () => {
    const history = useHistory()
    const params = useParams<any>()
    const { id } = params

    const defaultError = {
        notice: '抱歉，服务器开小差了',
        image: error500
    }

    const errorMapping: any = {
        500: defaultError,
        504: {
            notice: 'Gateway TimeOut',
            image: error500
        }
    }

    const getNoticeAndImage = (): block => {
        switch (Math.floor(id / 100)) {
            case 5:
                return errorMapping[id] || defaultError
            case 4:
                switch (Number(id)) {
                    case 403:
                        return {
                            notice: '抱歉，你无权访问该页面',
                            image: error403
                        }
                    case 404:
                        return {
                            notice: '抱歉，你访问的页面不存在',
                            image: error404
                        }
                    default:
                        return {
                            notice: '未知错误',
                            image: error404
                        }
                }
            default:
                return {
                    notice: '未知错误',
                    image: error404
                }
        }
    }

    const { notice, image } = getNoticeAndImage()

    return (
        <div className={styles['wrapper']}>
            <img className={styles['image']} src={image} />
            <div className={styles['wrapper-inner']}>
                <div className={styles['content']}>{id}</div>
                <div className={styles['notice']}>{notice}</div>
                <Button type="primary" onClick={(): void => history.replace('/')}>
                    返回首页
                </Button>
            </div>
        </div>
    )
}

export default ErrorTemplate
