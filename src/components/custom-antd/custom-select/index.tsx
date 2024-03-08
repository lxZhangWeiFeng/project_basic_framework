import React, { FC } from 'react'
import { Select as AntdSelect, SelectProps } from 'antd'

const Select: FC<SelectProps<any>> = (props) => {
    return <AntdSelect getPopupContainer={() => document.getElementById('scroll-root') || document.body} {...props} />
}

const Option = AntdSelect.Option
const OptGroup = AntdSelect.OptGroup
type SelectType = typeof Select
interface SelectInterFace extends SelectType {
    Option: typeof Option
    OptGroup: typeof OptGroup
}
const newSelect = Select as SelectInterFace
newSelect.Option = Option
newSelect.OptGroup = OptGroup

export default newSelect
