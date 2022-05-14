import axios from 'axios'
import { toast } from 'react-toastify'

import { END_POINT, USER } from 'src/const'
import { loginFailure, loginStart, loginSuccess } from './AuthActions'

export const login = async (body, dispatch) => {
  dispatch(loginStart())
  try {
    const { data } = await axios.post(`${END_POINT}/login`, body)

    localStorage.setItem(
      USER,
      JSON.stringify({
        access_token: data.access_token || null,
        refresh_token: data.refresh_token || null,
        ...data.data,
      })
    )

    if (data?.message) {
      toast(data.message, { type: 'success' })
    }

    dispatch(loginSuccess(data?.data))
  } catch (error) {
    dispatch(loginFailure())

    if (error instanceof Error) {
      toast(error?.response?.data?.message || error?.message || 'Đăng nhập thất bại!', { type: 'error' })
    }
  }
}
