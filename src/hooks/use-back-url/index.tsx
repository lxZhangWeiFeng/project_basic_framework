import { useLocation } from 'react-router-dom'

const useBackUrl = (backUrl: string) => {
    const { state } = useLocation<any>()
    const { beforeUrl } = state || {}

    return beforeUrl === backUrl ? backUrl : ''
}

export default useBackUrl
