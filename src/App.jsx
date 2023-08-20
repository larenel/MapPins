import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CitiesProvider } from './context/CitiesContext'
import { AuthProvider } from './context/FakeAuthContext'
import { ProtectedRoute } from './pages/ProtectedRoute'
import { Suspense, lazy } from 'react'

import CityList from './components/CityList'
import City from './components/City'
import CountriesList from './components/CountriesList'
import Form from './components/Form'
import SpinnerFullPage from './components/SpinnerFullPage'

// import Product from './pages/Product'
// import Pricing from './pages/Pricing'
// import Homepage from './pages/Homepage'
// import Login from './pages/Login'
// import PageNotFound from './pages/PageNotFound'
// import { AppLayout } from './pages/AppLayout'

const Homepage = lazy(() => import('./pages/Homepage'))
const Pricing = lazy(() => import('./pages/Pricing'))
const Product = lazy(() => import('./pages/Product'))
const Login = lazy(() => import('./pages/Login'))
const PageNotFound = lazy(() => import('./pages/PageNotFound'))
const AppLayout = lazy(() => import('./pages/AppLayout'))

export const App = () => {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="/product" element={<Product />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/login" element={<Login />} />

              <Route
                path="/app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />

                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountriesList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  )
}
