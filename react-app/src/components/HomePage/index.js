import "./Home.css";
import React from "react";
import sunrise_balloon from "../../img/sunrise-balloon.png"
import striped_balloon from "../../img/striped-balloon.png"
import Search from "../SearchBar"


const Home = () => {
  return (
    <div id="homediv">
      <Search />
      <img alt='balloon-stripe' className="striped-balloon" src={striped_balloon} />
      <img alt='balloon-sunrise' className="sunrise-balloon" src={sunrise_balloon} />
    </div>
  );
};

export default Home;
