import { Route, Routes } from 'react-router-dom'
import Layer from './components/Layer'
import ClassPage from './pages/ClassPage'
import AdminPage from './pages/AdminPage'
import HomePage from './pages/HomePage'
import TableShow from './pages/AdminPage/components/TableShow'

function App() {
  return (
    <Layer>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="classes" element={<ClassPage />} />

        <Route path="user-management" element={<AdminPage />}>
          <Route path="teacher" element={<TableShow />} />
          <Route path="student" element={<TableShow />} />
        </Route>
      </Routes>
    </Layer>
  )
}
export default App
