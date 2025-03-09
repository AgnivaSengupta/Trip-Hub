import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Header from './components/custom/Header'
import TripGeneratePage from './components/pages/TripGeneratePage'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ViewTrip from './components/pages/Trip-details/ViewTrip'
import MyTrips from './components/pages/MyTrips'

const router = createBrowserRouter([
  {
    path:'/',
    element: <App/>
  },
  {
    path: '/trip-generator',
    element: <TripGeneratePage/>
  },
  {
    path: 'Trip-detail/:tripId',
    element: <ViewTrip/>
  },
  {
    path: '/my-trips',
    element: <MyTrips/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <Header/>
    <RouterProvider router={router}/>
    </GoogleOAuthProvider>
  </StrictMode>,
)
