import { createContext, useContext, useEffect, useState } from 'react'

const CitiesContext = createContext()

const CitiesProvider = ({ children }) => {
  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentCity, setCurrentCity] = useState({})

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsLoading(true)
        const res = await fetch('http://localhost:8000/cities')
        const data = await res.json()
        setCities(data)
      } catch {
        alert('error while fetching cities')
      } finally {
        setIsLoading(false)
      }
    }
    fetchCities()
  }, [])

  const getCity = async (id) => {
    try {
      setIsLoading(true)
      const res = await fetch(`http://localhost:8000/cities/${id}`)
      const data = await res.json()
      setCurrentCity(data)
    } catch {
      alert('error while fetching city')
    } finally {
      setIsLoading(false)
    }
  }

  const createCity = async (newCity) => {
    try {
      setIsLoading(true)
      const res = await fetch(`http://localhost:8000/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()

      setCities((prev) => [...prev, data])
    } catch {
      alert('error creating new city')
    } finally {
      setIsLoading(false)
    }
  }
  const deleteCity = async (id) => {
    try {
      setIsLoading(true)
      await fetch(`http://localhost:8000/cities/${id}`, {
        method: 'DELETE',
      })

      setCities((prev) => prev.filter((el) => el.id !== id))
    } catch {
      alert('error  deleting city')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  )
}

const useCities = () => {
  const context = useContext(CitiesContext)
  if (context === 'undefined')
    throw new Error('cities context was  used outside of cities provider')
  return context
}

export { CitiesProvider, useCities }
