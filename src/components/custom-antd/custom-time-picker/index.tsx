/**
 * @description 修改 Moment 为 Dayjs
 */

import { Dayjs } from 'dayjs'
import * as React from 'react'
import DatePicker from '../custom-date-picker'
import { PickerTimeProps } from 'antd/es/date-picker/generatePicker'

export type TimePickerProps = Omit<PickerTimeProps<Dayjs>, 'picker'>

const TimePicker = React.forwardRef<any, TimePickerProps>((props, ref) => {
    return <DatePicker {...props} picker="time" mode={undefined} ref={ref} />
})

TimePicker.displayName = 'TimePicker'

export default TimePicker
