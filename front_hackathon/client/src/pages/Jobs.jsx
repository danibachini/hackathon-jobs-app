import React, {useState} from 'react'
import Card from '../components/Card/card'

export default function Jobs() {

  const [jobOffers, setJobOffers] = useState([
    {
        id: 1,
        city: "Rennes",
        title: "Developpeur Front-end React",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        id: 2,
        city: "Rennes",
        title: "Developpeur Front-end React",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        id: 3,
        city: "Rennes",
        title: "Developpeur Front-end React",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        id: 4,
        city: "Rennes",
        title: "Developpeur Front-end React",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        id: 5,
        city: "Rennes",
        title: "Developpeur Front-end React",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        id: 6,
        city: "Rennes",
        title: "Developpeur Front-end React",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
  ])

  const [searchField, setSearchField] = useState()
  const [locationFiled, setLocationField] = useState()


  
  const handleSubmit = (event) =>{
    event.preventDefault()
    console.log({
      searchField,
      locationFiled
    })
  }

  return (
    <>
      <h1>Les Offres d'emplois</h1>
      <form className='flex flex-col' onSubmit={handleSubmit}>
        <div className='my-4'>
          <input type="text" 
            placeholder="métiers, mots clés" 
            className="input input-bordered w-full max-w-xs" 
            onChange={(e) => setSearchField(e.target.value)} 
          />
        </div>
        <div>
          <input type="text" 
            placeholder="Ville" 
            className="input input-bordered w-full max-w-xs" 
            onChange={(e) => setLocationField(e.target.value)}
          />
        </div>
        <input type="submit" value="Rechercher" />
      </form>
      <div className='flex flex-col gap-4'>
        {jobOffers? jobOffers.map((data) => <Card data={data} key={data.id}/>) : null}
      </div>
    </>
  )
  }
  