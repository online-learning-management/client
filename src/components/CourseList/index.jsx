import CourseItem from './CourseItem'
import { Grid } from '@mui/material'
import React, { Component, useState } from 'react'

export default function CourseList() {
  return (
    <>
      <h2 className="px-20 py-4 w-full"> Khóa học nổi bật</h2>

      <div className=" flex px-12 flex-wrap justify-center">
        {fakeData.map((item, index) => {
          return <CourseItem title={item?.title} img={item?.img} bg={item?.bg} />
        })}
      </div>
    </>
  )
}

let fakeData = [
  {
    id: 1,
    title: 'Lập trình web với ReactJS',
    img: 'https://files.fullstack.edu.vn/f8-prod/banners/Banner_web_ReactJS.png',
    bg: 'linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)',
  },
  {
    id: 1,
    title: 'Lập trình Java',
    bg: 'linear-gradient(to right, #fc4a1a, #f7b733)',
    img: 'https://files.fullstack.edu.vn/f8-prod/banners/Banner_03_youtube.png',
  },
  {
    id: 1,
    title: 'Lập trình web với ReactJS',
    img: 'https://files.fullstack.edu.vn/f8-prod/banners/Banner_web_ReactJS.png',
    bg: 'linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)',
  },
  {
    id: 1,
    title: 'Lập trình Java',
    bg: 'linear-gradient(to right, #fc4a1a, #f7b733)',
    img: 'https://files.fullstack.edu.vn/f8-prod/banners/Banner_01_2.png',
  },
  {
    id: 1,
    title: 'Lập trình web với ReactJS',
    img: 'https://files.fullstack.edu.vn/f8-prod/banners/Banner_web_ReactJS.png',
    bg: 'linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)',
  },
  {
    id: 1,
    title: 'Lập trình Java',
    bg: 'linear-gradient(to right, #fc4a1a, #f7b733)',
    img: 'https://files.fullstack.edu.vn/f8-prod/banners/Banner_01_2.png',
  },
  {
    id: 1,
    title: 'Lập trình web với ReactJS',
    img: 'https://files.fullstack.edu.vn/f8-prod/banners/Banner_web_ReactJS.png',
    bg: 'linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)',
  },
  {
    id: 1,
    title: 'Lập trình web với ReactJS',
    img: 'https://files.fullstack.edu.vn/f8-prod/banners/Banner_web_ReactJS.png',
    bg: 'linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)',
  },
]
