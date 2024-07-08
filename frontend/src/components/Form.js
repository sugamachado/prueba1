import React, { useState } from 'react';

const Form = () => {
  const [formData, setFormData] = useState({
    din: '',
    nombre: '',
    primerApellido: '',
    segundoApellido: '',
    naf: '',
    contrato: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="din" value={formData.din} onChange={handleChange} placeholder="DIN" />
      <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" />
      <input type="text" name="primerApellido" value={formData.primerApellido} onChange={handleChange} placeholder="Primer Apellido" />
      <input type="text" name="segundoApellido" value={formData.segundoApellido} onChange={handleChange} placeholder="Segundo Apellido" />
      <input type="text" name="naf" value={formData.naf} onChange={handleChange} placeholder="NAF" />
      <input type="text" name="contrato" value={formData.contrato} onChange={handleChange} placeholder="Contrato" />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default Form;
