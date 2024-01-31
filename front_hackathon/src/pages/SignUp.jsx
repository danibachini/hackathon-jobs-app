import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

export default function SignUp() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    profil: '',
    email: '',
    motDePasse: '',
  });

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
  };

  return (
    <div class = "min-h-screen">
      <form className="form-control flex flex-col w-2/3 mt-20 ml-60" onSubmit={handleSubmit}>
        <label className="label-text">Nom</label>
        <input
          type="text"
          placeholder="Entrez votre nom"
          className="input input-bordered mb-2"
          name="nom"
          value={formData.nom}
          onChange={handleInputChange}
        />

        <label className="label-text">Prénom</label>
        <input
          type="text"
          placeholder="Entrez votre prénom"
          className="input input-bordered mb-2"
          name="prenom"
          value={formData.prenom}
          onChange={handleInputChange}
        />

        <label className="label-text">Profil</label>
        <select
          className="select select-bordered w-full max-w-xs mb-2"
          name="profil"
          value={formData.profil}
          onChange={handleInputChange}
        >
          <option disabled>Choisissez un profil</option>
          <option>Han Solo</option>
          <option>Greedo</option>
        </select>

        <label className="label-text">Email</label>
        <input
          type="text"
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
          name="motDePasse"
          value={formData.motDePasse}
          onChange={handleInputChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
