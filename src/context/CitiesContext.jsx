import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react'

const CitiesContext = createContext()

const reducer = (state, action) => {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true }
    case 'cities/loaded':
      return { ...state, isLoading: false, cities: action.payload }
    case 'city/loaded':
      return { ...state, isLoading: false, currentCity: action.payload }
    case 'city/created':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      }
    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((el) => el.id !== action.payload),
        currentCity: {},
      }
    case 'rejected':
      return { ...state, error: action.payload, isLoading: false }

    default:
      throw new Error('Unknown action type')
  }
}

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: '',
}

const CitiesProvider = ({ children }) => {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  )

  useEffect(() => {
    const fetchCities = async () => {
      dispatch({ type: 'loading' })

      try {
        const res = await fetch('http://localhost:8000/cities')
        const data = await res.json()
        dispatch({ type: 'cities/loaded', payload: data })
      } catch {
        dispatch({ type: 'rejected', payload: 'Error while loading data' })
      }
    }
    fetchCities()
  }, [])

  const getCity = useCallback(
    async (id) => {
      if (+id === +currentCity.id) return

      dispatch({ type: 'loading' })
      try {
        const res = await fetch(`http://localhost:8000/cities/${id}`)
        const data = await res.json()
        dispatch({ type: 'city/loaded', payload: data })
      } catch {
        dispatch({ type: 'rejected', payload: 'Error while getting city' })
      }
    },
    [currentCity.id]
  )

  const createCity = async (newCity) => {
    dispatch({ type: 'loading' })

    try {
      const res = await fetch(`http://localhost:8000/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()

      dispatch({ type: 'city/created', payload: data })
    } catch {
      dispatch({ type: 'rejected', payload: 'Error while creating city' })
    }
  }
  const deleteCity = async (id) => {
    dispatch({ type: 'loading' })

    try {
      await fetch(`http://localhost:8000/cities/${id}`, {
        method: 'DELETE',
      })

      dispatch({ type: 'city/deleted', payload: id })
    } catch {
      dispatch({ type: 'rejected', payload: 'Error deleting city' })
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
        error,
      }}
    >
      {children}
    </CitiesContext.Provider>
  )
}

function useCities() {
  const context = useContext(CitiesContext)
  if (context === 'undefined')
    throw new Error('cities context was  used outside of cities provider')
  return context
}

export { CitiesProvider, useCities }
