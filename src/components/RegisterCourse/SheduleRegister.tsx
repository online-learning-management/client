import React from 'react'
import RegisterModal from './RegisterModal'

type Props = {}

export default function ScheduleRegister({}: Props) {
  const Subject = ({ name, time }: { name: string; time: string }) => {
    return (
      <div className="bg-purple text-white text-base rounded mb-2">
        <p className="my-1">{name}</p>
        <p className="my-1">{time}</p>
      </div>
    )
  }
  let Select = ({ name }: { name: string }) => {
    return (
      <div className="text-red-500 text-base rounded mb-2 cursor-pointer" onClick={handleOnclickSelect}>
        <b className="my-1">{name}</b>
      </div>
    )
  }
  let handleOnclickSelect = () => {
    handleOpen()
  }

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <RegisterModal open={open} handleOpen={handleOpen} handleClose={handleClose} />
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
          <tr className="child:border child:border-solid h-36 child:font-medium">
            <td>Sáng</td>
            <td>
              <Select name={'[Chọn]'} />
            </td>
            <td>
              <Select name={'[Chọn]'} />
            </td>
            <td>
              <Select name={'[Chọn]'} />
              <Subject name={'Đồ họa máy tính'} time={'6:00 - 7:00'} />
              <Subject name={'Lập trình JAVA'} time={'7:00 - 8:00'} />
            </td>
            <td>
              <Select name={'[Chọn]'} />
            </td>
            <td>
              <Select name={'[Chọn]'} />
            </td>
            <td>
              <Select name={'[Chọn]'} />
            </td>
            <td>
              <Select name={'[Chọn]'} />
            </td>
          </tr>
          <tr className="child:border child:border-solid h-36 child:font-medium">
            <td>Chiều</td>
            <td>
              <Select name={'[Chọn]'} />
              <Subject name={'Đồ họa máy tính'} time={'6:00 - 7:00'} />
            </td>
            <td>
              <Select name={'[Chọn]'} />
            </td>
            <td>
              <Select name={'[Chọn]'} />
            </td>
            <td>
              <Select name={'[Chọn]'} />
              <Subject name={'Đồ họa máy tính'} time={'6:00 - 7:00'} />
            </td>
            <td>
              <Select name={'[Chọn]'} />
            </td>
            <td>
              <Select name={'[Chọn]'} />
            </td>
            <td>
              <Select name={'[Chọn]'} />
            </td>
          </tr>
          <tr className="child:border child:border-solid h-36 child:font-medium ">
            <td className="rounded-bl-lg">Tối</td>
            <td>
              <Select name={'[Chọn]'} />
            </td>
            <td>
              <Select name={'[Chọn]'} />
            </td>
            <td>
              <Select name={'[Chọn]'} />
            </td>
            <td>
              <Select name={'[Chọn]'} />
              <Subject name={'Đồ họa máy tính'} time={'6:00 - 7:00'} />
            </td>
            <td>
              <Select name={'[Chọn]'} />
            </td>
            <td>
              <Select name={'[Chọn]'} />
            </td>
            <td className="rounded-br-lg"></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
