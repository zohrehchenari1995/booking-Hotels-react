import React, { useState } from "react";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import { MdLocationOn } from "react-icons/md";



function Header() {
  // STATE FOR DESTINATION...............................
  const [destination, setDestination] = useState("");
  // STATE FOR OPENOPTIONS(ADULT & CHILDREN & ROOM)......
  const [openOptins, setOpenOptions] = useState(false);
  //STATE FOR UNDERESTAND TYPE OPTIONS...................
  const [options, setOptions] = useState({
  
  })

  return (
    <div className="container-header">
      {/* ALL PART FOR SEARCH(DESTINATION, CALENDER, NUMBER HUMAN AND ROOM, SEARCH BUTTON) */}

      <div className="header__detail">
        {/* BUTTON FOR BOOKMARK................................ */}
        <button className="detail__bookmark">bookmark</button>

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
          <div className="dateDropDown">2026/2/20</div>
        </div>

        {/* SELECT OPTION FOR FILTER WITH ROOM AND CHILDREN AND ADULT...... */}
        <div className="detail__options">
          {/* event onclick for open and close deropdown */}
          <div id="dropDown" onClick={() => setOpenOptions(!openOptins)}>
            <span>1 adult &bull; 0 children &bull; 2 room </span>
          </div>
          {/* dropdown options jsx and conditional rendering for show dropDown */}
          {openOptins && <Dropdown />}
        </div>

        {/* SEARCH ITEM.......................................... */}
        <div className="detail__serarch">
          <button className="search__button">
            <HiSearch className="search__icon" />
          </button>
        </div>

        {/* LOGIN FOREM.......................................... */}
        {/* <button className="detail__login">login</button> */}
      </div>
    </div>
  );
}

export default Header;

// COMPONENTS FOR PART DROPDOWN (ADULT,CHILDREN,ROOM........)
function Dropdown() {
  return (
    <div className="dropDown__options">
      <DetailOptions/>
      <DetailOptions/>
      <DetailOptions/>

    </div>
  );
}


// COMPONENT FOR PART DROPDOWN ...FOR NOT REPEATE ALL OPTIONS....
function DetailOptions(){
  return(
      <div className="options__adult">
        <span className="options__title">Adult</span>
        <div className="options__controlls">
          <button>
            <HiMinus className="options__icon" />
          </button>
          <span className="options__number">1</span>
          <button>
            <HiPlus className="options__icon" />
          </button>
        </div>
      </div>
  )
}