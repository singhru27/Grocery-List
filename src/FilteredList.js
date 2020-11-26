import React from 'react';
import "./bootstrap-4.3.1-dist/css/bootstrap.min.css";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import { DisplayList } from "./DisplayList.js";

export class FilteredList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shelf_life: 'All',
            type: "All",
            sort: "Descending",
            displayedItems: this.props.produceList
        };
        this.onSelectFilterShelfLife = this.onSelectFilterShelfLife.bind(this);
    }
    // Function used to filter items
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
                        <DisplayList produceList={this.state.displayedItems} />
                    </div>
                </div>
            </div>

        );
    }
}