import React from 'react'

import DetailLesson from './DetailLesson'

let dataFake = [
  {
    id: 1,
    content: 'Giới thiệu về môn học',
  },
  {
    id: 2,
    content: 'Làm quen cơ bản PHP',
  },
  {
    id: 3,
    content: 'Phương thức GET, POST',
  },
  {
    id: 4,
    content: 'Cookies và Session trong PHP',
  },
  {
    id: 5,
    content: 'Làm quen với CSDL MySQL',
  },
  {
    id: 6,
    content: 'Kết nối CSDL MySQL',
  },
  {
    id: 7,
    content: 'Ôn tập tổng hợp',
  },
]

export default function ListLesson() {
  return (
    <div className="listLesson w-6/12">
      {dataFake.map((item, index) => {
        return (
          <>
            <br></br>
            <DetailLesson item={item} />
          </>
        )
      })}
    </div>
  )
}
