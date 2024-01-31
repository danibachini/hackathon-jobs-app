import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div>
      <div className="navbar bg-base-100 bg-neutral pt-3 pb-3 mb-5">
        <div className="navbar-start">
          <Link to="/" className="btn btn-ghost text-xl">SkillsTree</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <h1 className="text-lg text-blue-600 text-white">Misez sur les compétences pour gagner en expérience</h1>
        </div>
        <div className="navbar-end hidden sm:flex">
          <Link to="/sign-up" className="btn ml-3 rounded-lg">S'inscrire</Link>
          <Link to="/sign-in" className="btn ml-3 rounded-lg">Se connecter</Link>
        </div>
        <div className="dropdown w-3/6 text-right sm:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden ml-5 text-white ">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </div>
        </div>
      </div>
    </div>
  )
}
