import axios from 'axios'
import store from '@redux'
import { ErrorAlert } from '@components/alerts'
import { signOutUserAction } from '@redux/auth'
// create default settings axios
const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
})
// Add a response interceptor
instance.interceptors.request.use(
  function (response) {
    // Do something with response data
    const url = response.url
    if (url !== '/sigin' && url !== '/signup') {
      const token = store.getState().auth.token
      if (token) {
        response.headers = {
          ...response.headers,
          Authentication: 'Bearer ' + token,
        }
      }
    }
    return response
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error)
  }
)
// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response?.data
  },
  function (error) {
    const errorData = error.response?.data || error

    ErrorAlert(errorData.message)
    if (errorData.statusCode === 401 || errorData.statusCode === 403) {
      store.dispatch(signOutUserAction())
    }
    // Do something with response error
    return Promise.reject(errorData)
  }
)

export default instance
