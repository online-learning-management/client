import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import ListLesson from './ListLesson'

import { AddBoxOutlined } from '@mui/icons-material'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Grid } from '@mui/material'
import { flexbox, width } from '@mui/system'
import Stack from '@mui/material/Stack'

import CardMedia from '@mui/material/CardMedia'
import { CardActionArea } from '@mui/material'

import { AuthContext } from '../../../contexts/authContext/AuthContext'

// MODALS
import ModalCreate from './ModalCreate'

// REACT-QUERY-HOOKS
import useClassQuery from '../../../hooks/reactQueryHooks/useClassQuery'

export default function DetailClass() {
  let { id } = useParams()
  const { user } = useContext(AuthContext)

  // ======================STATE=======================
  // modals
  const [openModalCreate, setOpenModalCreate] = useState(false)

  // ============ DATA ============
  // react-query
  const { data: classDetail } = useClassQuery.getById(id)

  // console.log('detailClass: ', classDetail?.data)
  // console.log('subject: ', classDetail?.data?.teacher?.user?.full_name)

  return (
    <>
      <h1>{classDetail?.data?.subject?.subject_name}</h1>
      <br></br>
      <p>{classDetail?.data.description}</p>
      <br></br>
      <h3>Nội dung chương trình học:</h3>
      <br></br>

      <div className="detailClass flex w-full">
        <div className="flex-1">
          <ListLesson data={classDetail?.data?.documents} />

          {user && user?.role_id !== 'r3' && (
            <Button
              onClick={() => setOpenModalCreate(true)}
              sx={{ mt: 2 }}
              variant="outlined"
              endIcon={<AddBoxOutlined />}
            >
              Thêm bài học
            </Button>
          )}
        </div>

        <div className="descriptionLesson flex-1 flex flex-col items-center">
          <br></br>
          <Card sx={{ width: 600, background: `${classDetail?.data.bg_color}`, borderRadius: '10px' }}>
            <CardActionArea>
              <CardMedia component="img" height="360" image={`${classDetail?.data.image}`} alt="green iguana" />
              <CardContent className="ml-4">
                <Typography gutterBottom variant="h5" component="div" className="text-white">
                  {classDetail?.data?.subject?.subject_name}
                </Typography>
                <Typography variant="body1" color="white">
                  {`Giáo viên: ${classDetail?.data?.teacher?.user?.full_name}`}
                </Typography>
                <Typography variant="body1" color="white">
                  Thời lương: 3 tháng
                </Typography>
                <Typography variant="body1" color="white">
                  {`Ngày bắt đầu: ${classDetail?.data?.start_date}`}
                </Typography>
                <Typography variant="body1" color="white">
                  Kết thúc: 30/06/2022
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      </div>

      {/* CREATE MODAL */}
      <ModalCreate open={openModalCreate} handleClose={() => setOpenModalCreate(false)} classId={id} />
    </>
  )
}
