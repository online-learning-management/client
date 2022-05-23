import React from 'react'

import DetailLesson from './DetailLesson'

let data = [
  {
    id: 1,
    class_id: 'TACNTT06',
    content: 'Buổi 1: Giới thiệu về môn học',
    link_document: 'https://classroom.google.com/h',
    link_class_online: 'https://meet.google.com/yhn-ggds-qyt?pli=1&authuser=0',
    created_at: '2022-05-22T15:52:19.000000Z',
    updated_at: '2022-05-22T15:52:19.000000Z',
  },
  {
    id: 2,
    class_id: 'TACNTT06',
    content: 'Buổi 2: Làm quen cơ bản PHP',
    link_document: 'https://classroom.google.com/h',
    link_class_online: 'https://meet.google.com/yhn-ggds-qyt?pli=1&authuser=0',
    created_at: '2022-05-22T15:52:19.000000Z',
    updated_at: '2022-05-22T15:52:19.000000Z',
  },
  {
    id: 1,
    class_id: 'TACNTT06',
    content: 'Buổi 3: Phương thức GET, POST',
    link_document: 'https://classroom.google.com/h',
    link_class_online: 'https://meet.google.com/yhn-ggds-qyt?pli=1&authuser=0',
    created_at: '2022-05-22T15:52:19.000000Z',
    updated_at: '2022-05-22T15:52:19.000000Z',
  },
]

export default function ListLesson(props) {
  let { classId } = props
  // console.log('classId: ', classId)
  //data= call api bảng class_document bằng classId

  return (
    <div className="listLesson w-6/12">
      {data.map((item, index) => {
        return (
          <>
            <br></br>
            <DetailLesson data={item} />
          </>
        )
      })}
    </div>
  )
}
