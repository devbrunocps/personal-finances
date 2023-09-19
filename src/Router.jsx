import { createBrowserRouter } from 'react-router-dom'
import RootLayout from './pages/RootLayout/RootLayout'
import Dashboard from './pages/Dashboard/Dashboard'
import Months from './pages/Months/Months'

const router = createBrowserRouter([{
    path: "/",
    element:  <RootLayout />,
    children: [
        {index: true, element: <Dashboard />},
        {path: "months", element: <Months />}
    ]
}])

export default router