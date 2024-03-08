import React, { FC, Fragment } from 'react'
import { useSelector } from 'react-redux'

interface HandleAuthProps {
    auth?: string // 权限字段
}

const HandleAuth: FC<HandleAuthProps> = ({ children, auth = '' }) => {
    const { handleAuths } = useSelector(({ global }: any) => ({ handleAuths: global?.handleAuthority?.menus }))

    return !auth || handleAuths?.includes(auth) ? <Fragment>{children}</Fragment> : <Fragment />
}

export default HandleAuth
