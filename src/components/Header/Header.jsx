import React, { use, useRef, useState } from "react";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import { MdLocationOn } from "react-icons/md";
import useOutsideClick from "../../hooks/useOutsideClick";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";

function Header() {
  // STATE FOR DESTINATION...............................
  const [destination, setDestination] = useState("");
  // STATE FOR OPENOPTIONS(ADULT & CHILDREN & ROOM)......
  const [openOptins, setOpenOptions] = useState(false);
  //STATE FOR UNDERESTAND TYPE OPTIONS...................
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  // STATE FOR CALENDER RANGE...........................
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  // STATE FOR SHOW OR HIDDE STATUS CALENDER............
  const [openDate, setOpenDate] = useState(false);
  // STATE FOR NAVIGATE TO HOTELS(for redirect from home page to hotels page after click on search button..........)
  const navigate = useNavigate(); 
  // STATE SEARCHPARAMS FOR SHOW CHANGE DATE OBJECT AND OPTIONS OBJECT.....
  const[searchparams, setSearchParams] = useSearchParams();

  // EVENTHANDLE FOR OPTIND MINUS $ PLUS FOR DETAILoPTIONS COMPONENT......
  const handleOptions = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "inc" ? prev[name] + 1 : prev[name] - 1,
      };
    });
  };

  // EVENTHANDLER FOR SEARCH BUTTON and update with hook useNavigate....................
  const handleSearch = ()=>{
   const encodedParams= createSearchParams({
      date:JSON.stringify(date),
      destination,
      options:JSON.stringify(options),
    });
      navigate({
        pathname:"/hotels",
        // query string.....
        search:encodedParams.toString(),
      });
  }

  return (
    <div className="container-header">
      {/* ALL PART FOR SEARCH(DESTINATION, CALENDER, NUMBER HUMAN AND ROOM, SEARCH BUTTON) */}

      <div className="header__detail">
      <button className="detail__bookmark">bookmark</button>
        {/* BUTTON FOR BOOKMARK................................ */}

        {/* INPUT FOR DESTINATION............................... */}
        <div className="detail__destination">
          <MdLocationOn className="destination__icon" />
          <input
            value={destination}
            type="text"
            placeholder="where to go?"
            name="destination"
            id="destination"
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>

        {/* CALENDER(date picker)............................................ */}
        <div className="detail__calender">
          <HiCalendar className="calender__icon" />
          <div className="dateDropdown" onClick={() => setOpenDate(!openDate)}>
            {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyy")}`}
          </div>
          {openDate && (
            <DateRange
              ranges={date}
              className="date"
              onChange={(item) => setDate([item.selection])}
              minDate={new Date()}
              moveRangeFirstSelection={true}
            />
          )}
        </div>

        {/* SELECT OPTION FOR FILTER WITH ROOM AND CHILDREN AND ADULT...... */}
        <div className="detail__options">
          {/* event onclick for open and close deropdown */}
          <div id="dropDown" onClick={() => setOpenOptions(!openOptins)}>
            <span id="dropDown">
              {options.adult} adult &bull; {options.children} children &bull;{" "}
              {options.room} room{" "}
            </span>
          </div>
          {/* dropdown options jsx and conditional rendering for show dropDown */}
          {openOptins && (
            <Dropdown
              options={options}
              handleOptions={handleOptions}
              setOpenOptions={setOpenOptions}
            />
          )}
        </div>

        {/* SEARCH ITEM.......................................... */}
        <div className="detail__serarch"  onClick={handleSearch}>
          <button className="search__button"  >
            <HiSearch className="search__icon" />
          </button>
        </div>

        {/* LOGIN FOREM.......................................... */}
        <button className="detail__login">login</button>
      </div>
    </div>
  );
}

export default Header;

// COMPONENTS FOR PART DROPDOWN (ADULT,CHILDREN,ROOM........)
function Dropdown({ options, handleOptions, setOpenOptions }) {
  const optionsRef = useRef();
  useOutsideClick(optionsRef, "dropDown", () => setOpenOptions(false));
  return (
    <div className="dropDown__options" ref={optionsRef}>
      <DetailOptions
        type="adult"
        options={options}
        minLimit={1}
        handleOptions={handleOptions}
      />
      <DetailOptions
        type="children"
        options={options}
        minLimit={0}
        handleOptions={handleOptions}
      />
      <DetailOptions
        type="room"
        options={options}
        minLimit={1}
        handleOptions={handleOptions}
      />
    </div>
  );
}

// COMPONENT FOR PART DROPDOWN ...FOR NOT REPEATE ALL OPTIONS....
function DetailOptions({ options, type, minLimit, handleOptions }) {
  return (
    <div className="options__adult">
      <span className="options__title">{type}</span>
      <div className="options__controlls">
        <button
          disabled={options[type] <= minLimit}
          onClick={() => handleOptions(type, "dec")}
        >
          <HiMinus className="options__icon" />
        </button>
        <span className="options__number">{options[type]}</span>
        <button onClick={() => handleOptions(type, "inc")}>
          <HiPlus className="options__icon" />
        </button>
      </div>
    </div>
  );
}
