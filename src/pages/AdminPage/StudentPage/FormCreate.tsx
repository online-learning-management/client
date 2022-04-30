import { useEffect, useState } from 'react'

// MUI ICONS
import { Visibility, VisibilityOff } from '@mui/icons-material'

// MUI COMPONENTS
import {
  Box,
  Radio,
  Modal,
  Button,
  MenuItem,
  FormLabel,
  TextField,
  RadioGroup,
  IconButton,
  Typography,
  InputAdornment,
  FormControlLabel,
  Stack,
} from '@mui/material'

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'

// REACT-HOOK-FORM, YUP
import { SchemaOf, object, string, ref } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { ModalFormType } from './types'

type FormCreateProps = {
  modal: ModalFormType
  onClose: () => void
}

type FormInputs = {
  full_name: string
  email?: string
  username: string
  password: string
  confirm_password: string
  address: string
  date_of_birth: string
  specialty?: string
  gender?: string
}

const schema: SchemaOf<FormInputs> = object().shape({
  full_name: string().required('Yêu cầu nhập họ và tên!'),
  email: string().email('Đính dạng email không đúng!'),
  username: string().required('Yêu cầu nhập tên tài khoản!'),
  password: string().min(6, 'Nhập lớn hơn 6 ký tự!').max(16).required('Yêu cầu nhập mật khẩu!'),
  confirm_password: string()
    .required('Yêu cầu nhập lại mật khẩu!')
    .oneOf([ref('password'), null], 'Mật khẩu không trùng khớp!'),
  address: string().required('Yêu cầu nhập địa chỉ!'),
  date_of_birth: string().required('Yêu cầu nhập ngày sinh!'),
  specialty: string(),
  gender: string().required('Yêu cầu chọn giới tính!'),
})

export default function FormCreate({ modal: { open, data, type }, onClose }: FormCreateProps) {
  // show/hidden password
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // react hook form
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({ resolver: yupResolver(schema) })

  // =================== EFFECT ===================
  useEffect(() => {
    reset(data || {})
  }, [data, open])

  // =================== FUNCTION HANDLE ===================
  const handleSubmitForm: SubmitHandler<FormInputs> = (data: FormInputs) => {
    console.log(data)
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
    >
      <Box sx={{ width: '600px', maxHeight: '86%', p: 2, bgcolor: 'white', borderRadius: 2, overflow: 'auto' }}>
        <form onSubmit={handleSubmit(handleSubmitForm)} autoComplete="off">
          <Stack spacing={2}>
            <Typography variant="h5" component="h4" align="center" mt={1} mb={2} gutterBottom>
              {type === 'CREATE' ? 'Thêm mới sinh viên' : 'Sửa thông tin sinh viên'}
            </Typography>

            <TextField
              label="Họ và tên"
              type="text"
              autoFocus
              fullWidth
              size="small"
              variant="outlined"
              error={!!errors.full_name}
              helperText={errors?.full_name?.message}
              {...register('full_name', { required: true })}
            />

            <TextField
              label="Email"
              size="small"
              fullWidth
              variant="outlined"
              type="text"
              error={!!errors.email}
              helperText={errors?.email?.message}
              {...register('email')}
            />

            <TextField
              label="Tên đăng nhập"
              size="small"
              fullWidth
              variant="outlined"
              type="text"
              error={!!errors.username}
              helperText={errors?.username?.message}
              {...register('username')}
            />

            <TextField
              label="Mật khẩu"
              size="small"
              fullWidth
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {showPassword ? (
                      <IconButton size="small" onClick={() => setShowPassword(false)}>
                        <Visibility />
                      </IconButton>
                    ) : (
                      <IconButton size="small" onClick={() => setShowPassword(true)}>
                        <VisibilityOff />
                      </IconButton>
                    )}
                  </InputAdornment>
                ),
              }}
              error={!!errors.password}
              helperText={errors?.password?.message}
              {...register('password', { required: true })}
            />

            <TextField
              label="Nhập lại mật khẩu"
              size="small"
              fullWidth
              variant="outlined"
              type={showConfirmPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {showConfirmPassword ? (
                      <IconButton size="small" onClick={() => setShowConfirmPassword(false)}>
                        <Visibility />
                      </IconButton>
                    ) : (
                      <IconButton size="small" onClick={() => setShowConfirmPassword(true)}>
                        <VisibilityOff />
                      </IconButton>
                    )}
                  </InputAdornment>
                ),
              }}
              error={!!errors.confirm_password}
              helperText={errors?.confirm_password?.message}
              {...register('confirm_password', { required: true })}
            />

            <TextField
              label="Địa chỉ"
              size="small"
              fullWidth
              variant="outlined"
              type="text"
              {...register('address', { required: true })}
              error={!!errors.address}
              helperText={errors?.address?.message}
            />

            <Controller
              name="date_of_birth"
              control={control}
              render={({ field: { value, onChange } }) => (
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    label="Ngày sinh"
                    // inputFormat="dd/MM//yyyy"
                    value={value}
                    onChange={onChange}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        size="small"
                        {...params}
                        error={!!errors.date_of_birth}
                        helperText={errors?.date_of_birth?.message}
                      />
                    )}
                  />
                </LocalizationProvider>
              )}
            />

            <Box>
              <FormLabel id="radio-group-label">Giới tính</FormLabel>
              {errors.gender && (
                <Typography sx={{ fontSize: '0.75rem', color: '#d32f2f' }}>{errors?.gender?.message}</Typography>
              )}

              <Controller
                name="gender"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <RadioGroup row aria-labelledby="radio-group-label" value={value} onChange={onChange}>
                    <FormControlLabel value="female" control={<Radio />} label="Nữ" />
                    <FormControlLabel value="male" control={<Radio />} label="Nam" />
                  </RadioGroup>
                )}
              />
            </Box>

            {/* <TextField size="small" fullWidth label="Avatar" variant="standard" type="file" /> */}

            <Box py={2}>
              <Button fullWidth variant="contained" type="submit">
                Submit
              </Button>
            </Box>
          </Stack>
        </form>
      </Box>
    </Modal>
  )
}

const currencies = [
  {
    value: 'english',
    label: 'Tiếng anh CNTT',
  },
  {
    value: 'php',
    label: 'Lập trinh web bằng PHP',
  },
  {
    value: 'mysql',
    label: 'Cơ sở dữ liệu',
  },
]
