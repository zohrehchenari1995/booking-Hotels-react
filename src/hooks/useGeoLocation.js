import { useState } from "react";

function useGeoLocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);

  // FOR USE CUSTOM HOOKS USEGEOlOCATION...
  function getPosition() {
    // set if for access to geolocation...
    if (!navigator.geolocation)
      return "your browser does not support geolocation";

    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      // success callback(position user)...
      (position) => {
        setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsLoading(false);
      },

      // error callback
      (error) => {
        setError(error.message);
        setIsLoading(false);
      },
    );
  }

  return {isLoading, position, error, getPosition}
}

export default useGeoLocation;
