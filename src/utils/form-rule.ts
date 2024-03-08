/**
 * @description form表单使用的一些验证规则
 */

// 邮箱校验
export const emailRule = { pattern: /^[A-Za-z0-9-_\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '请输入正确的邮箱' }

// 密码校验
export const passwordRule = { pattern: /^[a-zA-Z0-9-_.@]{8,20}$/, message: '请输入8-20位英文、数字、符号_-.@' }

// 手机校验
export const phoneRule = { pattern: /^[0-9]{0,11}$/, message: '请输入正确的手机号' }

// 昵称校验
// export const nickNameRule = { pattern: /^[A-Za-z0-9_]{3,20}$/, message: '请输入3～20位字母、数字、下划线' }
export const nickNameRule = { pattern: /^[a-zA-Z0-9_\u4e00-\u9fa5]{2,20}$/, message: '请输入2～20位中文、字母、数字、下划线' }

// 工号校验
export const jobNumberRule = { pattern: /^[a-zA-Z0-9_\u4e00-\u9fa5]{2,40}$/, message: '请输入2～40位中文、字母、数字、下划线' }

// 用户名校验
export const nameRule = { pattern: /^[A-Za-z0-9_]{3,20}$/, message: '请输入3～20位字母、数字、下划线' }

// 项目名校验
export const projectNameRule = { pattern: /^[a-zA-Z0-9_\-()\u4e00-\u9fa5]{2,50}$/, message: '请输入2～50位中文、英文、数字、下划线、中划线或小括号' }

// 项目负责人校验
export const projectLeaderRule = {
    pattern: /^[a-zA-Z0-9_\-()\u4e00-\u9fa5]{0,40}$/,
    message: '请输入不超过40位中文、英文、数字、下划线、中划线或小括号'
}

// 项目版本校验
export const projectVersionRule = {
    pattern: /^[a-zA-Z0-9_\-.]{0,40}$/,
    message: '请输入不超过40位英文、数字、下划线、中划线或点'
}
