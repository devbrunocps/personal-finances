import ContextProvider from './contexts/Context'
import { RouterProvider } from 'react-router-dom'
import router from './Router'

function App() {
    return (
        <ContextProvider>
            <RouterProvider router={router} />
        </ContextProvider>
    )
}

export default App
