import { useMemo, useState } from 'react'

// MUI COMPONENTS
import {
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
  Paper,
  IconButton,
  TableSortLabel,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'

// MUI ICONS
import { Loop, EditOutlined, HighlightOffOutlined } from '@mui/icons-material'

// REACT-TABLE
import { useTable, useSortBy } from 'react-table'

import { COLUMNS } from './const'
import { CLASS_DATA } from 'src/fakeData/class'

// TYPES
import { ClassType } from 'src/types'

// MODALS
import ModalCreate from './components/ModalCreate'
import ModalUpdate from './components/ModalUpdate'

// REACT-QUERY
import useClassQuery from 'src/hooks/reactQueryHooks/useClassQuery'

export default function ClassPage() {
  // ==================STATES==================
  // pagination
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(10)

  // modals
  const [openModalCreate, setOpenModalCreate] = useState(false)
  const [openModalUpdate, setOpenModalUpdate] = useState(false)

  const [classId, setClassId] = useState('')

  // ============ DATA ============
  // react-query
  const {
    data: classesResponse,
    refetch: refetchClasses,
    isFetching: isFetchingClasses,
  } = useClassQuery.getAll({
    limit,
    page: page + 1,
  })

  const { data: classResponse, refetch: refetchClass } = useClassQuery.getOne(classId)

  // react-table
  const columns = useMemo(() => COLUMNS, [COLUMNS])
  const data: ClassType[] | [] = useMemo(() => classesResponse?.data || [], [classesResponse?.data])

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data }, useSortBy)

  // ============ HANDLE FUNCTIONS ============

  return (
    <Paper>
      {/* BUTTONS HEADER */}
      <Stack sx={{ m: 2 }} direction="row" spacing={2}>
        <Box>
          <Button onClick={() => setOpenModalCreate(true)} variant="outlined">
            Tạo lớp học
          </Button>
        </Box>

        <Box>
          <LoadingButton
            onClick={() => refetchClasses()}
            loading={isFetchingClasses}
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
                {headerGroup.headers.map((column) => {
                  return (
                    <TableCell {...column.getHeaderProps(column.getSortByToggleProps())}>
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

          <TableBody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row)

              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                  ))}

                  <TableCell align="left" sx={{ width: '140px' }}>
                    <Stack direction="row">
                      <IconButton
                        color="error"
                        // onClick={() => mutate(row.user_id)}
                      >
                        <HighlightOffOutlined />
                      </IconButton>

                      <IconButton
                        color="success"
                        onClick={() => {
                          setOpenModalUpdate(true)
                          setClassId(row.original.class_id)
                        }}
                      >
                        <EditOutlined />
                      </IconButton>

                      {/* <IconButton color="info">
                      <InfoOutlinedIcon />
                    </IconButton> */}
                    </Stack>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <TablePagination
    component="div"
    // count={classesResponse?.meta?.total || classes.length}
    // page={page}
    // rowsPerPage={limit}
    // onPageChange={(_e: unknown, page: number) => {
    //   // setPage(page)
    // }}
    // onRowsPerPageChange={(event: React.ChangeEvent<HTMLInputElement>) => {
    //   // setLimit(parseInt(event.target.value, 10))
    //   // setPage(0)}
  /> */}

      {/* MODALS */}
      <ModalCreate open={openModalCreate} handleClose={() => setOpenModalCreate(false)} />

      <ModalUpdate
        open={openModalUpdate}
        initData={classResponse?.data || null}
        handleClose={() => setOpenModalUpdate(false)}
      />
    </Paper>
  )
}
