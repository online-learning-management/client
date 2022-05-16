import CourseItem from './CourseItem'
import { Grid } from '@mui/material'
import React, { Component, useState } from 'react'
import Carousel from 'react-elastic-carousel'

export default function CourseList() {
  return (
    <Carousel itemsToShow={2} disableArrowsOnEnd={false} disableArrowsOnStart={false}>
      <CourseItem />
      <CourseItem />
      <CourseItem />
      <CourseItem />
      <CourseItem />
      <CourseItem />
      <CourseItem />
      <CourseItem />
    </Carousel>
  )
}
