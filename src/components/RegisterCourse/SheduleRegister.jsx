import React, { useState } from 'react'

import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import RegisterModal from './RegisterModal'
import { AuthContext } from '../../contexts/authContext/AuthContext'
import useStudentQuery from '../../hooks/reactQueryHooks/useStudentQuery'
import studentClassApi from '../../apis/studentClassApi'

import moment from 'moment'

import Subject from './Subject'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
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

export default function ScheduleRegister(Props) {
  const { user } = React.useContext(AuthContext)
  let [refresh, setRefresh] = useState(false)

  //react query
  const { data: student, refetch } = useStudentQuery.getById(user?.user_id)
  let arrStudentClass = student?.data?.student?.student_class

  let Select = (props) => {
    return (
      <div
        className="text-red-500 text-base rounded mb-2 cursor-pointer"
        onClick={() => handleOnclickSelect(props?.day, props?.session)}
      >
        <b className="my-1">{props?.name}</b>
      </div>
    )
  }

  let handleOnclickSelect = (day, session) => {
    setDay(day)
    setSession(session)
    handleOpen()
  }

  let handleOnclickCancelCourse = async (item) => {
    let data = {
      class_id: item,
      user_id: user?.user_id,
    }
    try {
      let res = await studentClassApi.delete(data)
      if (res) {
      }

      //
      refetch()
    } catch (error) {
      console.log(error)
    }
  }

  let [day, setDay] = useState('')
  let [session, setSession] = useState('')

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <div>
      <RegisterModal open={open} handleOpen={handleOpen} handleClose={handleClose} day={day} session={session} />
      <p className="my-2 text-center font-Inter text-2xl font-normal">
        {moment().format('DD ')}
        <span className="font-black text-[28px]">{moment().format('[Th??ng] M')}</span> {moment().format('YYYY')}
      </p>
      <br></br>
      <table
        style={{ borderSpacing: 0 }}
        className="border-black w-full text-center table-fixed text-xl font-Inter rounded-lg shadow-fakeBorderTable"
      >
        <thead>
          <tr className="child:border child:border-solid child:font-medium">
            <th className="w-[10%] rounded-tl-lg">Bu???i</th>
            <th>Th??? 2</th>
            <th>Th??? 3</th>
            <th>Th??? 4</th>
            <th>Th??? 5</th>
            <th>Th??? 6</th>
            <th>Th??? 7</th>
            <th className="rounded-tr-lg">CN</th>
          </tr>
        </thead>
        <tbody>
          <tr className="child:border child:border-solid h-36 child:font-medium">
            <td>S??ng</td>
            <td>
              <Select name={'[Ch???n]'} day={0} session={'morning'} />
              <Subject day={0} session={'morning'} />
            </td>
            <td>
              <Select name={'[Ch???n]'} day={1} session={'morning'} />
              <Subject day={1} session={'morning'} />
            </td>
            <td>
              <Select name={'[Ch???n]'} day={2} session={'morning'} />
              <Subject day={2} session={'morning'} />
            </td>
            <td>
              <Select name={'[Ch???n]'} day={3} session={'morning'} />
              <Subject day={3} session={'morning'} />
            </td>
            <td>
              <Select name={'[Ch???n]'} day={4} session={'morning'} />
              <Subject day={4} session={'morning'} />
            </td>
            <td>
              <Select name={'[Ch???n]'} day={5} session={'morning'} />
              <Subject day={5} session={'morning'} />
            </td>
            <td>
              <Select name={'[Ch???n]'} day={6} session={'morning'} />
              <Subject day={6} session={'morning'} />
            </td>
          </tr>
          <tr className="child:border child:border-solid h-36 child:font-medium">
            <td>Chi???u</td>
            <td>
              <Select name={'[Ch???n]'} day={0} session={'afternoon'} />
              <Subject day={0} session={'afternoon'} />
            </td>
            <td>
              <Select name={'[Ch???n]'} day={1} session={'afternoon'} />
              <Subject day={1} session={'afternoon'} />
            </td>
            <td>
              <Select name={'[Ch???n]'} day={2} session={'afternoon'} />
              <Subject day={2} session={'afternoon'} />
            </td>
            <td>
              <Select name={'[Ch???n]'} day={3} session={'afternoon'} />
              <Subject day={3} session={'afternoon'} />
            </td>
            <td>
              <Select name={'[Ch???n]'} day={4} session={'afternoon'} />
              <Subject day={4} session={'afternoon'} />
            </td>
            <td>
              <Select name={'[Ch???n]'} day={5} session={'afternoon'} />
              <Subject day={5} session={'afternoon'} />
            </td>
            <td>
              <Select name={'[Ch???n]'} day={6} session={'afternoon'} />
              <Subject day={6} session={'afternoon'} />
            </td>
          </tr>
          <tr className="child:border child:border-solid h-36 child:font-medium ">
            <td className="rounded-bl-lg">T???i</td>
            <td>
              <Select name={'[Ch???n]'} day={0} session={'evening'} />
              <Subject day={0} session={'evening'} />
            </td>
            <td>
              <Select name={'[Ch???n]'} day={1} session={'evening'} />
              <Subject day={1} session={'evening'} />
            </td>
            <td>
              <Select name={'[Ch???n]'} day={2} session={'evening'} />
              <Subject day={2} session={'evening'} />
            </td>
            <td>
              <Select name={'[Ch???n]'} day={3} session={'evening'} />
              {/* <Subject name={'????? h???a m??y t??nh'} time={'6:00 - 7:00'} /> */}
              <Subject day={3} session={'evening'} />
            </td>
            <td>
              <Select name={'[Ch???n]'} day={4} session={'evening'} />
              <Subject day={4} session={'evening'} />
            </td>
            <td>
              <Select name={'[Ch???n]'} day={5} session={'evening'} />
              <Subject day={5} session={'evening'} />
            </td>
            <td className="rounded-br-lg">
              <Select name={'[Ch???n]'} day={6} session={'evening'} />
              <Subject day={6} session={'evening'} />
            </td>
          </tr>
        </tbody>
      </table>

      <br />
      <br />

      <h3 className="flex justify-center">Danh s??ch h???c ph???n ???? ????ng k??</h3>
      <div className="refresh" style={{ display: 'none' }}>
        {refresh}
      </div>
      <br />
      <br />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>T??n h???c ph???n</StyledTableCell>
              <StyledTableCell align="right">M?? h???c ph???n</StyledTableCell>
              <StyledTableCell align="right">Ch???c n??ng</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {arrStudentClass &&
              arrStudentClass.length > 0 &&
              arrStudentClass.map((item, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {item?.class?.subject?.subject_name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{item?.class?.class_id}</StyledTableCell>
                  <StyledTableCell align="right">
                    <button
                      className="cursor-pointer px-3 py-1 text-red-600 border-none rounded"
                      onClick={() => handleOnclickCancelCourse(item?.class?.class_id)}
                    >
                      H???y h???c ph???n
                    </button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

let fake_data_list_class_of_student = [
  {
    class_id: 'PHP007',
    start_date: 'Fri May 20 2022 10:43:50 GMT+0700',
    max_number_students: 70,
    current_number_students: 0,
    user_id: 3,
    schedules: '[{"day":0,"lessons":[7,8]},{"day":3,"lessons":[7,8]}]',
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
      subject_name: 'Ti???ng anh c??ng ngh??? th??ng tin',
      image: 'https://files.fullstack.edu.vn/f8-prod/banners/Banner_web_ReactJS.png',
      description:
        'V???i ki???n th???c ong ?????t ?????c tr??ng ???? l??m n??n th????ng hi???u c???a th???y Nguy???n Trung Ph??. Sau khi h???c xong th?? kh??ng ng??n b???t c??? m???t ai, c??? ?????n l?? ????n',
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
    schedules: '[{"day":0,"lessons":[1,2,3]}]',
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
      subject_name: 'L???p tr??nh web b???ng PHP',
      image: 'https://files.fullstack.edu.vn/f8-prod/banners/Banner_web_ReactJS.png',
      description:
        'V???i ki???n th???c ong ?????t ?????c tr??ng ???? l??m n??n th????ng hi???u c???a th???y Nguy???n Trung Ph??. Sau khi h???c xong th?? kh??ng ng??n b???t c??? m???t ai, c??? ?????n l?? ????n',
      specialty_id: 1,
      credit_id: 1,
      background_color: 'linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)',
    },
  },
]
