import ClassItem from './ClassItem'
import { Grid } from '@mui/material'
import React, { Component, useState } from 'react'
import Carousel from 'react-elastic-carousel'

let fakeData = [
  {
    id: 1,
    className: 'Lập trình web bằng PHP',
    image: 'https://daotaonoibo.vn/wp-content/uploads/2021/11/xu-huong-e-learning-nam-2022.jpg',
    description:
      'Với kiến thức ong đốt đặc trưng đã làm nên thương hiệu của thầy Nguyễn Trung Phú. Sau khi học xong thì không ngán bất cứ một ai, cứ đến là đón',
  },
  {
    id: 2,
    className: 'Lập trình Java',
    image: 'https://daotaonoibo.vn/wp-content/uploads/2021/11/xu-huong-e-learning-nam-2022.jpg',
    description:
      'Với kiến thức ong đốt đặc trưng đã làm nên thương hiệu của thầy Nguyễn Trung Phú. Sau khi học xong thì không ngán bất cứ một ai, cứ đến là đón',
  },
  {
    id: 3,
    className: 'Lập trình .NET',
    image: 'https://daotaonoibo.vn/wp-content/uploads/2021/11/xu-huong-e-learning-nam-2022.jpg',
    description:
      'Với kiến thức ong đốt đặc trưng đã làm nên thương hiệu của thầy Nguyễn Trung Phú. Sau khi học xong thì không ngán bất cứ một ai, cứ đến là đón',
  },
  {
    id: 4,
    className: 'Tiếng anh công nghệ thông tin',
    image: 'https://daotaonoibo.vn/wp-content/uploads/2021/11/xu-huong-e-learning-nam-2022.jpg',
    description:
      'Với kiến thức ong đốt đặc trưng đã làm nên thương hiệu của thầy Nguyễn Trung Phú. Sau khi học xong thì không ngán bất cứ một ai, cứ đến là đón',
  },
]

export default function ClassList() {
  return (
    <>
      <h2 className="pl-16 py-6">Khóa học lập trình</h2>

      <Carousel itemsToShow={3} disableArrowsOnEnd={false} disableArrowsOnStart={false}>
        {fakeData.map((item, index) => {
          return <ClassItem data={item} key={index} />
        })}
      </Carousel>

      <h2 className="pl-16 py-6">Khóa học ngoại ngữ</h2>
      <Carousel itemsToShow={3} disableArrowsOnEnd={false} disableArrowsOnStart={false}>
        {fakeData.map((item, index) => {
          return <ClassItem data={item} key={index} />
        })}
      </Carousel>

      <h2 className="pl-16 py-6">Khóa học </h2>
      <Carousel itemsToShow={3} disableArrowsOnEnd={false} disableArrowsOnStart={false}>
        {fakeData.map((item, index) => {
          return <ClassItem data={item} key={index} />
        })}
      </Carousel>
    </>
  )
}
