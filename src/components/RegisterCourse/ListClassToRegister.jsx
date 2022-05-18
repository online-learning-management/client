import * as React from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import { AuthContext } from '../../contexts/authContext/AuthContext'
import useStudentQuery from '../../hooks/reactQueryHooks/useStudentQuery'
import useClassQuery from '../../hooks/reactQueryHooks/useClassQuery'

import NotificationModal from './NotificationModal'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'orange',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

let Register = (props) => {
  return (
    <div className="text-red-500 text-base rounded mb-2 cursor-pointer" onClick={props.handleOnclickRegisterClass}>
      <b className="my-1 ">{props.name}</b>
    </div>
  )
}

export default function ListClassToRegister(props) {
  const { user } = React.useContext(AuthContext)

  let [open, setOpen] = React.useState(false)
  let [resultRegister, setResultRegister] = React.useState(false)

  // react-query
  const { data: student } = useStudentQuery.getById(user?.user_id)
  const { data: classes } = useClassQuery.getAll()

  let handleOpenNotificationModal = () => {
    setOpen(true)
  }

  let handleCloseNotificationModal = () => {
    setOpen(false)
  }

  let { day } = props

  let handleArrayClassSatisfyToShow = (day, arrayClass) => {
    let res = arrayClass.filter((item, index) => {
      if (handleStringAndCheckDay(item.schedules, day)) {
        return item
      }
    })
    return res
  }

  let handleStringAndCheckDay = (json, day) => {
    let check = false
    let arr = JSON.parse(json)
    arr.map((item, index) => {
      if (item.day == day) {
        check = true
      }
    })
    return check
  }

  let arrayClassSatisfyToShow = handleArrayClassSatisfyToShow(day, fake_data_list_class)

  let handleShowScheduleInList = (data) => {
    let days = 'Thứ '
    let arr = JSON.parse(data)
    arr.map((item, index) => {
      days += item.day + 2 + ','
    })
    let lesson = arr[0].lessons
    return days + `Tiết(${lesson})`
  }

  let handleOnclickRegisterClass = (shedule) => {
    let check = handleAsSameAsSchedule(shedule, listScheduleOfStudent)
    if (check) {
      setResultRegister(true)
      handleOpenNotificationModal()
    } else {
      setResultRegister(false)
      handleOpenNotificationModal()
    }
  }

  let listScheduleOfStudent = fake_data_list_class_of_student.map((item, index) => {
    return JSON.parse(item.schedules)
  })
  console.log(listScheduleOfStudent)

  let handleAsSameAsSchedule = (currentSchedule, prevSchedule) => {
    let arrDayCurrentSchedule = []
    let arr = JSON.parse(currentSchedule)
    let arrLessonCurrentSchedule = arr[0].lessons
    arr.map((item, index) => {
      arrDayCurrentSchedule.push(item.day)
    })

    let check = false

    arrDayCurrentSchedule.forEach((item1) => {
      prevSchedule.forEach((item2) => {
        item2.forEach((item3) => {
          if (item1 === item3.day) {
            item3.lessons.forEach((item4) => {
              arrLessonCurrentSchedule.forEach((item5) => {
                if (item5 === item4) {
                  check = true
                }
              })
            })
          }
        })
      })
    })
    return check
  }

  // console.log(arrayClassSatisfyToShow)

  return (
    <TableContainer component={Paper}>
      <NotificationModal open={open} handleClose={handleCloseNotificationModal} resultRegister={resultRegister} />
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Tên học phần</StyledTableCell>
            <StyledTableCell align="right">Mã lớp</StyledTableCell>
            <StyledTableCell align="right">Giáo Viên</StyledTableCell>
            <StyledTableCell align="right">Thời gian</StyledTableCell>
            <StyledTableCell align="right">Số lượng</StyledTableCell>
            <StyledTableCell align="right">Chức năng</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {arrayClassSatisfyToShow.map((item, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {item.subject.subject_name}
              </StyledTableCell>
              <StyledTableCell align="right">{item.class_id}</StyledTableCell>
              <StyledTableCell align="right">{item.teacher.user.full_name}</StyledTableCell>
              <StyledTableCell align="right">{handleShowScheduleInList(item.schedules)}</StyledTableCell>
              <StyledTableCell align="right">{item.max_number_students}</StyledTableCell>
              <StyledTableCell align="right">
                <Register
                  name={'Đăng ký'}
                  handleOnclickRegisterClass={() => handleOnclickRegisterClass(item.schedules)}
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

// let schedule = [
//   { day: 1, lessons: [6, 7, 8, 9] },
//   { day: 1, lessons: [6, 7, 8, 9] },
// ]

let fake_data_list_class = [
  {
    class_id: 'PHP007',
    start_date: 'Fri May 20 2022 10:43:50 GMT+0700',
    max_number_students: 70,
    current_number_students: 0,
    user_id: 3,
    schedules: '[{"day":1,"lessons":[6,7,8,9]},{"day":4,"lessons":[6,7,8,9]}]',
    subject_id: 2,
    teacher: {
      user_id: 3,
      specialty_id: 2,
      user: {
        user_id: 3,
        full_name: 'Hoang Tuan Hieu',
        email: 'tranducha2@gmail.com',
        date_of_birth: '1996-01-01',
        gender: 'fe-male',
        address: 'Bac Ninh',
        avatar: '',
        username: 'hoangtuanhieu',
        role_id: 'r2',
      },
    },
    subject: {
      id: 1,
      subject_name: 'Tiếng anh công nghệ thông tin',
      image: 'https://files.fullstack.edu.vn/f8-prod/banners/Banner_web_ReactJS.png',
      description:
        'Với kiến thức ong đốt đặc trưng đã làm nên thương hiệu của thầy Nguyễn Trung Phú. Sau khi học xong thì không ngán bất cứ một ai, cứ đến là đón',
      specialty_id: 1,
      credit_id: 1,
      background_color: 'linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)',
    },
  },
  {
    class_id: 'PHP008',
    start_date: 'Fri May 20 2022 10:47:44 GMT+0700',
    max_number_students: 70,
    current_number_students: 0,
    user_id: 3,
    schedules: '[{"day":4,"lessons":[6,7,8,9]}]',
    subject_id: 2,
    teacher: {
      user_id: 3,
      specialty_id: 2,
      user: {
        user_id: 3,
        full_name: 'Hoang Tuan Hieu',
        email: 'tranducha2@gmail.com',
        date_of_birth: '1996-01-01',
        gender: 'fe-male',
        address: 'Bac Ninh',
        avatar: '',
        username: 'hoangtuanhieu',
        role_id: 'r2',
      },
    },
    subject: {
      id: 3,
      subject_name: 'Tiếng anh công nghệ thông tin 2',
      image: 'https://files.fullstack.edu.vn/f8-prod/banners/Banner_03_youtube.png',
      description:
        'Với kiến thức ong đốt đặc trưng đã làm nên thương hiệu của thầy Nguyễn Trung Phú. Sau khi học xong thì không ngán bất cứ một ai, cứ đến là đón',
      specialty_id: 1,
      credit_id: 2,
      background_color: 'linear-gradient(to right, #fc4a1a, #f7b733)',
    },
  },
  {
    class_id: 'PHP007',
    start_date: 'Fri May 20 2022 10:43:50 GMT+0700',
    max_number_students: 70,
    current_number_students: 0,
    user_id: 3,
    schedules: '[{"day":1,"lessons":[6,7,8,9]}]',
    subject_id: 2,
    teacher: {
      user_id: 3,
      specialty_id: 2,
      user: {
        user_id: 3,
        full_name: 'Hoang Tuan Hieu',
        email: 'tranducha2@gmail.com',
        date_of_birth: '1996-01-01',
        gender: 'fe-male',
        address: 'Bac Ninh',
        avatar: '',
        username: 'hoangtuanhieu',
        role_id: 'r2',
      },
    },
    subject: {
      id: 1,
      subject_name: 'Tiếng anh công nghệ thông tin',
      image: 'https://files.fullstack.edu.vn/f8-prod/banners/Banner_web_ReactJS.png',
      description:
        'Với kiến thức ong đốt đặc trưng đã làm nên thương hiệu của thầy Nguyễn Trung Phú. Sau khi học xong thì không ngán bất cứ một ai, cứ đến là đón',
      specialty_id: 1,
      credit_id: 1,
      background_color: 'linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)',
    },
  },
  {
    class_id: 'PHP009',
    start_date: 'Fri May 20 2022 10:47:44 GMT+0700',
    max_number_students: 70,
    current_number_students: 0,
    user_id: 3,
    schedules: '[{"day":4,"lessons":[6,7,8,9]}]',
    subject_id: 2,
    teacher: {
      user_id: 3,
      specialty_id: 2,
      user: {
        user_id: 3,
        full_name: 'Hoang Tuan Hieu',
        email: 'tranducha2@gmail.com',
        date_of_birth: '1996-01-01',
        gender: 'fe-male',
        address: 'Bac Ninh',
        avatar: '',
        username: 'hoangtuanhieu',
        role_id: 'r2',
      },
    },
    subject: {
      id: 3,
      subject_name: 'Tiếng anh công nghệ thông tin 2',
      image: 'https://files.fullstack.edu.vn/f8-prod/banners/Banner_03_youtube.png',
      description:
        'Với kiến thức ong đốt đặc trưng đã làm nên thương hiệu của thầy Nguyễn Trung Phú. Sau khi học xong thì không ngán bất cứ một ai, cứ đến là đón',
      specialty_id: 1,
      credit_id: 2,
      background_color: 'linear-gradient(to right, #fc4a1a, #f7b733)',
    },
  },
]

let fake_data_list_class_of_student = [
  {
    class_id: 'PHP007',
    start_date: 'Fri May 20 2022 10:43:50 GMT+0700',
    max_number_students: 70,
    current_number_students: 0,
    user_id: 3,
    schedules: '[{"day":0,"lessons":[6,7,8,9]},{"day":3,"lessons":[6,7,8,9]}]',
    subject_id: 2,
    teacher: {
      user_id: 3,
      specialty_id: 2,
      user: {
        user_id: 3,
        full_name: 'Hoang Tuan Hieu',
        email: 'tranducha2@gmail.com',
        date_of_birth: '1996-01-01',
        gender: 'fe-male',
        address: 'Bac Ninh',
        avatar: '',
        username: 'hoangtuanhieu',
        role_id: 'r2',
      },
    },
    subject: {
      id: 1,
      subject_name: 'Tiếng anh công nghệ thông tin',
      image: 'https://files.fullstack.edu.vn/f8-prod/banners/Banner_web_ReactJS.png',
      description:
        'Với kiến thức ong đốt đặc trưng đã làm nên thương hiệu của thầy Nguyễn Trung Phú. Sau khi học xong thì không ngán bất cứ một ai, cứ đến là đón',
      specialty_id: 1,
      credit_id: 1,
      background_color: 'linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)',
    },
  },
  {
    class_id: 'PHP007',
    start_date: 'Fri May 20 2022 10:43:50 GMT+0700',
    max_number_students: 70,
    current_number_students: 0,
    user_id: 3,
    schedules: '[{"day":2,"lessons":[6,7,8,9]},{"day":5,"lessons":[6,7,8,9]}]',
    subject_id: 2,
    teacher: {
      user_id: 3,
      specialty_id: 2,
      user: {
        user_id: 3,
        full_name: 'Hoang Tuan Hieu',
        email: 'tranducha2@gmail.com',
        date_of_birth: '1996-01-01',
        gender: 'fe-male',
        address: 'Bac Ninh',
        avatar: '',
        username: 'hoangtuanhieu',
        role_id: 'r2',
      },
    },
    subject: {
      id: 1,
      subject_name: 'Tiếng anh công nghệ thông tin',
      image: 'https://files.fullstack.edu.vn/f8-prod/banners/Banner_web_ReactJS.png',
      description:
        'Với kiến thức ong đốt đặc trưng đã làm nên thương hiệu của thầy Nguyễn Trung Phú. Sau khi học xong thì không ngán bất cứ một ai, cứ đến là đón',
      specialty_id: 1,
      credit_id: 1,
      background_color: 'linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)',
    },
  },
]
