"use client"

import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./components/Login/Login"
import Layout from "./components/Layout/Layout"
import CharacterList from "./components/Characters/CharacterList"
import ContactForm from "./components/Form/ContactForm"
import "./App.css"
import CharacterDetail from "./components/Characters/CharacterDetail"
import About from "./components/About/About"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Verificar si hay un usuario guardado en localStorage al cargar la aplicación
  useEffect(() => {
    const username = localStorage.getItem("username")
    if (username) {
      setIsLoggedIn(true)
    }
    setIsLoading(false)
  }, [])

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  // Mostrar un estado de carga mientras verificamos la autenticación
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando...</p>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        {!isLoggedIn ? (
          <Route path="/" element={<Login onLogin={handleLogin} />} />
        ) : (
          <>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/characters" replace />} />
              <Route path="characters" element={<CharacterList />} />
              <Route path="form" element={<ContactForm />} />
              <Route path="characters/:id" element={<CharacterDetail />} />
              <Route path="about" element={<About />} />
            </Route>
          </>
        )}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
