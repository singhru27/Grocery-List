import React from 'react';
import "./bootstrap-4.3.1-dist/css/bootstrap.min.css";
import Nav from 'react-bootstrap/Nav'
import { DisplayList } from "./DisplayList.js";
import { AggregateList } from "./AggregateList.js";

export class FilteredList extends React.Component {
    constructor(props) {
        super(props);
        // State variable contains information on the filtering/sort settings, 
        // the total list of items that is available for sale, and an object
        // which houses the items being aggregated
        this.state = {
            shelf_life: 'All',
            type: "All",
            sortOrder: "Descending",
            displayedItems: this.props.produceList,
            aggregatedItems: {
            }
        };
        // Binding the functions with the "this" keyword
        this.onSelectFilterShelfLife = this.onSelectFilterShelfLife.bind(this);
        this.onSelectType = this.onSelectType.bind(this);
        this.filterMatchingItems = this.filterMatchingItems.bind(this);
        this.priceBasedSort = this.priceBasedSort.bind(this);
        this.onSortSelect = this.onSortSelect.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
    }
    // Function used to filter items. If the elements match the shelf life and 
    // type attributes, then we return true. If they do not match the desired 
    // attributes, we return false
    filterMatchingItems(item) {
        if (this.state.shelf_life === 'All' && this.state.type === 'All') {
            return true;
        } else if (this.state.shelf_life === 'All' && this.state.type === item.type) {
            return true;
        } else if (this.state.shelf_life === item.shelf_life && this.state.type === "All") {
            return true;
        } else if (this.state.shelf_life === item.shelf_life && this.state.type === item.type) {
            return true;
        } else {
            return false;
        }

    }
    // Function used to set the shelf_life filter
    onSelectFilterShelfLife(event) {
        this.setState(
            {
                shelf_life: event
            }
        )
    }
    // Function used to set the type filter
    onSelectType(event) {
        this.setState(
            {
                type: event
            }
        )
    }
    // Function used to set the sorting order
    onSortSelect(event) {
        this.setState(
            {
                sortOrder: event
            }
        )
    }
    // Function used to sort the items. If descending, we use a b - a 
    // comparator. If ascending, we use an a - b comparator
    priceBasedSort(a, b) {
        if (this.state.sortOrder === "Descending") {
            return (
                b.price - a.price
            );
        } else {
            return (
                a.price - b.price
            );
        }
    }

    // Function called when "Add to Cart" is pressed. This function increments the number in the cart for each item
    addToCart(item) {
        const nameKey = item.name;
        // If the item that is being added to the cart is already in the cart,
        // we increment the numInCart variable to show that an additional unit
        // is being added
        if (nameKey in this.state.aggregatedItems) {
            let currAggregatedItems = this.state.aggregatedItems;
            let currPrice = currAggregatedItems[nameKey].price;
            let currNumInCart = currAggregatedItems[nameKey].numInCart;
            let currImage = currAggregatedItems[nameKey].image;
            let currShelfLife = currAggregatedItems[nameKey].shelf_life;
            let currType = currAggregatedItems[nameKey].type;

            currAggregatedItems[nameKey] = {
                numInCart: currNumInCart + 1,
                price: currPrice,
                image: currImage,
                type: currType,
                shelf_life: currShelfLife
            };
            this.setState({
                aggregatedItems: currAggregatedItems
            })
            // If it is not already in the cart, we need to add this key-value pair to the 
            // aggregatedItems state variable. We do so using the setState function
        } else {
            let currAggregatedItems = this.state.aggregatedItems;
            currAggregatedItems[nameKey] = {
                numInCart: 1,
                price: item.price,
                image: item.image,
                shelf_life: item.shelf_life,
                type: item.type

            }
            this.setState({
                aggregatedItems: currAggregatedItems
            })
        }
    }

