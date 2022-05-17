import OutstandingClass from './OutstandingClass'
import { Grid } from '@mui/material'
import React, { Component, useState } from 'react'

export default function ListOutstandingClass() {
  //đây là hàm để lọc ra thằng class nổi bật
  let filterOutstandingClass = (arr) => {
    let array = arr.filter((item, index) => {
      return item.current_number_students > 60
      // find outstanding class where current_number_students > 60
    })
    return array
  }
  //dưới là data để map vào
  let dataOutstandingClass = filterOutstandingClass(data_class_subject)

  return (
    <>
      <h2 className="px-20 py-4 w-full"> Khóa học nổi bật</h2>

      <div className=" flex px-12 flex-wrap justify-center">
        {dataOutstandingClass.map((item, index) => {
          return <OutstandingClass data={item} id={item.class_id} />
        })}
      </div>
    </>
  )
}

//đây là data fake
let data_class_subject = [
  {
    class_id: 'PHP007',
    start_date: 'Fri May 20 2022 10:43:50 GMT+0700',
    max_number_students: 70,
    current_number_students: 65,
    user_id: 3,
    schedules: '[{"day":1,"lessons":[6,7,8,9]}]',
    subject_id: 2,
    teacher: {
      user_id: 3,
      specialty_id: 2,
      user: {
        user_id: 3,
        full_name: 'Hoang Tuan Hieu',
        email: 'tranducha2@gmail.com',
        date_of_birth: '1996-01-01',
        gender: 'fe-male',
        address: 'Bac Ninh',
        avatar: '',
        username: 'hoangtuanhieu',
        role_id: 'r2',
      },
    },
    subject: {
      id: 1,
      subject_name: 'Tiếng anh công nghệ thông tin',
      image: 'https://files.fullstack.edu.vn/f8-prod/banners/Banner_web_ReactJS.png',
      description:
        'Với kiến thức ong đốt đặc trưng đã làm nên thương hiệu của thầy Nguyễn Trung Phú. Sau khi học xong thì không ngán bất cứ một ai, cứ đến là đón',
      specialty_id: 1,
      credit_id: 1,
      background_color: 'linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)',
    },
  },
  {
    class_id: 'PHP008',
    start_date: 'Fri May 20 2022 10:47:44 GMT+0700',
    max_number_students: 70,
    current_number_students: 65,
    user_id: 3,
    schedules: '[{"day":4,"lessons":[6,7,8,9]}]',
    subject_id: 2,
    teacher: {
      user_id: 3,
      specialty_id: 2,
      user: {
        user_id: 3,
        full_name: 'Hoang Tuan Hieu',
        email: 'tranducha2@gmail.com',
        date_of_birth: '1996-01-01',
        gender: 'fe-male',
        address: 'Bac Ninh',
        avatar: '',
        username: 'hoangtuanhieu',
        role_id: 'r2',
      },
    },
    subject: {
      id: 3,
      subject_name: 'Tiếng anh công nghệ thông tin 2',
      image: 'https://files.fullstack.edu.vn/f8-prod/banners/Banner_03_youtube.png',
      description:
        'Với kiến thức ong đốt đặc trưng đã làm nên thương hiệu của thầy Nguyễn Trung Phú. Sau khi học xong thì không ngán bất cứ một ai, cứ đến là đón',
      specialty_id: 1,
      credit_id: 2,
      background_color: 'linear-gradient(to right, #fc4a1a, #f7b733)',
    },
  },
  {
    class_id: 'PHP007',
    start_date: 'Fri May 20 2022 10:43:50 GMT+0700',
    max_number_students: 70,
    current_number_students: 65,
    user_id: 3,
    schedules: '[{"day":1,"lessons":[6,7,8,9]}]',
    subject_id: 2,
    teacher: {
      user_id: 3,
      specialty_id: 2,
      user: {
        user_id: 3,
        full_name: 'Hoang Tuan Hieu',
        email: 'tranducha2@gmail.com',
        date_of_birth: '1996-01-01',
        gender: 'fe-male',
        address: 'Bac Ninh',
        avatar: '',
        username: 'hoangtuanhieu',
        role_id: 'r2',
      },
    },
    subject: {
      id: 1,
      subject_name: 'Tiếng anh công nghệ thông tin',
      image: 'https://files.fullstack.edu.vn/f8-prod/banners/Banner_web_ReactJS.png',
      description:
        'Với kiến thức ong đốt đặc trưng đã làm nên thương hiệu của thầy Nguyễn Trung Phú. Sau khi học xong thì không ngán bất cứ một ai, cứ đến là đón',
      specialty_id: 1,
      credit_id: 1,
      background_color: 'linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)',
    },
  },
  {
    class_id: 'PHP008',
    start_date: 'Fri May 20 2022 10:47:44 GMT+0700',
    max_number_students: 70,
    current_number_students: 65,
    user_id: 3,
    schedules: '[{"day":4,"lessons":[6,7,8,9]}]',
    subject_id: 2,
    teacher: {
      user_id: 3,
      specialty_id: 2,
      user: {
        user_id: 3,
        full_name: 'Hoang Tuan Hieu',
        email: 'tranducha2@gmail.com',
        date_of_birth: '1996-01-01',
        gender: 'fe-male',
        address: 'Bac Ninh',
        avatar: '',
        username: 'hoangtuanhieu',
        role_id: 'r2',
      },
    },
    subject: {
      id: 3,
      subject_name: 'Tiếng anh công nghệ thông tin 2',
      image: 'https://files.fullstack.edu.vn/f8-prod/banners/Banner_03_youtube.png',
      description:
        'Với kiến thức ong đốt đặc trưng đã làm nên thương hiệu của thầy Nguyễn Trung Phú. Sau khi học xong thì không ngán bất cứ một ai, cứ đến là đón',
      specialty_id: 1,
      credit_id: 2,
      background_color: 'linear-gradient(to right, #fc4a1a, #f7b733)',
    },
  },
]
