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
        height: '500px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'pink',
        m: '20px',
        borderRadius: '10px',
      }}
    >
      <h2>Lớp đang diễn ra</h2>
      <Card
        sx={{
          width: '80%',
          height: '300px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: '10px',
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div">
            Lập trình web bằng PHP
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary"></Typography>
          <Typography variant="body2">Giáo viên: Hoàng Ngọc Hậu</Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary"></Typography>

          <Typography variant="body2">Note: Hôm nay chúng ta nghỉ!</Typography>

          <Typography sx={{ mb: 1.5 }} color="text.secondary"></Typography>
          <Typography variant="body2">Thời gian học</Typography>

          <Stack spacing={2} direction="row">
            <Button variant="contained">Vào học</Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}
