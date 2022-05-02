import { useEffect, useState } from 'react'

// MUI ICONS
import { Visibility, VisibilityOff } from '@mui/icons-material'

// MUI COMPONENTS
import {
  Box,
  Radio,
  Modal,
  MenuItem,
  FormLabel,
  TextField,
  RadioGroup,
  IconButton,
  Typography,
  InputAdornment,
  FormControlLabel,
  Stack,
  Alert,
  Snackbar,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'

// REACT-HOOK-FORM, YUP
import { SchemaOf, object, string, ref } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import type { ModalCreateType } from './types'

import { SpecialtyType } from 'src/types'
import useTeacherMutate from 'src/hooks/reactQueryHooks/useTeacherMutate'
import useSpecialtyQuery from 'src/hooks/reactQueryHooks/useSpecialtyQuery'

type FormCreateProps = {
  modal: ModalCreateType
  onClose: () => void
}

type FormInputs = {
  full_name: string
  email?: string
  username: string
  password?: string
  confirm_password?: string
  address: string
  date_of_birth: string
  specialty?: string
  gender?: string
}

const schema: (type: 'CREATE' | 'UPDATE') => SchemaOf<FormInputs> = (type) =>
  object().shape({
    full_name: string().required('Yêu cầu nhập họ và tên!'),
    email: string().email('Đính dạng email không đúng!'),
    username: string().required('Yêu cầu nhập tên tài khoản!'),
    ...(type === 'CREATE'
      ? {
          password: string().min(6, 'Nhập lớn hơn 6 ký tự!').max(16).required('Yêu cầu nhập mật khẩu!'),
          confirm_password: string()
            .required('Yêu cầu nhập lại mật khẩu!')
            .oneOf([ref('password'), null], 'Mật khẩu không trùng khớp!'),
        }
      : {
          password: string().min(6, 'Nhập lớn hơn 6 ký tự!').max(16),
          confirm_password: string().oneOf([ref('password'), null], 'Mật khẩu không trùng khớp!'),
        }),
    address: string().required('Yêu cầu nhập địa chỉ!'),
    date_of_birth: string().required('Yêu cầu nhập ngày sinh!'),
    specialty: string(),
    gender: string().required('Yêu cầu chọn giới tính!'),
  })

export default function FormCreate({ modal: { open, data: initData, type }, onClose }: FormCreateProps) {
  // show/hidden password
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // perform action after request success or error
  const onSuccess = () => {
    onClose()
  }
  // const onError = () => { onClose() }

  // react-query
  const { data } = useSpecialtyQuery.getAll()
  const {
    mutate: mutateCreate,
    data: createResponse,
    isLoading: isLoadingCreate,
    isSuccess: isSuccessCreate,
  } = useTeacherMutate.create(onSuccess)
  const {
    mutate: mutateUpdate,
    data: updateResponse,
    isLoading: isLoadingUpdate,
    isSuccess: isSuccessUpdate,
  } = useTeacherMutate.update(onSuccess)

  const specialties: SpecialtyType[] = data?.data || []

  // react hook form
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({ resolver: yupResolver(schema(type)) })

  // =================== EFFECT ===================
  useEffect(() => {
    reset(initData || {})
  }, [initData, open])

  // =================== FUNCTION HANDLE ===================
  const handleSubmitForm: SubmitHandler<FormInputs> = (data: FormInputs) => {
    if (type === 'CREATE') mutateCreate(data)
    else if (type === 'UPDATE') mutateUpdate({ ...initData, ...data })
  }

  return (
    <>
      {/* <Snackbar open={isSuccessCreate} autoHideDuration={1000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert variant="filled" severity="success">
          {createResponse?.message}
        </Alert>
      </Snackbar>

      <Snackbar
        open={isSuccessUpdate}
        resumeHideDuration={100}
        autoHideDuration={100}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert variant="filled" severity="success">
          {updateResponse?.message}
        </Alert>
      </Snackbar> */}

      <Modal
        open={open}
        onClose={onClose}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
      >
        <Box sx={{ width: '600px', maxHeight: '86%', p: 2, bgcolor: 'white', borderRadius: 2, overflow: 'auto' }}>
          <form onSubmit={handleSubmit(handleSubmitForm)} autoComplete="on">
            <Stack spacing={2}>
              <Typography variant="h5" component="h4" align="center" mt={1} mb={2} gutterBottom>
                {type === 'CREATE' ? 'Thêm mới giáo viên' : 'Sửa thông tin giáo viên'}
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

              {type === 'CREATE' && (
                <>
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
                </>
              )}

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

              <Stack direction="row" spacing={2}>
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

                <Controller
                  name="specialty"
                  control={control}
                  render={({ field }) => (
                    <TextField label="Chuyên khoa" size="small" fullWidth select {...field}>
                      {specialties.map((option) => (
                        <MenuItem key={option.id} value={option.specialty_name}>
                          {option.specialty_name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Stack>

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
                <LoadingButton
                  loading={type === 'CREATE' ? isLoadingCreate : isLoadingUpdate}
                  fullWidth
                  variant="contained"
                  type="submit"
                >
                  Submit
                </LoadingButton>
              </Box>
            </Stack>
          </form>
        </Box>
      </Modal>
    </>
  )
}
