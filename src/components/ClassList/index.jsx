import ClassItem from './ClassItem'
import { Grid } from '@mui/material'
import React, { Component, useState } from 'react'
import Carousel from 'react-elastic-carousel'

let fakeDataClass = [
  {
    id: 1,
    specialty_name: 'Công nghệ thông tin',
    subjects: [
      {
        id: 1,
        subject_name: 'Tiếng anh công nghệ thông tin',
        image: 'https://files.fullstack.edu.vn/f8-prod/banners/Banner_web_ReactJS.png',
        description:
          'Với kiến thức ong đốt đặc trưng đã làm nên thương hiệu của thầy Nguyễn Trung Phú. Sau khi học xong thì không ngán bất cứ một ai, cứ đến là đón',
        specialty_id: 1,
        credit_id: 1,
        background_color: 'linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)',
      },
      {
        id: 3,
        subject_name: 'Tiếng anh công nghệ thông tin 2',
        image: 'https://files.fullstack.edu.vn/f8-prod/banners/Banner_03_youtube.png',
        description:
          'Với kiến thức ong đốt đặc trưng đã làm nên thương hiệu của thầy Nguyễn Trung Phú. Sau khi học xong thì không ngán bất cứ một ai, cứ đến là đón',
        specialty_id: 1,
        credit_id: 2,
        background_color: 'linear-gradient(to right, #fc4a1a, #f7b733)',
      },
      {
        id: 4,
        subject_name: 'Tiếng anh công nghệ thông tin',
        image: 'https://files.fullstack.edu.vn/f8-prod/banners/Banner_web_ReactJS.png',
        description:
          'Với kiến thức ong đốt đặc trưng đã làm nên thương hiệu của thầy Nguyễn Trung Phú. Sau khi học xong thì không ngán bất cứ một ai, cứ đến là đón',
        specialty_id: 1,
        credit_id: 1,
        background_color: 'linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)',
      },
      {
        id: 5,
        subject_name: 'Tiếng anh công nghệ thông tin 2',
        image: 'https://files.fullstack.edu.vn/f8-prod/banners/Banner_03_youtube.png',
        description:
          'Với kiến thức ong đốt đặc trưng đã làm nên thương hiệu của thầy Nguyễn Trung Phú. Sau khi học xong thì không ngán bất cứ một ai, cứ đến là đón',
        specialty_id: 1,
        credit_id: 2,
        background_color: 'linear-gradient(to right, #fc4a1a, #f7b733)',
      },
    ],
  },
  {
    id: 2,
    specialty_name: 'Kỹ thuật phần mềm',
    subjects: [
      {
        id: 2,
        subject_name: 'Lập trình web bằng PHP',
        image: 'https://files.fullstack.edu.vn/f8-prod/banners/Banner_03_youtube.png',
        description:
          'Với kiến thức ong đốt đặc trưng đã làm nên thương hiệu của thầy Nguyễn Trung Phú. Sau khi học xong thì không ngán bất cứ một ai, cứ đến là đón',
        specialty_id: 2,
        credit_id: 1,
        background_color: 'linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)',
      },
      {
        id: 2,
        subject_name: 'Lập trình web bằng PHP',
        image: 'https://files.fullstack.edu.vn/f8-prod/banners/Banner_03_youtube.png',
        description:
          'Với kiến thức ong đốt đặc trưng đã làm nên thương hiệu của thầy Nguyễn Trung Phú. Sau khi học xong thì không ngán bất cứ một ai, cứ đến là đón',
        specialty_id: 2,
        credit_id: 1,
        background_color: 'linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)',
      },
      {
        id: 2,
        subject_name: 'Lập trình web bằng PHP',
        image: 'https://files.fullstack.edu.vn/f8-prod/banners/Banner_03_youtube.png',
        description:
          'Với kiến thức ong đốt đặc trưng đã làm nên thương hiệu của thầy Nguyễn Trung Phú. Sau khi học xong thì không ngán bất cứ một ai, cứ đến là đón',
        specialty_id: 2,
        credit_id: 1,
        background_color: 'linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)',
      },
    ],
  },
]

export default function ClassList() {
  return (
    <>
      {fakeDataClass.map((item, index) => {
        return (
          <div>
            <h2 className="pl-16 py-6">{item.specialty_name}</h2>

            <Carousel itemsToShow={3} disableArrowsOnEnd={false} disableArrowsOnStart={false}>
              {item.subjects.map((item, index) => {
                return <ClassItem data={item} id={item.id} />
              })}
            </Carousel>
          </div>
        )
      })}
    </>
  )
}
