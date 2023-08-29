import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Form } from './Components/Form'
import Navbar from './Components/Navbar'
import { Login } from './Components/Login'
import UserForms from './Components/UserForms'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Navbar />
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Form />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forms' element={<UserForms />} />
      </Routes>
    </>
  )
}

export default App
