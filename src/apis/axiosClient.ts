import axios from 'axios'
import { toast } from 'react-toastify'
import { ACCESS_TOKEN, END_POINT } from 'src/const'

const axiosClient = axios.create({ baseURL: END_POINT })

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // attach access_token to every request header
    // const access_token = localStorage.getItem(ACCESS_TOKEN)

    // if (access_token && config.headers) {
    //   config.headers['Authorization'] = `Bear ${access_token}`
    // }

    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    if (response.data?.message) {
      toast(response.data.message, { type: 'success' })
    }

    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    const message = error?.response?.data?.message || error?.message || 'Request lỗi'
    toast(message, { type: 'error' })

    return Promise.reject(error)
  }
)

export default axiosClient
