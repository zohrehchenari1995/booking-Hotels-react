import { useNavigate } from "react-router-dom";
import useUrlLocation from "../../hooks/useUrlLocation";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import ReactCountryFlag from "react-country-flag";
import { usebookmark } from "../context/BookmarkListContext";

const BASE_GEOCODING_URL =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";

function AddNewBookmark() {
  const [lat, lng] = useUrlLocation();
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [isLoadingGeoCoding, setIsLoadingGeoCoading] = useState(false);
  const [geoCodingError, setGeoCodingError] = useState(null);
  const { createBookmark } = usebookmark();

  // for loade component....
  useEffect(() => {
    if (!lat || !lng) return;
    async function fetchLocationData() {
      // setIsLoadingGeocoding true kon ke ba taqire map in true beshe...
      setIsLoadingGeoCoading(true);
      setGeoCodingError(null);
      try {
        const { data } = await axios.get(
          `${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`,
        );
        // if lat and lng ont exist =>not countrycode...
        if (!data.countryCode)
          throw new Error(
            "this location is not city! please click somewhere else!!!",
          );

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setCountryCode(data.countryCode);
      } catch (error) {
        setGeoCodingError(error.message);
      } finally {
        setIsLoadingGeoCoading(false);
      }
    }

    fetchLocationData();
  }, [lat, lng]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cityName || !country) return;

    const newBookmark = {
      cityName,
      country,
      countryCode,
      latitude: lat, 
      longitude: lng,
      host_location: cityName + "" + country,
    };

    await createBookmark(newBookmark);
    navigate("/bookmark");
  };

  if (isLoadingGeoCoding) return <Loader />;
  // if (geoCodingError) return <p>{geoCodingError}</p>;
 
  return (
    <div>
      <h2>Bookmark New Location</h2>
      <form action="" className="form" onSubmit={handleSubmit}>
        <div className="formControl">
          <label htmlFor="cityName">CityName</label>
          <input
            value={cityName}
            onChange={(e) => {
              setCityName(e.target.value);
            }}
            type="text"
            name="cityName"
            id="cityName"
          />
        </div>

        <div className="formControl">
          <label htmlFor="country">Country</label>
          <input
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
            }}
            type="text"
            name="country"
            id="country"
          />
          <ReactCountryFlag className="flag" svg countryCode={countryCode} />
        </div>

        <div className="buttons">
          <button
            className="btn btns--back"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            &larr; Back
          </button>
          <button className="btn btn--primary">Add to Bookmark</button>
        </div>
      </form>
    </div>
  );
}

export default AddNewBookmark;
