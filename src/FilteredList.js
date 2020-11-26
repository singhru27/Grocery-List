import React from 'react';
import "./bootstrap-4.3.1-dist/css/bootstrap.min.css";
import Nav from 'react-bootstrap/Nav'
import { DisplayList } from "./DisplayList.js";

export class FilteredList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shelf_life: 'All',
            type: "All",
            sortOrder: "Descending",
            displayedItems: this.props.produceList,
            aggregatedItems: []
        };
        // Binding the functions with the "this" keyword
        this.onSelectFilterShelfLife = this.onSelectFilterShelfLife.bind(this);
        this.onSelectType = this.onSelectType.bind(this);
        this.filterMatchingItems = this.filterMatchingItems.bind(this);
        this.priceBasedSort = this.priceBasedSort.bind(this);
        this.onSortSelect = this.onSortSelect.bind(this);

    }
    // Function used to filter items
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

    // Function used to sort the items
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

    render() {
        return (
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
                <div className='row'>
                    <div className="col-12">
                        <DisplayList produceList={this.state.displayedItems.filter(this.filterMatchingItems).sort(this.priceBasedSort)} />
                    </div>
                </div>
                <div className='row'>
                    <div className="col-12 text-center">
                        <hr color="black" />
                        <h1>Your Shopping Cart </h1>
                    </div>
                </div>
            </div>

        );
    }
}