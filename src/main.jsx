import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  RouterProvider 
} from 'react-router-dom'
import './index.css'
import './App.css'

import { Provider } from 'react-redux'
import { store } from './store/store'

import Root from './components/Root'
import HomePage from './components/HomePage'
import RegisterPage from './components/RegisterPage'
import ParticipantsPage from './components/ParticipantsPage' 
import AnalyticsPage from './components/AnalyticsPage'
import AuthPage from './components/AuthPage' // <-- ДОДАНО ІМПОРТ

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<HomePage />} />
      <Route path="register/:eventId" element={<RegisterPage />} />
      <Route path="participants/:eventId" element={<ParticipantsPage />} />
      <Route path="analytics" element={<AnalyticsPage />} />
      <Route path="auth" element={<AuthPage />} /> {/* <-- ДОДАНО МАРШРУТ */}
      <Route path="*" element={<div className="container">Сторінку не знайдено (404)</div>} />
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)