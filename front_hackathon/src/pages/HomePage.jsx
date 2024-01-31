import React from 'react';
import skillsImage from "../../src/assets/images/illustration.jpg";
import {Link} from "react-router-dom"

export default function HomePage() {
  return (
    <div className='flex flex-col gap-y-7 width items-center justify-start mt-20 min-h-screen mb-40'>
    <img src={skillsImage} alt="skills" className="w-2/3 min-w-[1024px] md:w-1/3" />
      <div className="flex flex-col items-top justify-center mt-20 mb-100 h-100">
        <Link to="/job-offers" className="btn btn-wide btn-neutral rounded-md">Voir les offres d'emploi</Link>
      </div>
      <div className=' sm:flex-row gap-2 items-center justify-center hidden sm:hidden'>
        <Link to="/sign-in" className="btn btn-active btn-neutral mr-2 rounded-md px-6 sm:hidden">Se connecter</Link>
        <Link to="/sign-up" className="btn btn-active btn-neutral rounded-md px-6 sm:hidden">S'inscrire</Link>
      </div>
    </div>
  );
}