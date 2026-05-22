import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from "react-leaflet";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useGeoLocation from "../../hooks/useGeoLocation";

function Map({markerLocation}) {

  // STATE GET LAT & LNG FOR FET MAPCENTER ....
  const [mapCenter, setMapCenter] = useState([20, 3]);
  // STATE FOR GET LAT & LNG IN URL (CHANGE ROUTE(MAP) HOTELS TO SINGLE HOTELS AND SINGLE HOTELS TO HOTELS)=>for show center pin on map
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = Number(searchParams.get("lat"));
  const lng = Number(searchParams.get("lng"));

  // CALL CUSTOM HOOK FOR GEOLOCATION...
  const{isLoading, position: geoLocationPosition, getPosition} = useGeoLocation();

  // USEeFFECT FOR SYNC LAT & LNG WITH COMPONENT....
  useEffect(() => {
    if (lat && lng) setMapCenter([lat, lng]);
  }, [lat, lng]);


  //SET USEEFFECT FOR CHANGE MAPCENTER BY USE YOUR LOCATION BUTTON....
  useEffect(()=>{
    if(geoLocationPosition?.lat && geoLocationPosition?.lng)
      setMapCenter([geoLocationPosition.lat, geoLocationPosition.lng])
  },[geoLocationPosition])


  return (
    <div className="hotels__map">
      <MapContainer
        className="map"
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={true}
      >

        {/* CREATE BUTTON FOR ACCESS TO USER LOCATION.... */}
        <button  onClick={getPosition} className="geoLocation">
          {isLoading ? "Loading" : "USE YOUR LOCATION"}
        </button>

        {/* FOR UPDATE CENTERT MARKER... */}
        <ChangeCenter position={mapCenter} />
        {/* FOR UNDERSTAND USER CLICK OR NOT CLICK ON MAP?... */}
        <DetectClick/>

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {markerLocation.map((item) => (
          <Marker key={item.id} position={[item.latitude, item.longitude]}>
            <Popup>{item.host_location}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;

// CUSTOMHOOKS FOR UPDATE MAPCENTER(LAT & LNG)
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}


// CREATE FUNCTION FOR UNDERSTAND SUER CLICK ON MAP OR NO?....
function DetectClick(){
  const navigate = useNavigate();

  // useMapEvent hook for understand user click on map
  useMapEvent({
    click:e=> navigate(`/bookmark? lat=${e.latlng.lat} & lng=${e.latlng.lng}`)
  });
  return null;
}