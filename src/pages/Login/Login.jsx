import * as React from 'react'
import Box from '@mui/material/Box'
import { Button, TextField, Stack, IconButton } from '@mui/material'
import { useState } from 'react'
import { South } from '@mui/icons-material'
import ClassPage from '../ClassPage'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

export default function Login() {
  let [dataLogin, setDataLogin] = useState({ userName: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  let handleOnchange = (e) => {
    setDataLogin({ ...dataLogin, [e.target.name]: e.target.value })
  }

  let handleLogin = () => {
    console.log(dataLogin)
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }
  return (
    <div className="login">
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 2, width: '80%' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: '#ee9ca7',
          background: '-webkit-linear-gradient(to right, #ffdde1, #ee9ca7)',
          background: 'linear-gradient(to right, #ffdde1, #ee9ca7)',
          borderRadius: '10px',
          pb: '100px',
          pt: '100px',
          ml: '350px',
          mr: '350px',
          fontFamily: 'Roboto Slab',
        }}
        noValidate
        autoComplete="off"
      >
        <h1 className="flex justify-center">Đăng nhập</h1>

        <TextField
          id="outlined-basic"
          label="Tài khoản"
          variant="outlined"
          onChange={handleOnchange}
          name="userName"
          value={dataLogin.userName}
        />
        <br />
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Mật khẩu</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={dataLogin.password}
            name="password"
            onChange={handleOnchange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" edge="end" onClick={handleClickShowPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Mật khẩu"
          />
        </FormControl>
        <br />
        <Button variant="contained" onClick={handleLogin}>
          Đăng nhập
        </Button>
      </Box>
    </div>
  )
}
