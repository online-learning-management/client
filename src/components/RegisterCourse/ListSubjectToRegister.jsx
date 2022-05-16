import * as React from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

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
  createData('Tiếng anh công nghệ thông tin', 159, 6.0, 24, 4.0),
  createData('Lập trình web bằng PHP', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
]

let Register = (props) => {
  return (
    <div className="text-white text-base rounded mb-2 cursor-pointer" onClick={handleOnclickRegisterSubject}>
      <b className="my-1 ">{props.name}</b>
    </div>
  )
}

let handleOnclickRegisterSubject = () => {
  alert('hehe')
}

export default function ListSubjectToRegister() {
  return (
    <TableContainer component={Paper}>
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
                <Register name={'Đăng ký'} />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
