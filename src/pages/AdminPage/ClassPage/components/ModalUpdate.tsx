import { useEffect, useMemo, useState } from 'react'

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

import ModalCustom from 'src/components/ModalCustom'
import RegisterSchedule from './RegisterSchedule'

import { SPECIALTY_DATA } from 'src/fakeData/specialty'
import { SUBJECT_DATA } from 'src/fakeData/subject'

// TYPES
import { ClassType, SpecialtyType, SubjectType, UserType } from 'src/types'

// react-query-hooks
import useSpecialtyQuery from 'src/hooks/reactQueryHooks/useSpecialtyQuery'
import useSubjectQuery from 'src/hooks/reactQueryHooks/useSubjectQuery'
import useTeacherQuery from 'src/hooks/reactQueryHooks/useTeacherQuery'

// ======================================================
type FormInputs = {
  class_id: string
  start_date?: string
  max_number_students: number

  user_id: number
  subject_id: number
  specialty_id: number
}

const schema: SchemaOf<FormInputs> = object().shape({
  class_id: string().required('Nhập mã lớp học!'),
  start_date: string(),
  max_number_students: number().required('Nhập sĩ số!'),

  user_id: number().required('Chọn tên giảng viên!'),
  subject_id: number().required('Chọn môn học!'),
  specialty_id: number().required('Chọn chuyên khoa!'),
})

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

type ModalCreateProps = {
  open: boolean
  initData: ClassType | null

  handleClose: () => void
}

export default function ModalUpdate({ open, initData, handleClose }: ModalCreateProps) {
  // =================== STATES ===================
  const [schedules, setSchedules] = useState<number[][]>(TWO_D_ARRAY)

  const [specialtySelect, setSpecialtySelect] = useState<number | null>(null)
  const [teacherSelect, setTeacherSelect] = useState<number | null>(null)

  // =================== DATA ===================
  // react-hook-form
  const {
    control,
    watch,
    register,
    setValue,
    reset,
    formState: { errors },
    handleSubmit: reactHookFormHandleSubmit,
  } = useForm<FormInputs>({ resolver: yupResolver(schema) })

  // react-query
  const { data: specialtiesResponse } = useSpecialtyQuery.getAll()
  const { data: subjectsResponse } = useSubjectQuery.getAll({ specialty_id: specialtySelect })
  const { data: teachersResponse } = useTeacherQuery.getAll({ specialty_id: specialtySelect })
  const { data: teacherResponse } = useTeacherQuery.getById(teacherSelect)

  // =================== EFFECT ===================
  useEffect(() => {
    setValue('class_id', 'init')
    setValue('start_date', '')
    setValue('max_number_students', 69)
    setValue('user_id', null)
    setValue('subject_id', 1)
    setValue('specialty_id', 0)

    if (initData) {
      reset(initData)
      setSpecialtySelect(initData?.specialty_id || null)
    }
  }, [initData])

  // handle when select change
  useEffect(() => {
    setSpecialtySelect(watch('specialty_id'))
  }, [watch('specialty_id')])

  useEffect(() => {
    setTeacherSelect(watch('user_id'))
  }, [watch('user_id')])

  // change data to show old schedule
  // useEffect(() => {
  //   if (initData) {
  //     initData?.schedules?.forEach((item) => {
  //       const schedule = JSON.parse(item.schedule)

  //       schedule?.lessons?.forEach((lesson) =>
  //         setSchedules((prevState) => {
  //           const newState = [...prevState]
  //           newState[+lesson][+schedule.day] = 1
  //           return newState
  //         })
  //       )
  //     })
  //   }

  //   return () => setSchedules(new Array(16).fill(0).map(() => new Array(7).fill(0)))
  // }, [initData])

  useEffect(() => {
    const teacher = teacherResponse?.data

    if (teacher && teacher?.classes.length > 0) {
      teacher.classes.forEach((classItem) => {
        const schedules = classItem?.schedules.length > 0 ? classItem?.schedules : []

        schedules.forEach((item) => {
          const schedule = JSON.parse(item.schedule)

          schedule?.lessons?.forEach((lesson) =>
            setSchedules((prevState) => {
              const newState = [...prevState]

              if (classItem.class_id === initData?.class_id) {
                newState[+lesson][+schedule.day] = 1
              } else {
                newState[+lesson][+schedule.day] = 2
              }

              return newState
            })
          )
        })
      })
    }

    return () => setSchedules(new Array(16).fill(0).map(() => new Array(7).fill(0)))
  }, [teacherResponse?.data, initData?.class_id])

  // =================== FUNCTIONS HANDLE ===================
  const handleSubmit: SubmitHandler<FormInputs> = (data: FormInputs) => {
    console.log({ ...data, schedules: convert2DArrayToArrayObject(schedules) })
  }

  const handleCheckSchedule = (isChecked: boolean, lesson: number, day: number) => {
    setSchedules((prevState) => {
      const newSchedules = [...prevState]
      newSchedules[lesson][day] = isChecked ? 1 : 0

      return newSchedules
    })
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
                // disabled={!watch('specialty_id')}
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
                // disabled={!watch('specialty_id')}
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
