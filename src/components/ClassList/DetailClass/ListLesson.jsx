import DetailLesson from './DetailLesson'

export default function ListLesson(props) {
  let { data } = props
  return (
    <div className="listLesson w-full">
      {data &&
        data.map((item) => {
          return (
            <>
              <br></br>
              <DetailLesson key={item?.id} data={item} />
            </>
          )
        })}
    </div>
  )
}
