import {useEffect, useState} from 'react'

export interface IGeolocation {
  lat: number,
  lon: number
}

export default function useGeolocation(): IGeolocation | null {
  const [location, setLocation] = useState<IGeolocation | null>(null)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error)
    }

    function success(position: GeolocationPosition) {
      setLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude
      })
    }

    function error(error: GeolocationPositionError | any) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.log("User denied the request for Geolocation.")
          break;
        case error.POSITION_UNAVAILABLE:
          console.log("Location information is unavailable.")
          break;
        case error.TIMEOUT:
          console.log("The request to get user location timed out.")
          break;
        case error.UNKNOWN_ERROR:
          console.log("An unknown error occurred.")
          break;
      }
    }
  }, [])

  return location
}