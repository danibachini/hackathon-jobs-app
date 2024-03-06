import {createBrowserRouter} from "react-router-dom"
import HomePage from "./pages/HomePage"
import Contact from "./pages/Contact"
import Error from "./pages/Error"
import Candidate from "./pages/Candidate"
import Recruiter from "./pages/Recruiter"
import App from "./App"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Jobs from "./pages/Jobs"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <HomePage/>
            },
            {
                path: "/job-offers",
                element: <Jobs />
            },
            {
                path: "/contact",
                element: <Contact/>
            },
            {
                path: "/sign-in",
                element: <SignIn/>
            },
            {
                path: "/sign-up",
                element: <SignUp />
            },
            {
                path: "/auth/profile",
                element: <ProtectedRoute><Candidate/></ProtectedRoute>
            },
            {
                path: "/auth/recruiter",
                element: <ProtectedRoute><Recruiter/></ProtectedRoute>
            },
            {
                path: "*",
                element: <Error/>
            },
        ]
    }
])