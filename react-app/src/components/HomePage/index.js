import "./Home.css";
import React from "react";
import sunrise_balloon from "../../img/sunrise-balloon.png"
import striped_balloon from "../../img/striped-balloon.png"
import Search from "../SearchBar"
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div >
      <Search />
      <NavLink to='/map'>Roam free!</NavLink>
      <img className="striped-balloon" src={striped_balloon} />
      <img className="sunrise-balloon" src={sunrise_balloon}/>
    </div>
  );
};

export default Home;
