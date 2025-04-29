"use client"

import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import "./CharacterDetail.css"

function CharacterDetail() {
  const { id } = useParams()
  const [character, setCharacter] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [sMode, setSMode] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {

    const isDarkMode = document.body.classList.contains("dark-mode")
    const isSMode = document.body.classList.contains("s-mode")
    setDarkMode(isDarkMode)
    setSMode(isSMode)


    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          setDarkMode(document.body.classList.contains("dark-mode"))
          setSMode(document.body.classList.contains("s-mode"))
        }
      })
    })

    observer.observe(document.body, { attributes: true })

    // Cleanup
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(`https://api.sampleapis.com/futurama/characters`)
        const data = await response.json()
        const selected = data.find((char) => String(char.id) === id)
        if (!selected) {
          setError("Personaje no encontrado")
        } else {
          setCharacter(selected)
        }
        setLoading(false)
      } catch (err) {
        setError("Error al cargar el personaje")
        setLoading(false)
      }
    }
    fetchCharacter()
  }, [id])

  if (loading)
    return (
      <div className={`loading ${darkMode ? "dark-mode" : ""} ${sMode ? "s-mode" : ""}`}>Cargando personaje...</div>
    )
  if (error) return <div className={`error ${darkMode ? "dark-mode" : ""} ${sMode ? "s-mode" : ""}`}>{error}</div>

  return (
    <div className={`character-detail ${darkMode ? "dark-mode" : ""} ${sMode ? "s-mode" : ""}`}>
      <h1>
        {character.name.first} {character.name.last}
      </h1>
      <button onClick={() => navigate("/characters")} className="back-button">
        ← Volver a la lista
      </button>
      <div className="character-detail-content">
        <img
          src={character.images.main || "/placeholder.svg"}
          alt={`${character.name.first} ${character.name.last}`}
          className="character-detail-image"
        />
        <div className="character-detail-info">
          <p>
            <strong>Especie:</strong> {character.species}
          </p>
          <p>
            <strong>Ocupación:</strong> {character.occupation}
          </p>
          <p>
            <strong>Género:</strong> {character.gender}
          </p>
          {character.sayings && character.sayings.length > 0 && (
            <div className="character-sayings">
              <h3>Frases célebres:</h3>
              <p className="quote">"{character.sayings[Math.floor(Math.random() * character.sayings.length)]}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CharacterDetail
