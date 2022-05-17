import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Grid } from '@mui/material'
import { flexbox, margin, width } from '@mui/system'
import Stack from '@mui/material/Stack'

import CardMedia from '@mui/material/CardMedia'
import { CardActionArea } from '@mui/material'

import { Link } from 'react-router-dom'

import Carousel from 'react-elastic-carousel'

let ContentItem = (props) => {
  let { content, title, id, img, bg } = props
  return (
    <Box
      sx={{
        width: '100%',
        height: 300,
        display: 'flex',
        alignItems: 'center',
        background: `${bg}`,
        borderRadius: '10px',
        fontFamily: 'Roboto Slab',
        orientation: 'horizontal',
        justifyContent: 'center',
      }}
    >
      <CardContent sx={{ color: 'white' }}>
        <Typography gutterBottom variant="h4" component="div">
          {title}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {content}
        </Typography>
      </CardContent>

      <img src={`${img}`} alt="" className=" w-2/5 h-full bg-opacity-50" />
    </Box>
  )
}

export default function HomePageSlider() {
  const carouselRef = React.useRef(null)
  const onNextStart = (currentItem, nextItem) => {
    if (currentItem.index === nextItem.index) {
      carouselRef.current.goTo(0)
    }
  }

  return (
    <>
      <Carousel
        itemsToShow={1}
        disableArrowsOnEnd={false}
        disableArrowsOnStart={false}
        enableAutoPlay
        ref={carouselRef}
        onNextStart={onNextStart}
      >
        {fakeData.map((item, index) => {
          return <ContentItem content={item?.content} id={item?.id} title={item?.title} bg={item?.bg} img={item?.img} />
        })}
      </Carousel>
    </>
  )
}

let fakeData = [
  {
    id: 1,
    title: 'Lập trình web với ReactJS',
    content: 'Môn học giúp các bạn có thể nẳm được cách bị ong đốt hiệu quả',
    img: 'https://files.fullstack.edu.vn/f8-prod/banners/Banner_web_ReactJS.png',
    bg: 'linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)',
  },
  {
    id: 1,
    title: 'Lập trình Java',
    content: 'Môn học giúp các bạn có thể nẳm được cách bị ong đốt hiệu quả',
    bg: 'linear-gradient(to right, #fc4a1a, #f7b733)',
    img: 'https://files.fullstack.edu.vn/f8-prod/banners/Banner_03_youtube.png',
  },
  {
    id: 1,
    title: 'Lập trình web với ReactJS',
    content: 'Môn học giúp các bạn có thể nẳm được cách bị ong đốt hiệu quả',
    img: 'https://files.fullstack.edu.vn/f8-prod/banners/Banner_web_ReactJS.png',
    bg: 'linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)',
  },
  {
    id: 1,
    title: 'Lập trình Java',
    content: 'Môn học giúp các bạn có thể nẳm được cách bị ong đốt hiệu quả',
    bg: 'linear-gradient(to right, #fc4a1a, #f7b733)',
    img: 'https://files.fullstack.edu.vn/f8-prod/banners/Banner_01_2.png',
  },
  {
    id: 1,
    title: 'Lập trình web với ReactJS',
    content: 'Môn học giúp các bạn có thể nẳm được cách bị ong đốt hiệu quả',
    img: 'https://files.fullstack.edu.vn/f8-prod/banners/Banner_web_ReactJS.png',
    bg: 'linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)',
  },
  {
    id: 1,
    title: 'Lập trình Java',
    content: 'Môn học giúp các bạn có thể nẳm được cách bị ong đốt hiệu quả',
    bg: 'linear-gradient(to right, #fc4a1a, #f7b733)',
    img: 'https://files.fullstack.edu.vn/f8-prod/banners/Banner_01_2.png',
  },
  {
    id: 1,
    title: 'Lập trình web với ReactJS',
    content: 'Môn học giúp các bạn có thể nẳm được cách bị ong đốt hiệu quả',
    img: 'https://files.fullstack.edu.vn/f8-prod/banners/Banner_web_ReactJS.png',
    bg: 'linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)',
  },
  // {
  //   id: 1,
  //   title: 'Lập trình web bằng PHP',
  //   content: 'Môn học giúp các bạn có thể nẳm được cách bị ong đốt hiệu quả',
  //   bg: 'linear-gradient(to right, #fc4a1a, #f7b733)',
  //   img: 'src/images/laravel.png',
  // },
]
