import { Route, Routes } from 'react-router-dom'
import Layer from './components/Layer'
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
    <Layer>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="classes" element={<ClassPage />} />

        <Route path="user-management" element={<AdminPage />}>
          <Route path="teacher" element={<TeacherPage />} />
          <Route path="student" element={<StudentPage />} />
          <Route path="classes" element={<ClassManagePage />} />
          <Route path="subjects" element={<SubjectPage />} />
          <Route path="specialties" element={<SpecialtyPage />} />
        </Route>
      </Routes>
    </Layer>
  )
}
export default App
