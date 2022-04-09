import { message } from 'antd'

message.config({
  maxCount: 3,
})
const SuccessAlert = (params) => message.success(params)
const ErrorAlert = (params) => message.error(params)
const InfoAlert = (params) => message.info(params)
const LoadingAlert = (params) => message.loading(params)

export { SuccessAlert, ErrorAlert, InfoAlert, LoadingAlert }
