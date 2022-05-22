import { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import Layer from './components/Layer'
import LoginPage from './pages/LoginPage'
import ClassPage from './pages/ClassPage'
import AdminPage from './pages/AdminPage'
import HomePage from './pages/HomePage'
import TeacherPage from './pages/AdminPage/TeacherPage'
import StudentPage from './pages/AdminPage/StudentPage'
import ClassManagePage from './pages/AdminPage/ClassPage'
import SubjectPage from './pages/AdminPage/SubjectPage'
import SpecialtyPage from './pages/AdminPage/SpecialtyPage'
import { AuthContext } from './contexts/authContext/AuthContext'

import DetailClass from './components/ClassList/DetailClass/DetailClass.jsx'
import Schedule from './components/Schedule'
import RegisterCourse from './components/RegisterCourse/RegisterCourse.jsx'

function App() {
  const { user } = useContext(AuthContext)

  return (
    <Routes>
      {/* public routes */}
      <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" replace />} />

      {/* private routes */}
      <Route
        path="/"
        element={
          user ? (
            <Layer>
              <HomePage />
            </Layer>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="classes"
        element={
          user ? (
            <Layer>
              <ClassPage />
            </Layer>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="classes/detail-class-:id"
        element={
          <Layer>
            <DetailClass />
          </Layer>
        }
      />

      <Route
        path="schedule"
        element={
          user ? (
            <Layer>
              <Schedule />
            </Layer>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {user?.role_id === 'r3' && (
        <Route
          path="register-course"
          element={
            <Layer>
              <RegisterCourse />
            </Layer>
          }
        />
      )}

      <Route
        path="user-management"
        element={
          user ? (
            <Layer>
              <AdminPage />
            </Layer>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route path="teacher" element={<TeacherPage />} />
        <Route path="student" element={<StudentPage />} />
        <Route path="classes" element={<ClassManagePage />} />
        <Route path="subjects" element={<SubjectPage />} />
        <Route path="specialties" element={<SpecialtyPage />} />
      </Route>
    </Routes>
  )
}

export default App
