import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { baseUrl } from '../config'

export default function Login() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    password: "",
    email: "",
  })

  function handleChange(e) {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const { data } = await axios.post(`${baseUrl}/login`, formData)
      localStorage.setItem('token', data.token)
      console.log(data.token)
      navigate('/shoes')
      alert("Login successful")
    } catch (err) {
      console.log(err.response.data)
      alert("Login error")
    }
  }

  return <div className="section">
    <h1 className="title has-text-centered">Login</h1>
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name={'email'}
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              className="input"
              type="password"
              name={'password'}
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </div>
        <button className="button">Submit</button>
      </form>
    </div>
  </div>
}