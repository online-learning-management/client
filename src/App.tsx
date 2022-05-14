import { Route, Routes } from 'react-router-dom'
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

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/"
        element={
          <Layer>
            <HomePage />
          </Layer>
        }
      />

      <Route
        path="classes"
        element={
          <Layer>
            <ClassPage />
          </Layer>
        }
      />

      <Route
        path="user-management"
        element={
          <Layer>
            <AdminPage />
          </Layer>
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
