import { useNavigate } from "react-router-dom";
import useUrlLocation from "../../hooks/useUrlLocation";


function AddNewBookmark() {
  const [lat,lng] = useUrlLocation();
  const navigate = useNavigate(); 

  //  info for form: cityname, country, country
  return (
    <div>
      <h2>Bookmark New Location</h2>
      <form action=""  className="form">
        <div className="formControl">
          <label htmlFor="cityName">CityName</label>
            <input type="text"  name="cityName" id="cityName"/>
        </div>

         <div className="formControl">
          <label htmlFor="country">Country</label>
            <input type="text"  name="country" id="country"/>
        </div>

        <div className="buttons">
          <button className="btn btns--back" onClick={(e)=>{
            e.preventDefault();
            navigate(-1)
          }}>&larr; Back</button>
          <button className="btn btn--primary">Add to Bookmark</button>

        </div>
      </form>
    </div>
  )
}

export default AddNewBookmark

