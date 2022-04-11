import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Grid } from '@mui/material'
import { flexbox } from '@mui/system'
import Stack from '@mui/material/Stack'

const bull = (
  <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
    •
  </Box>
)
type Props = {}

export default function CourseItem({}: Props) {
  return (
    <Box
      sx={{
        flex: '1 0 0',
        width: '50%',
        height: '500px',
        px: '80px',
        m: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'pink',
        borderRadius: '10px',
        fontFamily: 'Roboto Slab',
      }}
    >
      <h2>Lớp đang diễn ra</h2>
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
          <Typography variant="h5" component="div" className="font">
            Lập trình web bằng PHP
          </Typography>
          <Typography variant="body2">Giáo viên: Hoàng Ngọc Hậu</Typography>
          <Typography variant="body2">Note: Hôm nay chúng ta nghỉ!</Typography>
          <Typography variant="body2">Thời gian học</Typography>
          <Typography className="border-t border-current"></Typography>
          <Stack spacing={2} direction="row" className="w-full">
            <Button variant="contained" className="mt-4 w-full">
              Vào học
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}
