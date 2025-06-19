import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './pages/Dashboard'
import CreateTask from './pages/CreateTask'
import EditTask from './pages/EditTask'
import ProtectedRoute from './Middleware/ProtectedRoute'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="create-task" element={<ProtectedRoute><CreateTask /></ProtectedRoute>} />
        <Route path='edit-task/:id' element={<ProtectedRoute><EditTask /></ProtectedRoute>} />
      </Routes>
    </div>
  )
}

export default App