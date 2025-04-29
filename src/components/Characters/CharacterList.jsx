"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import CharacterCard from "./CharacterCard"
import "./CharacterList.css"

function CharacterList() {
  const [characters, setCharacters] = useState([])
  const [filteredCharacters, setFilteredCharacters] = useState([])
  const [search, setSearch] = useState(() => localStorage.getItem("search") || "")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [darkMode, setDarkMode] = useState(false)
  const [sMode, setSMode] = useState(false)
  const [hoveredCharacter, setHoveredCharacter] = useState(null)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch("https://api.sampleapis.com/futurama/characters")

        if (!response.ok) {
          throw new Error("Error al obtener los personajes")
        }

        const data = await response.json()
        setCharacters(data)
        setFilteredCharacters(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchCharacters()
  }, [])

  useEffect(() => {

    const savedSearch = localStorage.getItem("search")
    if (savedSearch) {
      setSearch(savedSearch)
    }
  }, []) 

  useEffect(() => {

    if (characters.length > 0) {
      const results = characters.filter((character) => {
        const fullName = `${character.name.first} ${character.name.last}`.toLowerCase()
        const species = character.species ? character.species.toLowerCase() : ""
        const searchLower = search.toLowerCase()
        return fullName.includes(searchLower) || species.includes(searchLower)
      })
      setFilteredCharacters(results)


      if (search) {
        localStorage.setItem("search", search)
      } else {
        localStorage.removeItem("search")
      }
    }
  }, [search, characters])


  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")


    setDarkMode(mediaQuery.matches)
    setSMode(document.body.classList.contains("s-mode"))


    const handleChange = (e) => {
      setDarkMode(e.matches)
      if (e.matches) {
        document.body.classList.add("dark-mode")
      } else {
        document.body.classList.remove("dark-mode")
      }
    }


    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          setDarkMode(document.body.classList.contains("dark-mode"))
          setSMode(document.body.classList.contains("s-mode"))
        }
      })
    })

    observer.observe(document.body, { attributes: true })

    mediaQuery.addEventListener("change", handleChange)


    if (mediaQuery.matches) {
      document.body.classList.add("dark-mode")
    } else {
      document.body.classList.remove("dark-mode")
    }

    return () => {
      mediaQuery.removeEventListener("change", handleChange)
      observer.disconnect()
    }
  }, [])

  if (loading) {
    return (
      <div className={`loading ${darkMode ? "dark-mode" : ""} ${sMode ? "s-mode" : ""}`}>Cargando personajes...</div>
    )
  }

  if (error) {
    return <div className={`error ${darkMode ? "dark-mode" : ""} ${sMode ? "s-mode" : ""}`}>Error: {error}</div>
  }

  return (
    <div className={`character-container ${darkMode ? "dark-mode" : ""} ${sMode ? "s-mode" : ""}`}>
      {/* Top Bar */}
      <div className="top-bar">
        <h1>Personajes de Futurama</h1>
      </div>

      {/* Barra de búsqueda mejorada */}
      <div className="search-container">
        <div className="search-row">
          <div className="search-field" style={{ width: "100%" }}>
            <label htmlFor="search">Buscar personajes:</label>
            <div style={{ display: "flex", gap: "10px" }}>
              <input
                id="search"
                type="text"
                placeholder="Buscar por nombre o especie"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                }}
                className={`search-input ${darkMode ? "dark-mode" : ""} ${sMode ? "s-mode" : ""}`}
              />
              {search && (
                <button
                  onClick={() => {
                    setSearch("")
                    localStorage.removeItem("search")
                  }}
                  className={`clear-search-button ${darkMode ? "dark-mode" : ""} ${sMode ? "s-mode" : ""}`}
                >
                  Limpiar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Grid de personajes */}
      <div className="character-grid">
        {filteredCharacters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            darkMode={darkMode}
            sMode={sMode}
            onHover={setHoveredCharacter}
          />
        ))}
      </div>

      {/* Hover de personaje */}
      {hoveredCharacter && (
        <div
          className={`hover-info ${darkMode ? "dark-mode" : ""} ${sMode ? "s-mode" : ""}`}
          style={{
            position: "fixed",
            top: "80px",
            right: "30px",
            backgroundColor: darkMode ? (sMode ? "#7f1d1d" : "#333") : sMode ? "#fecaca" : "white",
            padding: "1rem",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            zIndex: 2000,
            color: darkMode ? (sMode ? "#fecaca" : "#f0f0f0") : sMode ? "#7f1d1d" : "#333",
          }}
        >
          <h3
            style={{
              color: darkMode ? (sMode ? "#fecaca" : "#ffffff") : sMode ? "#7f1d1d" : "#333",
            }}
          >
            {hoveredCharacter.name.first} {hoveredCharacter.name.last}
          </h3>
          <p>
            <strong
              style={{
                color: darkMode ? (sMode ? "#fecaca" : "#f0f0f0") : sMode ? "#7f1d1d" : "#333",
              }}
            >
              Especie:
            </strong>{" "}
            <span
              style={{
                color: darkMode ? (sMode ? "#fca5a5" : "#ccc") : sMode ? "#b91c1c" : "#666",
              }}
            >
              {hoveredCharacter.species}
            </span>
          </p>
          <p>
            <strong
              style={{
                color: darkMode ? (sMode ? "#fecaca" : "#f0f0f0") : sMode ? "#7f1d1d" : "#333",
              }}
            >
              Ocupación:
            </strong>{" "}
            <span
              style={{
                color: darkMode ? (sMode ? "#fca5a5" : "#ccc") : sMode ? "#b91c1c" : "#666",
              }}
            >
              {hoveredCharacter.occupation}
            </span>
          </p>
        </div>
      )}

      {/* Si no se encuentran personajes */}
      {filteredCharacters.length === 0 && (
        <div className={`no-results ${darkMode ? "dark-mode" : ""} ${sMode ? "s-mode" : ""}`}>
          No se encontraron personajes
        </div>
      )}
    </div>
  )
}

export default CharacterList
