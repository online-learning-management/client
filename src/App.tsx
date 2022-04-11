import { Route, Routes } from 'react-router-dom'
import Layer from './components/Layer'
import ClassPage from './pages/ClassPage'
import HomePage from './pages/HomePage'

function App() {
  return (
    <Layer>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/classes" element={<ClassPage />} />
      </Routes>
    </Layer>
  )
}

export default App
