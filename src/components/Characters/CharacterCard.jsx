"use client"
import { useNavigate } from "react-router-dom"

function CharacterCard({ character, darkMode, sMode, onHover }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/characters/${character.id}`)
  }

  const handleMouseEnter = () => {
    onHover(character)
  }

  const handleMouseLeave = () => {
    onHover(null)
  }

  return (
    <div
      className={`character-card ${darkMode ? "dark-mode" : ""} ${sMode ? "s-mode" : ""}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="character-image">
        <img
          src={character.images?.main || "https://i.postimg.cc/vT0VjbHq/avatar-default.png"}
          alt={`${character.name.first} ${character.name.last}`}
          onError={(e) => {
            e.target.src = "https://i.postimg.cc/vT0VjbHq/avatar-default.png"
          }}
        />
      </div>
      <div className="character-info">
        <h2>
          {character.name.first} {character.name.last}
        </h2>
        {character.species && (
          <p>
            <strong>Especie:</strong> {character.species}
          </p>
        )}
        {character.occupation && (
          <p>
            <strong>Ocupación:</strong> {character.occupation}
          </p>
        )}
      </div>
    </div>
  )
}

export default CharacterCard
