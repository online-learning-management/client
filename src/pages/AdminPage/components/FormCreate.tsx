import { useState } from 'react'

// MUI ICONS
import { Visibility, VisibilityOff } from '@mui/icons-material'

// MUI COMPONENTS
import {
  Box,
  Grid,
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
} from '@mui/material'

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'

// REACT-HOOK-FORM, YUP
import { SchemaOf, object, string, ref } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

type FormCreateProps = {
  open: boolean
  onClose: () => void
}

type FormInputs = {
  full_name: string
  email?: string
  password: string
  confirm_password: string
  address: string
  date_of_birth: string
  speciality?: string
  gender?: string
}

const schema: SchemaOf<FormInputs> = object().shape({
  full_name: string().required('Yêu cầu nhập họ và tên!'),
  email: string().email(),
  password: string().min(6, 'Nhập lớn hơn 6 ký tự!').max(16).required('Yêu cầu nhập mật khẩu!'),
  confirm_password: string()
    .required('Yêu cầu nhập lại mật khẩu!')
    .oneOf([ref('password'), null], 'Mật khẩu không trùng khớp!'),
  address: string().required('Yêu cầu nhập địa chỉ!'),
  date_of_birth: string().required('Yêu cầu nhập ngày sinh!'),
  speciality: string(),
  gender: string().required('Yêu cầu chọn giới tính!'),
})

export default function FormCreate({ open, onClose }: FormCreateProps) {
  const [speciality, setSpeciality] = useState('english')

  // show/hidden password
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // react hook form
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
  })

  // =================== FUNCTION HANDLE ===================
  const handleSubmitForm: SubmitHandler<FormInputs> = (data: FormInputs) => {
    console.log(data)
  }

  console.log(errors)

  // const [value, setValue] = useState<Date | null>(new Date('2014-08-18T21:11:54'))

  return (
    <Modal open={open} onClose={onClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box bgcolor="white" width="600px" p={2} pt={6} borderRadius={2}>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <Grid container spacing={3}>
            <Grid item md={12}>
              <TextField
                label="Họ và tên"
                type="text"
                autoComplete="off"
                autoFocus
                fullWidth
                size="small"
                variant="outlined"
                error={!!errors.full_name}
                helperText={errors?.full_name?.message}
                {...register('full_name', { required: true })}
              />
            </Grid>

            <Grid item md={12}>
              <TextField label="Email" size="small" fullWidth variant="outlined" type="email" {...register('email')} />
            </Grid>

            <Grid item md={12}>
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
            </Grid>

            <Grid item md={12}>
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
            </Grid>

            <Grid item md={12}>
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
            </Grid>

            <Grid item md={6}>
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
            </Grid>

            <Grid item md={6}>
              <TextField
                label="Chuyên khoa"
                size="small"
                fullWidth
                select
                value={speciality}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setSpeciality(event.target.value)
                }}
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item md={12}>
              <FormLabel id="radio-group-label">Giới tính</FormLabel>
              {errors.gender && (
                <Typography sx={{ fontSize: '0.75rem', color: '#d32f2f' }}>{errors?.gender?.message}</Typography>
              )}
              <Controller
                name="gender"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <RadioGroup row aria-labelledby="radio-group-label" value={value} onChange={onChange}>
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                  </RadioGroup>
                )}
              />
            </Grid>

            {/* <Grid item md={3}>
              <TextField size="small" fullWidth label="Avatar" variant="standard" type="file" />
            </Grid> */}
          </Grid>

          <Box mt={2}>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Box>
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
