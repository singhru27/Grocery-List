import React from 'react';
import "./bootstrap-4.3.1-dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Button from 'react-bootstrap/Button';

// Small wrapper constant used to allow for card wrapping. This is used as a style
// setting for the cards in our aggregated section
const cardWrapper = {
    minWidth: "20%",
    flexGrow: 0,
};

export class DisplayList extends React.Component {
    constructor(props) {
        super(props);
        this.createCard = this.createCard.bind(this);

    }
    // Function that creates a card. Each card includes the item image, shelf_life, type, and price. 
    // This function is used by calling "map" in the render function on the produceList, which was 
    // passed in as a prop to this class from FilteredList. The buttons are assigned callback functions
    // which were also passed in as props from the FilteredList class, which add and remove from the 
    // aggregated shopping cart respectively
    createCard(item) {
        return (
            <Card style={cardWrapper}>
                <Card.Img variant="top" src={item.image} />
                <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Subtitle> Price: ${item.price} </Card.Subtitle>
                    <br />
                    <Card.Subtitle> Shelf Life: {item.shelf_life} </Card.Subtitle>
                    <br />
                    <Card.Subtitle> Category: {item.type} </Card.Subtitle>
                    <br />
                    <Button onClick={() => this.props.addToCart(item)} variant="primary">Add to Cart</Button>
                    <br />
                    <Button className="mt-1" onClick={() => this.props.removeFromCart(item)} variant="primary">Remove 1 from Cart</Button>
                </Card.Body>
            </Card>
        )
    }
    render() {
        // All items are encased in a CardDeck, and the createCard() function is called via the map operator
        // on each individual item within our produce list (which was passed in as a prop)
        return (
            <CardDeck>
                { this.props.produceList.map(this.createCard)}
            </CardDeck>
        )
    }

}