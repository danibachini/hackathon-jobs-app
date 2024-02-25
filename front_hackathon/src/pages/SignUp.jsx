import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../hooks/useAuth"

export default function SignUp() {
  const [formData, setFormData] = useState({
    lastname: '',
    firstname: '',
    role: 'candidate',
    email: '',
    password: '',
  });

  const {register} = useAuth()
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    register(formData)
    navigate("/signin")
  };

  return (
    <div className = "min-h-screen">
      <form className="form-control flex flex-col w-2/3 mt-20 ml-60" onSubmit={handleSubmit}>
        <label className="label-text">Nom</label>
        <input
          type="text"
          placeholder="Entrez votre nom"
          className="input input-bordered mb-2"
          name="lastname"
          value={formData.lastname}
          onChange={handleInputChange}
        />

        <label className="label-text">Prénom</label>
        <input
          type="text"
          placeholder="Entrez votre prénom"
          className="input input-bordered mb-2"
          name="firstname"
          value={formData.firstname}
          onChange={handleInputChange}
        />

        <label className="label-text">Profil</label>
        <select
          className="select select-bordered w-full max-w-xs mb-2"
          name="role"
          value={formData.role}
          onChange={handleInputChange}
        >
          <option>Choisissez un profil</option>
          <option value="candidate">Candidat</option>
          <option value="recruiter">Recruteur</option>
        </select>

        <label className="label-text">Email</label>
        <input
          type="email"
          placeholder="Entrez votre email"
          className="input input-bordered mb-2"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />

        <label className="label-text">Mot de passe</label>
        <input
          type="password"
          placeholder="Entrez votre mot de passe"
          className="input input-bordered mb-2"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />

        <button type="submit" className='mt-4 btn bg-base-100 rounded-sm'>Submit</button>
      </form>
    </div>
  );
}
