import DetailLesson from './DetailLesson'

export default function ListLesson({ data = [] }) {
  return (
    <div className="listLesson w-full">
      {data.map((item) => {
        return (
          <>
            <br></br>
            <DetailLesson key={item?.id} item={item} />
          </>
        )
      })}
    </div>
  )
}
