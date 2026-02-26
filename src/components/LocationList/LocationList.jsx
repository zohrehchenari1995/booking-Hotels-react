import React from "react";
import useFetch from "../../hooks/useFetch";

function LocationList() {
  // get date for add loop.....
  const { data, isLoading } = useFetch("http://localhost:5000/hotels","");
  console.log(Array.isArray(data));
  //isloading for show spinner to user befor show data(conditional rendering).........
  if (isLoading) return <p>Loading</p>;

  return (
    <div className="all-content container-header">
      {/* TITLE FOR LOACTIONS */}
      <h2 className="locations__title">Nearby Locations</h2>
      {/* loop on data get as api for show image hotels and details...... */}
      <div className="locations__content"  >
      {data.map((item) => {
        return (
            <div className="content__items items__one"  key={item.id}>
              <img src={item.picture_url.url} alt={item.name}/>
              <div className="content__items-detail">
                <p className="items__location">{item.smart_location}</p>
                <p className="items__name">{item.name}</p>
                <p className="items__price">€{item.price}&nbsp;
                  <span className="price__detail">night</span>
                </p>
              </div>
            </div>
          
        );
      })}
      </div>

   
    </div>
  );
}

export default LocationList;
