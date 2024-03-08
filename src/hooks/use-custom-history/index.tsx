import { useHistory } from 'react-router-dom'
import BreadCrumbContext from '@/context/bread-crumb-context'
import { useContext } from 'react'
import H from 'history'

type fixedHistory = H.History & { fixedGoBack: anyFunction }

const useFixedHistory = () => {
    const { list } = useContext(BreadCrumbContext)

    const _history = useHistory()
    const history = _history as fixedHistory

    history.fixedGoBack = () => {
        console.log('list', list)
    }

    return history
}

export default useFixedHistory
