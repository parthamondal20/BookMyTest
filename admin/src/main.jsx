import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import ThemeProvider from './components/ThemeProvider.jsx';
import store from "./app/store.js";
import { Provider } from 'react-redux';
import './index.css'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Layout from './Latout.jsx';
import Loader from './components/Loader.jsx';
const Home = lazy(() => import("./components/Home.jsx"));
const Test = lazy(() => import("./pages/Tests.jsx"));
const TestDetailPage = lazy(() => import("./pages/TestDetailPage.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Profile = lazy(() => import("./pages/Profile.jsx"));
const EditProfile = lazy(() => import("./pages/EditProfile.jsx"))
const Notifications = lazy(() => import("./pages/Notifications.jsx"));
const Users = lazy(() => import("./pages/Users.jsx"));
const Orders=lazy(()=>import("./pages/Orders.jsx"));
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="tests" element={<Test />} />
      <Route path="test-details/:test_id" element={<TestDetailPage />} />
      <Route path='login' element={<Login />} />
      <Route path='profile' element={<Profile />} />
      <Route path='edit-profile' element={<EditProfile />} />
      <Route path="notifications" element={<Notifications />} />
      <Route path='users' element={<Users />} />
      <Route path='orders' element={<Orders />} />
    </Route>
  )
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <Suspense fallback={<Loader />}>
          <RouterProvider router={router} />
        </Suspense>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
