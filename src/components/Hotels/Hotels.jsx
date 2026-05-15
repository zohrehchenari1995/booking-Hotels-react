
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useHotels } from "../context/HotelsProvider";



function Hotels() {


 const {hotels, isLoader} = useHotels();

  if (isLoader) return <Loader />;

  return (
    // JSX FOR HOTELS........
    <div>
      <h2 className="search__title">Search Resault ({hotels.length})</h2>

      {hotels ?.map((item) => {
        return (
          <Link
            key={item.id}
          
            to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
           
           
          >
            <div className="hotels__item item__one">
              <img src={item.picture_url.url} alt={item.name} />

              <div className="hotels__description">
                <p className="hotels__location">{item.smart_location}</p>
                <p className="hotels__name">{item.name}</p>
                <p className="hotels__price">
                  €{item.price}&nbsp;
                  <span className="price__detail">night</span>
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Hotels;
