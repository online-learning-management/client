import { useEffect, useMemo, useState } from 'react'

// MUI ICONS
import {} from '@mui/icons-material'

// MUI COMPONENTS
import { Box, Stack, Button, MenuItem, TextField, Typography } from '@mui/material'

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

// REACT-HOOK-FORM, YUP
import { yupResolver } from '@hookform/resolvers/yup'
import { SchemaOf, object, string, number } from 'yup'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

// APP COMPONENTS
import ModalCustom from 'src/components/ModalCustom'
import RegisterSchedule from './RegisterSchedule'

// FAKE DATA
import { SPECIALTY_DATA } from 'src/fakeData/specialty'

// TYPES
import { SubjectType } from 'src/types'

// REACT-QUERY-HOOKS
import useTeacherQuery from 'src/hooks/reactQueryHooks/useTeacherQuery'
import useSubjectQuery from 'src/hooks/reactQueryHooks/useSubjectQuery'
import useSpecialtyQuery from 'src/hooks/reactQueryHooks/useSpecialtyQuery'

import useClassMutation from 'src/hooks/reactQueryHooks/useClassMutation'

// CONSTANTS
import { convert2DArrayToArrayObject, FORM_CREATE_LABEL, TWO_D_ARRAY } from '../const'

// ======================================================
type FormInputs = {
  class_id: string
  start_date: string
  max_number_students: number

  user_id: number
  subject_id: number
  specialty_id: number
}

const schema: SchemaOf<FormInputs> = object().shape({
  class_id: string().required('Nhập mã lớp!'),
  start_date: string().required('Nhập ngày mở lớp!'),
  max_number_students: number().required('Nhập sĩ số tối đa!'),

  user_id: number().required('Chọn giảng viên!'),
  subject_id: number().required('Chọn môn học!'),
  specialty_id: number().required('Chọn chuyên khoa!'),
})

type ModalCreateProps = {
  open: boolean
  handleClose: () => void
}

export default function ModalUpdate({ open, handleClose }: ModalCreateProps) {
  // =================== STATES ===================
  const clone2DArray = useMemo(() => TWO_D_ARRAY.map((row) => row.slice()), [])
  const [schedules, setSchedules] = useState<number[][]>(clone2DArray)

  const [specialtySelected, setSpecialtySelected] = useState<number>()
  const [teacherSelected, setTeacherSelected] = useState<number>()

  // =================== DATA ===================
  // react-hook-form
  const {
    control,
    register,
    reset,
    watch,
    formState: { errors },
    handleSubmit: reactHookFormHandleSubmit,
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      start_date: '',
      max_number_students: 70,
    },
  })

  // handle onSuccess / onError
  const onSuccess = () => handleClose()

  // react-query
  const { data: teacher } = useTeacherQuery.getById(teacherSelected)
  const { data: teachers } = useTeacherQuery.getAll({ specialty_id: specialtySelected }, !!specialtySelected)
  const { data: subjects } = useSubjectQuery.getAll({ specialty_id: specialtySelected }, !!specialtySelected)
  const { data: specialties } = useSpecialtyQuery.getAll()

  const { mutate: create } = useClassMutation.create(onSuccess)

  // =================== EFFECT ===================
  useEffect(() => {
    reset()
  }, [open])

  useEffect(() => {
    setSpecialtySelected(watch('specialty_id'))
  }, [watch('specialty_id')])

  useEffect(() => {
    setTeacherSelected(watch('user_id'))
  }, [watch('user_id')])

  // show schedules of teacher to RegisterSchedule
  useEffect(() => {
    const classes = teacher?.data?.teacher?.classes

    if (classes && classes?.length > 0) {
      classes.forEach((classItem) => {
        const schedules = (classItem?.schedules && JSON.parse(classItem?.schedules)) || []

        schedules.forEach((schedule) => {
          schedule?.lessons?.forEach((lesson) =>
            setSchedules((prevState) => {
              const newState = [...prevState]
              newState[+lesson][+schedule.day] = 2

              return newState
            })
          )
        })
      })
    }

    // clone 2D array and refesh state
    return () => setSchedules(TWO_D_ARRAY.map((row) => row.slice()))
  }, [teacher?.data])

  // =================== FUNCTIONS HANDLE ===================
  const handleSubmit: SubmitHandler<FormInputs> = (data: FormInputs) => {
    const convertToJson = JSON.stringify(convert2DArrayToArrayObject(schedules))
    create({ ...data, schedules: convertToJson })
  }

  const handleCheckSchedule = (isChecked: boolean, lesson: number, day: number) => {
    setSchedules((prevState) => {
      const newSchedules = [...prevState]
      newSchedules[lesson][day] = isChecked ? 1 : 0

      return newSchedules
    })
  }

  return (
    <ModalCustom width={1200} open={open} onClose={handleClose}>
      <form onSubmit={reactHookFormHandleSubmit(handleSubmit)} autoComplete="off">
        <Stack spacing={3}>
          <Typography variant="h5" component="h4" align="center" mt={1} mb={2} gutterBottom>
            {FORM_CREATE_LABEL}
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
            name="specialty_id"
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
                {(specialties?.data || []).map((option) => (
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
                disabled={!watch('specialty_id')}
                label="Môn học"
                size="small"
                fullWidth
                select
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                {...field}
              >
                {(subjects?.data || []).map((option) => (
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
                disabled={!watch('specialty_id')}
                label="Giảng viên"
                size="small"
                fullWidth
                select
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                {...field}
              >
                {(teachers?.data || []).map((option) => (
                  <MenuItem key={option.user_id} value={option.user_id}>
                    {option.full_name || option.user.full_name}
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
                    inputFormat="DD-MM-YYYY"
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
              Tạo mới
            </Button>
          </Box>
        </Stack>
      </form>
    </ModalCustom>
  )
}
