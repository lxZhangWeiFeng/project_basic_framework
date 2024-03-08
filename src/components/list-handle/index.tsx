import React, { CSSProperties, FC, Fragment, useRef, useState } from 'react'
import { Popconfirm, Spin, Tooltip, Popover, Menu, Dropdown, Badge } from 'antd'
import { getIcon } from '@/utils/const'
import Icon from '@/components/icon'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import { LoadingOutlined } from '@ant-design/icons'
import { isBoolean, isFunction, isObject } from '@/utils/judge-type'
import styles from './index.less'

export type menuProps = {
    items: any[]
    onClickMenu?: anyFunction
}

export type listItem = {
    name: string
    onClick?: anyFunction
    confirm?: string | number | JSX.Element
    confirmWidth?: number
    confirmDanger?: boolean
    modal?: JSX.Element
    hidden?: boolean
    auth?: string
    tooltip?: boolean | string | JSX.Element
    hiddenName?: boolean
    loading?: boolean
    defaultLoading?: boolean
    disabled?: boolean
    hiddenIcon?: boolean
    size?: number
    menu?: menuProps
    // dotStatus?: 'success' | 'processing' | 'default' | 'error' | 'warning' | false
    badgeIcon?: anyObject
    iconImage?: any
}

const LoadingIcon: FC = () => {
    const ref = useRef<any>()
    const [state, setState] = useState(false)

    // 防止动画多次触发（在dropdown下会触发2次）
    const onAnimationStart = (): void => {
        clearTimeout(ref.current)
        ref.current = setTimeout(() => setState(true), 210)
    }

    return <LoadingOutlined style={{ animationPlayState: !state ? 'paused' : 'running', fontSize: 22 }} onAnimationStart={onAnimationStart} />
}

type RenderItemProps = {
    hiddenName?: boolean
    divider?: boolean
    style?: CSSProperties
    item: listItem
    isShow: boolean
    judgeAuth: anyFunction
    onClose?: anyFunction
}

