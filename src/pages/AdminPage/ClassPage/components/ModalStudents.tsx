// MUI ICONS
import { CalendarMonthOutlined, EditOutlined, HighlightOffOutlined } from '@mui/icons-material'

// MUI COMPONENTS
import {
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from '@mui/material'
import { useMemo, useState } from 'react'
import { useTable } from 'react-table'
import ModalCustom from 'src/components/ModalCustom'
import Schedule from 'src/components/Schedule'
import useStudentClassQuery from 'src/hooks/reactQueryHooks/useStudentClassQuery'
import { UserType } from 'src/types'
import { COLUMNS_STUDENT_CLASS } from '../const'

export default function ModalStudents({ classId }: { classId: string }) {
  console.log(classId)

  // pagination
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(25)

  const [openModalSchedule, setOpenModalSchedule] = useState(false)
  const [studentId, setStudentId] = useState('')

  // react-query
  const {
    data: queriesData,
    isFetching,
    refetch,
  } = useStudentClassQuery.getAll({ class_id: classId, limit, page: page + 1 })

  // react-table
  const columns: any = useMemo(() => COLUMNS_STUDENT_CLASS, [COLUMNS_STUDENT_CLASS])
  const data: UserType[] = useMemo(() => queriesData?.data || [], [queriesData?.data])

  const { getTableProps, headerGroups, rows, prepareRow } = useTable({ columns, data })

  return (
    <>
      <TableContainer sx={{ maxHeight: 'calc(100vh - 360px)' }}>
        <Table {...getTableProps()} stickyHeader sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="small">
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any) => {
                  return (
                    <TableCell>
                      <TableSortLabel active={column.isSorted} direction={column.isSortedDesc ? 'desc' : 'asc'}>
                        {column.render('Header')}
                      </TableSortLabel>
                    </TableCell>
                  )
                })}

                <TableCell>Hành động</TableCell>
              </TableRow>
            ))}
          </TableHead>

          <TableBody>
            {rows.map((row) => {
              prepareRow(row)

              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                  ))}

                  <TableCell align="left" sx={{ width: '160px' }}>
                    <Stack direction="row">
                      {/* <IconButton
                        color="error"
                        onClick={() => {
                          setShowDialog(true)
                          setDeleteId(row.original.user_id)
                        }}
                      >
                        <HighlightOffOutlined />
                      </IconButton>

                      <IconButton
                        color="success"
                        onClick={() => {
                          setOpenModalUpdate(true)
                          setDetailId(row.original.user_id)
                        }}
                      >
                        <EditOutlined />
                      </IconButton> */}

                      <IconButton
                        color="primary"
                        onClick={() => {
                          setOpenModalSchedule(true)
                          setStudentId(String(row.original.user_id))
                        }}
                      >
                        <CalendarMonthOutlined />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <ModalCustom width={1200} open={openModalSchedule} onClose={() => setOpenModalSchedule(false)}>
        <Schedule student_id={studentId} />
      </ModalCustom>
    </>
  )
}
