import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    //API shold be called after service worker initialize. Timeout is used as a workaround.
    setTimeout(
      () =>
        fetch(
          "https://wcjqdv8wuh.execute-api.ap-south-1.amazonaws.com/dev/nodejs-lambda"
        )
          .then((res) => res.json())
          .then((res) => setMenu(res.menus)),
      1000
    );
  }, []);
  console.log("menu", menu);
  return (
    <div className="content">
      <h1>Menu</h1>
      {menu.map((food) => (
        <Card name={food.name} img={food.img} />
      ))}
    </div>
  );
}
const Card = ({ name, img }) => {
  return (
    <div key={name} className="card">
      <img src={img} className="food-img" />
      <div className="food-name">{name}</div>
    </div>
  );
};

export default App;
