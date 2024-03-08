export const clickBlock = ({ history, location, rd, path, state = {}, customPath }: any) => {
    history.push(customPath || `/project/detail/${rd?.id}/task/${rd?.lastCheckTaskId}/${path}`, { backUrl: location.pathname, ...state })
}