// 渲染items，在没有权限时，没有modal， 没有confirm，没有onClick，并做隐藏item处理（避免按钮错位）
const RenderItem: FC<RenderItemProps> = (props) => {
    const [toolVisible, setToolVisible] = useState(false)
    const [popVisible, setPopVisible] = useState(false)
    const { item, isShow, hiddenName: ___hiddenName = false, divider = false, style = {}, judgeAuth, onClose } = props
    const {
        name,
        onClick,
        confirm,
        confirmWidth,
        confirmDanger = true,

        modal,
        auth,
        hidden,
        loading = false,
        tooltip,
        hiddenName: _hiddenName = false,
        defaultLoading = false,
        disabled = false,
        hiddenIcon = false,
        menu = {},
        size = 16,
        // dotStatus = false,
        badgeIcon,
        iconImage
    } = item
    const hiddenName = ___hiddenName || _hiddenName
    const haveAuth = judgeAuth({ auth, hidden, loading } as listItem)
    const haveHandle = haveAuth && !loading && !disabled
    // 有 defaultLoading 的情况 button 使用 innerOnClick，Spin 使用 innerLoading， confirm 不受影响
    const [innerLoading, setInnerLoading] = useState(false)
    const { onClickMenu, items } = menu as any

    // const badgeOffset: any = [0, 3]

    const innerOnClick = async () => {
        try {
            await setInnerLoading(true)
            if (isFunction(onClick)) await onClick()
            await setInnerLoading(false)
        } catch (e) {
            await setInnerLoading(false)
        }
    }
    const innerOnClickMenu = async (v: any) => {
        try {
            await setInnerLoading(true)
            if (isFunction(onClickMenu)) await onClickMenu(v)
            await setInnerLoading(false)
        } catch (e) {
            await setInnerLoading(false)
        }
    }
    const trueLoading = haveAuth && (defaultLoading ? innerLoading : loading)
    const baseClassName = classNames(isShow ? styles['show-item'] : styles['hidden-item'], {
        [styles['divider']]: divider,
        [styles['no-auth']]: !haveAuth,
        [styles['loading']]: trueLoading,
        [styles['disabled']]: disabled
    })
    const baseStyle = { ...style }

    const IconImageDom = <img src={iconImage} style={{ marginRight: 3, width: size }} />

    const Inner = (
        <Fragment>
            <Tooltip
                visible={(popVisible ? false : toolVisible) as boolean}
                onVisibleChange={setToolVisible}
                arrowPointAtCenter
                title={tooltip && isBoolean(tooltip) ? name : tooltip}
            >
                <Spin spinning={trueLoading} indicator={isShow ? <LoadingOutlined /> : <LoadingIcon />}>
                    {/* {!hiddenIcon && (
                        <Badge className={styles['icon-badge']} dot={!!dotStatus} status={dotStatus || 'default'} offset={badgeOffset}>
                            <Icon name={getIcon(name)} className={styles['icon']} size={size} />
                        </Badge>
                    )} */}
                    {!hiddenIcon && (
                        <span className={styles['icon-box']}>
                            {isObject(badgeIcon) && badgeIcon.icon && (
                                <span className={styles['badge-icon']}>
                                    <Icon name={badgeIcon.icon} color={badgeIcon.color} size={10} />
                                </span>
                            )}
                            {iconImage ? IconImageDom : <Icon name={getIcon(name)} className={styles['icon']} size={size} />}
                        </span>
                    )}
                    {!hiddenName && <span className={styles['name']}>{name}</span>}
                </Spin>
            </Tooltip>
            {haveHandle && !!modal && modal}
        </Fragment>
    )
    const InnerHasMenu = (
        // <Fragment>
        <Spin spinning={trueLoading} indicator={isShow ? <LoadingOutlined /> : <LoadingIcon />}>
            <Dropdown
                placement="bottomLeft"
                getPopupContainer={(triggerNode: any) => triggerNode.parentElement}
                overlay={
                    !disabled ? (
                        <Menu
                            onClick={({ key }: any) => {
                                if (defaultLoading) {
                                    innerOnClickMenu(key)
                                } else if (onClickMenu) {
                                    onClickMenu(key)
                                }
                            }}
                        >
                            {items?.map(({ key, badgeIcon, label, hidden, disabled, tooltip }: any) =>
                                !hidden ? (
                                    <Menu.Item key={key} disabled={disabled}>
                                        <Tooltip title={tooltip}>
                                            <span className={styles['icon-box']}>
                                                {isObject(badgeIcon) && badgeIcon.icon && (
                                                    <span className={styles['badge-icon']}>
                                                        <Icon name={badgeIcon.icon} color={badgeIcon.color} size={10} />
                                                    </span>
                                                )}
                                                {label}
                                            </span>
                                        </Tooltip>
                                    </Menu.Item>
                                ) : (
                                    <Fragment key={key} />
                                )
                            )}
                        </Menu>
                    ) : (
                        <Fragment />
                    )
                }
            >
                <div>
                    {!hiddenIcon && (
                        <span className={styles['icon-box']}>
                            {isObject(badgeIcon) && badgeIcon.icon && (
                                <span className={styles['badge-icon']}>
                                    <Icon name={badgeIcon.icon} color={badgeIcon.color} size={10} />
                                </span>
                            )}
                            {iconImage ? IconImageDom : <Icon name={getIcon(name)} className={styles['icon']} size={size} />}
                        </span>
                    )}
                    {!hiddenName && <span className={styles['name']}>{name}</span>}
                </div>
            </Dropdown>
        </Spin>

        // </Fragment>
    )

    return (
        <span
            key={name}
            onClick={(e) => {
                if (e) e.stopPropagation()
            }}
        >
            {haveHandle && confirm ? (
                <Popconfirm
                    visible={popVisible}
                    onVisibleChange={(v) => {
                        setPopVisible(v)
                        if (v) setToolVisible(false)
                    }}
                    title={confirm}
                    getPopupContainer={(triggerNode) => (document.getElementById('scroll-root') as any) || triggerNode.parentElement}
                    overlayStyle={{ width: confirmWidth, wordBreak: 'break-all' }}
                    onConfirm={(e: any) => {
                        e.stopPropagation()
                        onClick && onClick()
                        onClose && onClose()
                    }}
                    okText="确认"
                    cancelText="取消"
                    okButtonProps={{ danger: confirmDanger }}
                    placement="topRight"
                    arrowPointAtCenter
                >
                    <a className={baseClassName} style={baseStyle}>
                        {items?.length ? InnerHasMenu : Inner}
                    </a>
                </Popconfirm>
            ) : (
                <a
                    className={baseClassName}
                    style={baseStyle}
                    onClick={(e): void => {
                        e.stopPropagation()
                        haveHandle && !items?.length && (defaultLoading ? innerOnClick() : onClick && onClick())
                        onClose && onClose()
                    }}
                >
                    {items?.length ? InnerHasMenu : Inner}
                </a>
            )}
        </span>
    )
}

