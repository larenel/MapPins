import PropTypes from 'prop-types'
import styles from './CityItem.module.css'
import { Link } from 'react-router-dom'
import { useCities } from '../context/CitiesContext'

const formatDate = (date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))

export default function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities()

  const { cityName, date, emoji, id, position } = city

  const handleClick = (e) => {
    e.preventDefault()
    deleteCity(id)
  }
  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles['cityItem--active'] : ''
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button onClick={handleClick} className={styles.deleteBtn}>
          &times;
        </button>
      </Link>
    </li>
  )
}

CityItem.propTypes = {
  city: PropTypes.object,
}
