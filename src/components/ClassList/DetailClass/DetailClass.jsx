import React from 'react'
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

export default function DetailClass() {
  let { id } = useParams()

  return (
    <>
      <h1>{`Lớp học ${id}`}</h1>
      <br></br>
      <p>
        Môn học này sẽ giúp sinh viên nắm vững kiến thức nền tảng về PHP, và có khả năng xây dựng một website hoàn chỉnh
        cả về front end và back end
      </p>
      <br></br>
      <h3>Nội dung chương trình học:</h3>
      <br></br>

      <div className="detailClass flex w-full">
        <ListLesson />
        <div className="descriptionLesson w-6/12 flex flex-col items-center">
          <br></br>
          <Card sx={{ width: 600 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="360"
                image="https://daotaonoibo.vn/wp-content/uploads/2021/11/xu-huong-e-learning-nam-2022.jpg"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lập trình web bằng PHP
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Giáo viên: Nguyễn Trung Phú
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Thời lương: 3 tháng
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Bắt đầu: 09/03/2022
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
