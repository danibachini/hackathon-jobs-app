import React, {useState} from 'react'

export default function SignIn() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log({
      username: username,
      password: password
    })
  }

  return (
    <div className='flex flex-col justify-top mt-20 items-center min-h-screen'>
        <h1 className='font-bold'>Se Connecter</h1>
        <form className='bg-neutral flex flex-col gap-4 rounded-sm p-10' onSubmit={handleSubmit}>
            <label className="form-control w-full max-w-xs">
                Login
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={(e) => setUsername(e.target.value)}/>
            </label>
            <label className="form-control w-full max-w-xs">
                Password
                <input type="password" placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={(e) => setPassword(e.target.value)} />
            </label>
            <input type="submit" value="Connecter" className='mt-4 btn bg-slate-300 rounded-sm'/>
        </form>
    </div>
  )
}
