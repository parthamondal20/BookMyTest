import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import store from "./app/store.js";
import { Provider } from 'react-redux';
import './index.css'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Layout from './Latout.jsx';
import Loader from './components/Loader.jsx';
const Home = lazy(() => import("./components/Home.jsx"));
const Test = lazy(() => import("./pages/Tests.jsx"));
const TestDetailPage = lazy(() => import("./pages/TestDetailPage.jsx"));
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="tests" element={<Test />} />
      <Route path="test-details/:test_id" element={<TestDetailPage />} />
    </Route>
  )
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
    </Provider>
  </StrictMode>,
)
