import ClassItem from './ClassItem'
import { Grid } from '@mui/material'
import React, { Component, useState } from 'react'
import Carousel from 'react-elastic-carousel'
import { AuthContext } from '../../contexts/authContext/AuthContext'
import useSpecialtyQuery from '../../hooks/reactQueryHooks/useSpecialtyQuery'

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
