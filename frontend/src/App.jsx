import './App.css'
import Returnpredict from './Returnpredict'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

function App() {
  const router = createBrowserRouter([
    {
      path : '/',
      element : <Returnpredict />
    },
  ])

  return (
    <>
      <RouterProvider router = {router} />
    </>
  )
}

export default App
