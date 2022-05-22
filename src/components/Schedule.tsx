import { useContext, useEffect, useState } from 'react'
import { AuthContext } from 'src/contexts/authContext/AuthContext'
import useStudentQuery from 'src/hooks/reactQueryHooks/useStudentQuery'
import useTeacherQuery from 'src/hooks/reactQueryHooks/useTeacherQuery'

type Props = {}

export default function Schedule({}: Props) {
  const { user } = useContext(AuthContext)
  const [schedules, setSchedules] = useState([
    [[], [], [], [], [], [], []],
    [[], [], [], [], [], [], []],
    [[], [], [], [], [], [], []],
  ])

  // react-query
  const { data: teacher } = useTeacherQuery.getById(user?.role_id === 'r2' && user?.user_id)
  const { data: student } = useStudentQuery.getById(user?.role_id === 'r3' && user?.user_id)

  const Subject = ({ name, time }: { name: string; time: string }) => {
    return (
      <div className="bg-purple text-white text-base rounded mb-2">
        <p className="my-1">{name}</p>
        <p className="my-1">{time}</p>
      </div>
    )
  }

  // ================ EFFECT ================
  // handle when is teacher
  useEffect(() => {
    if (teacher?.data && user?.role_id === 'r2') {
      teacher.data?.teacher?.classes?.length > 0 &&
        teacher.data?.teacher?.classes?.forEach((clazz) => {
          if (clazz?.schedules) {
            const schedules = JSON.parse(clazz?.schedules)

            schedules.forEach((schedule) => {
              const day = schedule.day
              const lessons = schedule.lessons

              // kiểm tra thuộc buổi học nào?
              let dayIndex = 0
              if (lessons[0] > 5) dayIndex = 1
              if (lessons[0] > 11) dayIndex = 2

              setSchedules((prevState) => {
                const newState = prevState.map((row) => row.slice())

                newState[dayIndex][day] = [
                  ...prevState[dayIndex][day],
                  <Subject name={clazz?.subject?.subject_name} time={`(${lessons.map((i) => i + 1).join(', ')})`} />,
                ]

                return newState
              })
            })
          }

          return
        })
    }

    return () =>
      setSchedules([
        [[], [], [], [], [], [], []],
        [[], [], [], [], [], [], []],
        [[], [], [], [], [], [], []],
      ])
  }, [teacher?.data])

  // handle when is student
  useEffect(() => {
    if (student?.data && user?.role_id === 'r3') {
      student.data?.student?.student_class?.length > 0 &&
        student.data?.student?.student_class?.forEach((clazz) => {
          if (clazz.class?.schedules) {
            const schedules = JSON.parse(clazz.class?.schedules)

            schedules.forEach((schedule) => {
              const day = schedule.day
              const lessons = schedule.lessons

              // kiểm tra thuộc buổi học nào?
              let dayIndex = 0
              if (lessons[0] > 5) dayIndex = 1
              if (lessons[0] > 11) dayIndex = 2

              setSchedules((prevState) => {
                const newState = prevState.map((row) => row.slice())

                newState[dayIndex][day] = [
                  ...prevState[dayIndex][day],
                  <Subject
                    name={clazz?.class?.subject?.subject_name}
                    time={`(${lessons.map((i) => i + 1).join(', ')})`}
                  />,
                ]

                return newState
              })
            })
          }
        })
    }

    return () =>
      setSchedules([
        [[], [], [], [], [], [], []],
        [[], [], [], [], [], [], []],
        [[], [], [], [], [], [], []],
      ])
  }, [student?.data])

  return (
    <div>
      <p className="my-2 text-center font-Inter text-2xl font-normal">
        06 <span className="font-black text-[28px]">Tháng 4</span> 2022
      </p>
      <table
        style={{ borderSpacing: 0 }}
        className="border-black w-full text-center table-fixed text-xl font-Inter rounded-lg shadow-fakeBorderTable"
      >
        <thead>
          <tr className="child:border child:border-solid child:font-medium">
            <th className="w-[10%] rounded-tl-lg">Buổi</th>
            <th>Thứ 2</th>
            <th>Thứ 3</th>
            <th>Thứ 4</th>
            <th>Thứ 5</th>
            <th>Thứ 6</th>
            <th>Thứ 7</th>
            <th className="rounded-tr-lg">CN</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule, index1) => (
            <tr className="child:border child:border-solid h-36 child:font-medium">
              {schedule.map((item, index2) => {
                if (index2 === 0) {
                  if (index1 === 0)
                    return (
                      <>
                        <td>Sáng</td>
                        <td>{item}</td>
                      </>
                    )
                  if (index1 === 1)
                    return (
                      <>
                        <td>Chiều</td>
                        <td>{item}</td>
                      </>
                    )
                  if (index1 === 2)
                    return (
                      <>
                        <td className="rounded-bl-lg">Tối</td>
                        <td>{item}</td>
                      </>
                    )
                }
                if (index2 === 6 && index1 === 2) return <td className="rounded-br-lg">{item}</td>

                return <td>{item}</td>
              })}
            </tr>
          ))}

          {/* <tr className="child:border child:border-solid h-36 child:font-medium">
            <td>Sáng</td>
            <td></td>
            <td></td>
            <td>
              <Subject name={'Đồ họa máy tính'} time={'6:00 - 7:00'} />
              <Subject name={'Lập trình JAVA'} time={'7:00 - 8:00'} />
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr className="child:border child:border-solid h-36 child:font-medium">
            <td>Chiều</td>
            <td>
              <Subject name={'Đồ họa máy tính'} time={'6:00 - 7:00'} />
            </td>
            <td></td>
            <td></td>
            <td>
              <Subject name={'Đồ họa máy tính'} time={'6:00 - 7:00'} />
            </td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr className="child:border child:border-solid h-36 child:font-medium ">
            <td className="rounded-bl-lg">Tối</td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <Subject name={'Đồ họa máy tính'} time={'6:00 - 7:00'} />
            </td>
            <td></td>
            <td></td>
            <td className="rounded-br-lg"></td>
          </tr> */}
        </tbody>
      </table>
    </div>
  )
}
