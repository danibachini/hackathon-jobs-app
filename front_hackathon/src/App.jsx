import { Outlet } from 'react-router-dom'
import Layout from './Layout'
import AuthContextProvider from './context/AuthContext'

function App() {

  return (
    <>
    <AuthContextProvider>
      <Layout>
        <Outlet/>
      </Layout>
      </AuthContextProvider>
    </>
  )
}

export default App
