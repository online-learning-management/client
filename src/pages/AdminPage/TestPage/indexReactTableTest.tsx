import { useMemo, useState } from 'react'

// MUI COMPONENTS
import {
  Avatar,
  Button,
  Stack,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Paper,
  IconButton,
  TableSortLabel,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'

// MUI ICONS
import { Loop, EditOutlined, HighlightOffOutlined } from '@mui/icons-material'

// TYPES
import { ModalCreateType } from './types'
import { UserType } from 'src/types'

// MODALS
import FormCreate from './FormCreate'

// REACT-QUERY
import useTeacherQuery from 'src/hooks/reactQueryHooks/useTeacherQuery'
import useTeacherMutation from 'src/hooks/reactQueryHooks/useTeacherMutation'

// REACT-TABLE
import { useTable, useSortBy } from 'react-table'

// CONSTANTS
import { COLUMNS } from './const'

export default function TeacherPage() {
  // ============ STATES ============
  // pagination
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(10)

  // modals
  const [modalCreate, setModalCreate] = useState<ModalCreateType>({ open: false, type: 'CREATE' })

  // ============ DATA ============
  const { mutate } = useTeacherMutation.delete()
  const {
    isFetching: isFetchingTeachers,
    data: teachersData,
    refetch: refetchTeachers,
  } = useTeacherQuery.getAll({ page: page + 1, limit })

  const teachers: UserType[] | [] = teachersData?.data || []

  // react-table
  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => teachersData?.data || [], [teachersData])

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data }, useSortBy)

  // ============ HANDLE FUNCTIONS ============
  const handleUpdate = (username: string) => {
    const updateData = teachers.find((row) => row.username === username)
    setModalCreate({ open: true, type: 'UPDATE', data: updateData })
  }

  // handle pagination
  const handleChangePage = (_e: unknown, page: number) => {
    setPage(page)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <>
      <Paper sx={{ width: '100%', mb: 2 }}>
        {/* BUTTONS HEADER */}
        <Stack sx={{ m: 2 }} direction="row" spacing={2}>
          <Box>
            <Button onClick={() => setModalCreate({ open: true, type: 'CREATE' })} variant="outlined">
              Tạo tài khoản giáo viên
            </Button>
          </Box>

          <Box>
            <LoadingButton
              onClick={() => refetchTeachers()}
              loading={isFetchingTeachers}
              loadingPosition="start"
              startIcon={<Loop />}
              variant="outlined"
            >
              Tải lại
            </LoadingButton>
          </Box>
        </Stack>

        <TableContainer sx={{ maxHeight: 'calc(100vh - 360px)' }}>
          <Table {...getTableProps()} stickyHeader sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="small">
            <TableHead>
              {headerGroups.map((headerGroup) => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <TableCell {...column.getHeaderProps(column.getSortByToggleProps())}>
                      <TableSortLabel
                        active={column.isSorted && column.isSortedDesc}
                        direction={column.isSorted && column.isSortedDesc ? 'desc' : 'asc'}
                      >
                        {column.render('Header')}
                      </TableSortLabel>

                      {/* {column.render('Header')}
                      <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span> */}
                    </TableCell>
                  ))}

                  <TableCell>"asd"</TableCell>
                </TableRow>
              ))}
            </TableHead>

            <TableBody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row)

                return (
                  <TableRow {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                    ))}

                    <TableCell>"23"</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={teachersData?.meta?.total || teachers.length}
          page={page}
          rowsPerPage={limit}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* MODALS */}
      <FormCreate modal={modalCreate} onClose={() => setModalCreate((prevState) => ({ ...prevState, open: false }))} />
    </>
  )
}
