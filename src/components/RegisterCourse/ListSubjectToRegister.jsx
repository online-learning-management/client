import * as React from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

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

function createData(className, classId, teacherName, time, numberStudent) {
  return { className, classId, teacherName, time, numberStudent }
}

const rows = [
  createData('Tiếng anh công nghệ thông tin', 'TACNTT06', 'Cô Lan', 'T2,T5 (9,10)', 35),
  createData('Lập trình web bằng PHP', 'PHP', 'Nguyễn Trung Phú', 'T3 (12,13,14,15)', 4.3),
  createData('Tiếng anh công nghệ thông tin', 'TACNTT06', 'Cô Lan', 'T2,T5 (9,10)', 35),
  createData('Lập trình web bằng PHP', 'PHP', 'Nguyễn Trung Phú', 'T3 (12,13,14,15)', 4.3),
  createData('Tiếng anh công nghệ thông tin', 'TACNTT06', 'Cô Lan', 'T2,T5 (9,10)', 35),
  createData('Lập trình web bằng PHP', 'PHP', 'Nguyễn Trung Phú', 'T3 (12,13,14,15)', 4.3),
  createData('Tiếng anh công nghệ thông tin', 'TACNTT06', 'Cô Lan', 'T2,T5 (9,10)', 35),
  createData('Lập trình web bằng PHP', 'PHP', 'Nguyễn Trung Phú', 'T3 (12,13,14,15)', 4.3),
  createData('Tiếng anh công nghệ thông tin', 'TACNTT06', 'Cô Lan', 'T2,T5 (9,10)', 35),
  createData('Lập trình web bằng PHP', 'PHP', 'Nguyễn Trung Phú', 'T3 (12,13,14,15)', 4.3),
]

let Register = (props) => {
  return (
    <div className="text-red-500 text-base rounded mb-2 cursor-pointer" onClick={props.handleOnclickRegisterSubject}>
      <b className="my-1 ">{props.name}</b>
    </div>
  )
}

export default function ListSubjectToRegister() {
  let [open, setOpen] = React.useState(false)

  let handleOnclickRegisterSubject = () => {
    handleOpenNotificationModal()
  }

  let handleOpenNotificationModal = () => {
    setOpen(true)
  }

  let handleCloseNotificationModal = () => {
    setOpen(false)
  }
  return (
    <TableContainer component={Paper}>
      <NotificationModal open={open} handleClose={handleCloseNotificationModal} />
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
          {rows.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {row.className}
              </StyledTableCell>
              <StyledTableCell align="right">{row.classId}</StyledTableCell>
              <StyledTableCell align="right">{row.teacherName}</StyledTableCell>
              <StyledTableCell align="right">{row.time}</StyledTableCell>
              <StyledTableCell align="right">{row.numberStudent}</StyledTableCell>
              <StyledTableCell align="right">
                <Register name={'Đăng ký'} handleOnclickRegisterSubject={handleOnclickRegisterSubject} />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
