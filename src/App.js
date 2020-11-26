import './App.css';
import "./bootstrap-4.3.1-dist/css/bootstrap.min.css";
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import Button from 'react-bootstrap/Button';
import { FilteredList } from './FilteredList.js';
import applePic from "./assets/apple.jpeg";
import bananaPic from "./assets/banana.jpg";
import lettucePic from "./assets/lettuce.jpg"
import beansPic from "./assets/beans.jpg"
import noodlesPic from "./assets/noodles.jpg"
import ricePic from "./assets/rice.jpg"
import caviarPic from "./assets/caviar.jpg"
import breadPic from "./assets/bread.jpg"
import milkPic from "./assets/milk.jpeg"
import sardinesPic from "./assets/sardines.jpg"
import ramenPic from "./assets/ramen.jpeg"
import carrotPic from "./assets/carrot.jpg";

function App() {
    // List of products that we will be working with 
    const produceList = [
        { name: "Apple", shelf_life: "Short", type: "Fruit", price: 2, image: applePic },
        { name: "Banana", shelf_life: "Short", type: "Fruit", price: 1, image: bananaPic },
        { name: "Lettuce", shelf_life: "Short", type: "Vegetable", price: 3, image: lettucePic },
        { name: "Beans", shelf_life: "Long", type: "Nonperishable", price: 4, image: beansPic },
        { name: "Noodles", shelf_life: "Medium", type: "Nonperishable", price: .5, image: noodlesPic },
        { name: "Rice", shelf_life: "Short", type: "Nonperishable", price: 15, image: ricePic },
        { name: "Caviar", shelf_life: "Medium", type: "Other", price: 100, image: caviarPic },
        { name: "Bread", shelf_life: "Medium", type: "Other", price: 6, image: breadPic },
        { name: "Milk", shelf_life: "Short", type: "Other", price: 3, image: milkPic },
        { name: "Sardines", shelf_life: "Medium", type: "Other", price: 10, image: sardinesPic },
        { name: "Ramen", shelf_life: "Long", type: "Nonperishable", price: 1, image: ramenPic },
        { name: "Carrot", shelf_life: "Short", type: "Vegetable", price: 2, image: carrotPic },
    ]
    return (
        // Introductory Title
        <div className="container">
            <div className="row">
                <div className="col-12 text-center">
                    <h1> Welcome to the Grocery Store!</h1>
                    <p> Scroll down to the bottom of the page to see your shopping cart as you add items!</p>
                </div>
            </div>
            <FilteredList produceList={produceList} />
        </div>
    );
}

export default App;
