import { useEffect, useState } from 'react'

// MUI ICONS
import { Visibility, VisibilityOff } from '@mui/icons-material'

// MUI COMPONENTS
import { Box, Stack, Button, MenuItem, TextField, Typography } from '@mui/material'

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

// REACT-HOOK-FORM, YUP
import { SchemaOf, object, string, ref, number } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

// react-query-hooks
import useSpecialtyQuery from 'src/hooks/reactQueryHooks/useSpecialtyQuery'
import useSubjectQuery from 'src/hooks/reactQueryHooks/useSubjectQuery'
import useTeacherQuery from 'src/hooks/reactQueryHooks/useTeacherQuery'

// TYPES
import { ClassType, SpecialtyType, SubjectType, UserType } from 'src/types'

import ModalCustom from 'src/components/ModalCustom'
import RegisterSchedule from './RegisterSchedule'

import { SPECIALTY_DATA } from 'src/fakeData/specialty'
import { SUBJECT_DATA } from 'src/fakeData/subject'

// ======================================================
type FormInputs = {
  class_id: string
  start_date: string
  max_number_students: number
  user_id: number
  subject_id: number
  specialty: number
}

const schema: SchemaOf<FormInputs> = object().shape({
  class_id: string().required('Nhập mã lớp học!'),
  start_date: string().required('Nhập ngày mở lớp!'),
  max_number_students: number().required('Nhập sĩ số!'),
  user_id: number().required('Chọn tên giảng viên!'),
  subject_id: number().required('Chọn môn học!'),
  specialty: number().required('Chọn chuyên khoa!'),
})

type ModalCreateProps = {
  open: boolean
  handleClose: () => void
}

// value = 0 is disabled | 1 is checked | 2 is disabled and checked
const TWO_D_ARRAY = new Array(16).fill(0).map(() => new Array(7).fill(0))

const convert2DArrayToArrayObject = (array: number[][]) => {
  const result = {}
  array.forEach((item, index) => {
    item.forEach((item2, index2) => {
      if (item2 === 1) {
        if (result[index2] === undefined) {
          result[index2] = [index]
        } else {
          result[index2] = [...result[index2], index]
        }
      }
    })
  })

  //
  const arrayResult = []
  Object.keys(result).forEach((key) => {
    arrayResult.push({
      day: Number(key),
      lessons: result[key],
    })
  })

  return arrayResult
}

export default function ModalCreate({ open, handleClose }: ModalCreateProps) {
  // =================== STATES ===================
  const [schedules, setSchedules] = useState<number[][]>(TWO_D_ARRAY)

  // =================== DATA ===================
  // react hook form
  const {
    control,
    watch,
    register,
    setValue,
    formState: { errors },
    handleSubmit: reactHookFormHandleSubmit,
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
  })

  // react-query
  const { data: specialtiesResponse } = useSpecialtyQuery.getAll()
  const { data: subjectsResponse } = useSubjectQuery.getAll()
  const { data: teachersResponse } = useTeacherQuery.getAll()

  // =================== EFFECT ===================
  useEffect(() => {
    setValue('start_date', '')
    setValue('max_number_students', 70)
  }, [])

  // =================== FUNCTIONS HANDLE ===================
  const handleSubmit: SubmitHandler<FormInputs> = (data: FormInputs) => {
    console.log({ ...data, schedules: convert2DArrayToArrayObject(schedules) })
  }

  const handleCheckSchedule = (isChecked: boolean, lesson: number, day: number) => {
    const newSchedules = [...schedules]
    newSchedules[lesson][day] = isChecked ? 1 : 0
    setSchedules(newSchedules)
  }

  return (
    <ModalCustom open={open} onClose={handleClose}>
      <form onSubmit={reactHookFormHandleSubmit(handleSubmit)} autoComplete="off">
        <Stack spacing={2}>
          <Typography variant="h5" component="h4" align="center" mt={1} mb={2} gutterBottom>
            Tạo lớp học
          </Typography>

          <TextField
            autoFocus
            label="Mã lớp học"
            size="small"
            fullWidth
            variant="outlined"
            type="text"
            error={!!errors.class_id}
            helperText={errors.class_id?.message}
            {...register('class_id')}
          />

          <Controller
            name="specialty"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                label="Chuyên khoa"
                size="small"
                fullWidth
                select
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                {...field}
              >
                {(specialtiesResponse?.data || []).map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.specialty_name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            name="subject_id"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                disabled={!watch('specialty')}
                label="Môn học"
                size="small"
                fullWidth
                select
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                {...field}
              >
                {(subjectsResponse?.data || []).map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.subject_name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            name="user_id"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                disabled={!watch('specialty')}
                label="Giảng viên"
                size="small"
                fullWidth
                select
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                {...field}
              >
                {(teachersResponse?.data || []).map((option) => (
                  <MenuItem key={option.user_id} value={option.user_id}>
                    {option.full_name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Stack spacing={2} direction="row">
            <Controller
              name="start_date"
              control={control}
              render={({ field, fieldState }) => (
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    label="Ngày mở lớp"
                    // inputFormat="dd/MM//yyyy"
                    {...field}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        size="small"
                        {...params}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                      />
                    )}
                  />
                </LocalizationProvider>
              )}
            />

            <TextField
              label="Sĩ số"
              size="small"
              fullWidth
              variant="outlined"
              type="number"
              InputProps={{ inputProps: { min: 20 } }}
              error={!!errors.max_number_students}
              helperText={errors.max_number_students?.message}
              {...register('max_number_students')}
            />
          </Stack>

          {!!watch('user_id') && <RegisterSchedule schedules={schedules} handleCheckSchedule={handleCheckSchedule} />}

          <Box py={2}>
            <Button fullWidth variant="contained" type="submit">
              Submit
            </Button>
          </Box>
        </Stack>
      </form>
    </ModalCustom>
  )
}
