import Spinner from './Spinner'
import Message from './Message'
import styles from './CountryList.module.css'
import CountryItem from './CountryItem'
import { useCities } from '../context/CitiesContext'
function CountriesList() {
  const { cities, isLoading } = useCities()

  if (isLoading) return <Spinner />

  if (!cities.length) return <Message message="add your firs country!" />

  const countries = cities.reduce((acc, obj) => {
    if (!acc.map((el) => el.country).includes(obj.country))
      return [...acc, { country: obj.country, emoji: obj.emoji }]
    else return acc
  }, [])
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  )
}

export default CountriesList
