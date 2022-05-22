import ClassItem from './ClassItem'
import { Grid } from '@mui/material'
import React, { Component, useState } from 'react'
import Carousel from 'react-elastic-carousel'
import { AuthContext } from '../../contexts/authContext/AuthContext'
import useSpecialtyQuery from '../../hooks/reactQueryHooks/useSpecialtyQuery'

let fakeDataClass = [
  {
    id: 1,
    specialty_name: 'Công nghệ thông tin',
    subjects: [
      {
        id: 1,
        subject_name: 'Tiếng anh công nghệ thông tin',
        image: 'https://files.fullstack.edu.vn/f8-prod/banners/Banner_web_ReactJS.png',
        description: 'Với kiến thức ong đốt đặc trưng đã làm nên thương hiệu của thầy Nguyễn Trung Phú',
        specialty_id: 1,
        credit_id: 1,
        background_color: 'linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)',
      },
      {
        id: 1,
        subject_name: 'Tiếng anh công nghệ thông tin',
        image: 'https://files.fullstack.edu.vn/f8-prod/banners/Banner_web_ReactJS.png',
        description: 'Với kiến thức ong đốt đặc trưng đã làm nên thương hiệu của thầy Nguyễn Trung Phú',
        specialty_id: 1,
        credit_id: 1,
        background_color: 'linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)',
      },
      {
        id: 3,
        subject_name: 'Tiếng anh công nghệ thông tin 2',
        image: 'https://files.fullstack.edu.vn/f8-prod/banners/Banner_03_youtube.png',
        description: 'Với kiến thức ong đốt đặc trưng đã làm nên thương hiệu của thầy Nguyễn Trung Phú',
        specialty_id: 1,
        credit_id: 2,
        background_color: 'linear-gradient(to right, #fc4a1a, #f7b733)',
      },
      {
        id: 4,
        subject_name: 'Tiếng anh công nghệ thông tin',
        image: 'https://files.fullstack.edu.vn/f8-prod/banners/Banner_web_ReactJS.png',
        description: 'Với kiến thức ong đốt đặc trưng đã làm nên thương hiệu của thầy Nguyễn Trung Phú',
        specialty_id: 1,
        credit_id: 1,
        background_color: 'linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)',
      },
      {
        id: 5,
        subject_name: 'Tiếng anh công nghệ thông tin 2',
        image: 'https://files.fullstack.edu.vn/f8-prod/banners/Banner_03_youtube.png',
        description: 'Với kiến thức ong đốt đặc trưng đã làm nên thương hiệu của thầy Nguyễn Trung Phú',
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
  const { user } = React.useContext(AuthContext)
  const { data: specialties } = useSpecialtyQuery.getAll()

  let dataSpecialtyClass = specialties?.data
  // console.log('check: ', dataSpecialtyClass)

  return (
    <>
      {dataSpecialtyClass &&
        dataSpecialtyClass.map((item, index) => {
          return (
            <div key={index}>
              <h2 className="pl-16 py-6">{item.specialty_name}</h2>

              <div className="flex w-full flex-wrap">
                {item.subjects &&
                  item.subjects.map((item1, index1) => {
                    return (
                      item1 &&
                      item1.classes &&
                      item1.classes.map((item2, index2) => {
                        return <ClassItem data={item2} subjectName={item1?.subject_name} />
                      })
                    )
                  })}
              </div>
            </div>
          )
        })}
    </>
  )
}