    // Function called when the "Remove from Cart is pressed". This function decrements the number in the cart for each item
    removeFromCart(item) {
        const nameKey = item.name;
        // If the item is actually in the cart, we decrement the "numInCart" variable to represent
        // the fact that one fewer item is now in the cart
        if (nameKey in this.state.aggregatedItems) {
            let currAggregatedItems = this.state.aggregatedItems;
            let currPrice = currAggregatedItems[nameKey].price;
            let currNumInCart = currAggregatedItems[nameKey].numInCart;
            let currImage = currAggregatedItems[nameKey].image;
            let currShelfLife = currAggregatedItems[nameKey].shelf_life;
            let currType = currAggregatedItems[nameKey].type;

            currAggregatedItems[nameKey] = {
                numInCart: currNumInCart - 1,
                price: currPrice,
                image: currImage,
                type: currType,
                shelf_life: currShelfLife
            };
            // Removing the entire item from the aggregated item list if the number in cart reaches 0
            if (currNumInCart - 1 === 0) {
                delete currAggregatedItems[nameKey];
            }
            this.setState({
                aggregatedItems: currAggregatedItems
            })
            // If the "Remove From Cart" button was pressed on an item that wasn't even in the cart in the
            // first place, then we ignore the command and simply return
        } else {
            return;
        }
    }

    render() {
        return (
            // Top level navigation bar is used for sorting and filtering selections. The nav items are given the
            // appropriate state setting callback functions to set the sort and filter attributes in the state, which
            // govern how the items are displayed on the home page
            <div>
                <div className='row'>
                    <Nav.Item>
                        <Nav.Link eventKey="disabled" disabled>Shelf Life</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="All" onSelect={this.onSelectFilterShelfLife}>All</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="Short" onSelect={this.onSelectFilterShelfLife}>Short</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="Medium" onSelect={this.onSelectFilterShelfLife}>Medium</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="Long" onSelect={this.onSelectFilterShelfLife}>Long</Nav.Link>
                    </Nav.Item>
                </div>
                <div className='row'>
                    <div className="col-12">

                        <p> Your Currently Selected Shelf Life Is: {this.state.shelf_life}</p>
                    </div>
                </div>
                <div className='row'>
                    <Nav.Item>
                        <Nav.Link eventKey="disabled" disabled>Food Category</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="All" onSelect={this.onSelectType}>All</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="Fruit" onSelect={this.onSelectType}>Fruit</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="Vegetable" onSelect={this.onSelectType}>Vegetable</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="Nonperishable" onSelect={this.onSelectType}>Nonperishable</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="Other" onSelect={this.onSelectType}>Other</Nav.Link>
                    </Nav.Item>
                </div>
                <div className='row'>
                    <div className="col-12">

                        <p> Your Currently Selected Food Category Is: {this.state.type}</p>
                    </div>
                </div>
                <div className='row'>
                    <Nav.Item>
                        <Nav.Link eventKey="disabled" disabled>Sort Ordering</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="Ascending" onSelect={this.onSortSelect}>Ascending</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="Descending" onSelect={this.onSortSelect}>Descending</Nav.Link>
                    </Nav.Item>
                </div>
                <div className='row'>
                    <div className="col-12">

                        <p> Your Currently Selected Sort Ordering: {this.state.sortOrder}</p>
                    </div>
                </div>
                {// After the navigation bar, the full list of items is rendered. The filterMatchingFunctions is used to filter the list based
                    // off of the user selections for filtering and sorting, while the "sort" function is used to sort the items based off of
                    // how the user wants the items to be sorted. The addToCart and removeFromCart are passed as a prop to provide a callback function
                    // for the buttons on the cards for each grocery item. 
                }
                <div className='row'>
                    <div className="col-12">
                        <DisplayList produceList={this.state.displayedItems.filter(this.filterMatchingItems).sort(this.priceBasedSort)} addToCart={this.addToCart} removeFromCart={this.removeFromCart} />
                    </div>
                </div>
                <div className='row'>
                    <div className="col-12 text-center">
                        <hr color="black" />
                        <h1>Your Shopping Cart </h1>
                    </div>
                </div>
                {
                    // The aggregation list is created below the full list of available items. The aggregatedItems state variable with all the items 
                    // being aggregated is passed in as a prop to be rendered. The addToCart and removeFromCart are also passed as callback functions
                }
                <div className='row'>
                    <div className="col-12 text-center">
                        <AggregateList addToCart={this.addToCart} removeFromCart={this.removeFromCart} aggregatedItems={this.state.aggregatedItems} />
                    </div>
                </div>
            </div>

        );
    }
}