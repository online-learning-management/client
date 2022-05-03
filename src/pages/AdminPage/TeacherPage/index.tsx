import { useState } from 'react'

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
import useTeacherMutate from 'src/hooks/reactQueryHooks/useTeacherMutate'

export default function TeacherPage() {
  // ============ STATES ============
  // pagination
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(10)

  // modals
  const [modalCreate, setModalCreate] = useState<ModalCreateType>({ open: false, type: 'CREATE' })

  // ============ DATA ============
  const { mutate } = useTeacherMutate.delete()
  const {
    isFetching: isFetchingTeachers,
    data: teachersResponse,
    refetch: refetchTeachers,
  } = useTeacherQuery.getAll({ page: page + 1, limit })

  // ============ HANDLE FUNCTIONS ============
  const handleUpdate = (username: string) => {
    const updateData = (teachersResponse?.data || []).find((row) => row.username === username)
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
          <Table stickyHeader sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="small">
            <TableHead>
              <TableRow>
                <TableCell>Họ tên / email</TableCell>
                <TableCell>Tên tài khoản</TableCell>
                <TableCell>Chuyên khoa</TableCell>
                <TableCell>Địa chỉ</TableCell>
                <TableCell>Hành động</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {(teachersResponse?.data || []).map((row) => (
                <TableRow role="checkbox" tabIndex={-1} key={row.user_id}>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar alt="Remy Sharp" src={row.avatar} />

                      <Box flexGrow={1}>
                        <Typography sx={{ fontWeight: 500 }}>{row.full_name}</Typography>
                        <Typography sx={{ color: '#999', fontSize: '14px' }}>{row.email}</Typography>
                      </Box>
                    </Stack>
                  </TableCell>

                  <TableCell align="left">{row.username}</TableCell>

                  <TableCell align="left">{row.specialty}</TableCell>

                  <TableCell align="left">{row.address}</TableCell>

                  <TableCell align="left" sx={{ width: '140px' }}>
                    <Stack direction="row">
                      <IconButton color="error" onClick={() => mutate(row.user_id)}>
                        <HighlightOffOutlined />
                      </IconButton>

                      <IconButton color="success" onClick={() => handleUpdate(row.username)}>
                        <EditOutlined />
                      </IconButton>

                      {/* <IconButton color="info">
                          <InfoOutlinedIcon />
                        </IconButton> */}
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={teachersResponse?.meta?.total || (teachersResponse?.data || []).length}
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
