import React from "react";
import { HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import { MdLocationOn } from "react-icons/md";
function Header() {
  return (
    <div className="container-header">
      {/* ALL PART FOR SEARCH(DESTINATION, CALENDER, NUMBER HUMAN AND ROOM, SEARCH BUTTON) */}

      <div className="header__detail">
        <button className="detail__bookmark">bookmark</button>
        <div className="detail__destination">
          <MdLocationOn className="destination__icon" />
          <input type="text" />
        </div>
        <div className="detail__calender">2026/12/2</div>
        <div className="detail__options">
          <span>1 adult &bull; 0 children &bull; 2 room </span>
        </div>
        <div className="detail__serarch">
          <HiSearch />
        </div>
        <button className="detail__login">login</button>
      </div>
    </div>
  );
}

export default Header;
