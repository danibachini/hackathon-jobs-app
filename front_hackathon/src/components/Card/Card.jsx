import React from 'react'

export default function Card(data) {
    console.log(data.data)
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
            <h2 className="card-title text-slate-400">{data.data.title}</h2>
            <p className="card-title text-slate-400">{data.data.city}</p>
            <p className="card-title text-slate-400">{data.data.description}</p>
        </div>
    </div>
  )
}
