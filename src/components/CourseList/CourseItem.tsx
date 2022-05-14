import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Grid } from '@mui/material'
import { flexbox, width } from '@mui/system'
import Stack from '@mui/material/Stack'

const bull = <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}></Box>

export default function CourseItem() {
  return (
    <Box
      sx={{
        flex: '1 0 0',
        width: '100%',
        px: '80px',
        m: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'linear-gradient(to right, #ffdde1, #ee9ca7)',
        borderRadius: '10px',
        fontFamily: 'Roboto Slab',
        pb: '80px',
        orientation: 'horizontal',
      }}
    >
      <h2 className="my-5">Lớp đang diễn ra</h2>
      <Card
        sx={{
          width: '100%',
          borderRadius: '10px',
        }}
      >
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img
            src="https://muakey.vn/wp-content/uploads/2021/12/laravel-featured.png"
            alt=""
            className="w-3/4 h-1/2 object-cover rounded-lg pb-2 "
          />
          <Typography variant="h5" component="div" className="font w-full pl-14 mt-4">
            Lập trình web bằng PHP
          </Typography>
          <Typography variant="body2" className="font w-full  pl-14 mt-4" sx={{ fontWeight: '600' }}>
            Giáo viên: Hoàng Ngọc Hậu
          </Typography>
          <Typography variant="body2" className="font w-full  pl-14 mt-4">
            Note: Hôm nay chúng ta nghỉ!
          </Typography>
          <Typography
            sx={{ height: '1px', width: '100%', background: '#DADDE4' }}
            className="font w-full mt-4"
          ></Typography>
          <Typography variant="body2" className="font w-full  pl-14 mt-4" sx={{ fontWeight: '600' }}>
            Thời gian học
          </Typography>
          <Typography variant="body2" className="font w-full  pl-14 mt-2">
            5h30PM - 7h30PM
          </Typography>
          <Stack spacing={2} direction="row" className="w-full px-14">
            <Button variant="contained" className="mt-4 w-full">
              Vào học
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}
