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
                path: "/contact",
                element: <Contact/>
            },
            {
                path: "/profile",
                element: <Candidate/>
            },
            {
                path: "/job-offers",
                element: <Jobs />
            },
            {
                path: "/recruiter",
                element: <Recruiter/>
            },
            {
                path: "/sign-in",
                element: <SignIn/>
            },
            {
                path: "*",
                element: <Error/>
            },
            {
                path: "/sign-up",
                element: <SignUp />
            }
        ]
    }
])