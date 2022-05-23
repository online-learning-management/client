import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ListLesson from './ListLesson'

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

import classApi from '../../.././apis/classApi'
import teacherApi from '../../.././apis/teacherApi'

export default function DetailClass() {
  let { id } = useParams()

  let [detailClass, setDetailClass] = useState({})
  let [teacherData, setTeacherData] = useState({})

  useEffect(async () => {
    try {
      let data = await classApi.getById(id)
      if (data && data.statusText === 'OK' && data.data) {
        setDetailClass(data.data.data)
      }
    } catch (e) {
      console.log(e)
    }
  }, [])

  // console.log('userId: ', detailClass?.user_id)

  // let getTeacherData = async () => {
  //   try {
  //     let data = await teacherApi.getById(detailClass?.user_id)
  //     if (data && data.statusText === 'OK') {
  //       setTeacherData(data?.data?.data)
  //     }
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  // console.log('check data detailClass: ', detailClass?.start_date)

  // console.log('check teacher data: ', teacherData)

  // console.log('time: ', moment().zone('2013-03-07T07:00:00-08:00'))

  return (
    <>
      <h1>{`Lớp học ${id}`}</h1>
      <br></br>
      <p>{detailClass?.description}</p>
      <br></br>
      <h3>Nội dung chương trình học:</h3>
      <br></br>

      <div className="detailClass flex w-full">
        <ListLesson classId={id} />
        <div className="descriptionLesson w-6/12 flex flex-col items-center">
          <br></br>
          <Card sx={{ width: 600, background: `${detailClass.bg_color}`, borderRadius: '10px' }}>
            <CardActionArea>
              <CardMedia component="img" height="360" image={`${detailClass.image}`} alt="green iguana" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" className="text-white">
                  {detailClass?.subject?.subject_name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {/* {`Giáo viên: ${teacherData?.full_name}`} */}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Thời lương: 3 tháng
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {detailClass.start_date}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Kết thúc: 30/06/2022
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      </div>
    </>
  )
}