type handleListProps = {
    list?: listItem[]
    hiddenList?: listItem[]
    hiddenName?: boolean
    divider?: boolean
    style?: CSSProperties
    className?: string
    hiddenAll?: boolean
}

const HandleList: FC<handleListProps> = ({ list, hiddenList, hiddenName = false, divider = false, style = {}, className, hiddenAll = true }) => {
    const { handleAuths } = useSelector(({ global }: any) => ({ handleAuths: global?.handleAuthority?.menus }))
    const [visible, setVisible] = useState(false)
    // 判断是否有权限
    const judgeAuth = ({ auth, hidden }: listItem): boolean => (!auth || handleAuths?.includes(auth)) && !hidden
    // 筛选有权限的list
    const formatList = (l: listItem[]): listItem[] => l.filter(judgeAuth)
    // 在上面显示的items（权限判断在renderItem里判断，需要做隐藏处理）
    const showList = Array.isArray(list) ? formatList(list) : []
    // 需要更多展开的items（直接筛选）
    const notShowList = formatList(Array.isArray(hiddenList) ? hiddenList : [])

    // 判断是否有隐藏items
    const haveHidden = (hiddenAll && [...showList, ...notShowList]?.length) || notShowList.length > 0

    const RenderItemSameProps = {
        hiddenName,
        divider,
        style,
        judgeAuth
    }

    const onClose = () => {
        setVisible(false)
    }

    const overlay = (list: any) => (
        <div className={styles['drop-down']}>
            {list.map((item: any) => (
                <RenderItem key={item.name} item={item} isShow={false} onClose={onClose} {...RenderItemSameProps} />
            ))}
        </div>
    )

    return (
        <div className={classNames(styles['wrapper'], className)}>
            {!hiddenAll && showList.map((item) => <RenderItem key={item.name} item={item} isShow={true} {...RenderItemSameProps} />)}
            {haveHidden && (
                <Popover
                    content={overlay(hiddenAll ? [...showList, ...notShowList] : notShowList)}
                    arrowPointAtCenter
                    placement="leftTop"
                    trigger="click"
                    overlayClassName={styles['popover']}
                    getPopupContainer={(triggerNode: any) => triggerNode.parentElement}
                    visible={visible}
                    onVisibleChange={(v) => {
                        setVisible(v)
                    }}
                >
                    <a className={styles['show-item']}>
                        {hiddenAll ? (
                            <Icon name="more-circle" size={26} color="#00000040" />
                        ) : (
                            <>
                                <Icon name={getIcon('更多')} />
                                更多
                            </>
                        )}
                    </a>
                </Popover>
            )}
        </div>
    )
}

export default HandleList
