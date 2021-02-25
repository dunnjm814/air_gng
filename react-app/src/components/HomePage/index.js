import "./Home.css";
import React from "react";
import sunrise_balloon from "../../img/sunrise-balloon.png"
import striped_balloon from "../../img/striped-balloon.png"


const Home = () => {
  return (
    <div >
      <img className="striped-balloon" src={striped_balloon} />
      <img className="sunrise-balloon" src={sunrise_balloon}/>
    </div>
  );
};

export default Home;
