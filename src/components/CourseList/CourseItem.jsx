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

export default function CourseItem(props) {
  let { title, bg, img } = props
  return (
    <Box
      sx={{
        width: '22%',
        height: '200px',
        m: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: `${bg}`,
        borderRadius: '10px',
        fontFamily: 'Roboto Slab',
        orientation: 'horizontal',
      }}
    >
      <img src={`${img}`} alt="" className=" w-10/12 h-10/12 bg-opacity-50" />
      <Typography variant="h6" component="div" className=" text-white">
        {title}
      </Typography>
    </Box>
  )
}
