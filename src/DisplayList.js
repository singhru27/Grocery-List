import React from 'react';
import "./bootstrap-4.3.1-dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Button from 'react-bootstrap/Button';

// Small wrapper class used to allow for card wrapping
const cardWrapper = {
    minWidth: "20%",
    flexGrow: 0,
};

export class DisplayList extends React.Component {
    constructor(props) {
        super(props);
        this.createCard = this.createCard.bind(this);

    }
    // Function that creates a card
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

                </Card.Body>
            </Card>
        )
    }
    render() {
        return (
            <CardDeck>
                { this.props.produceList.map(this.createCard)}
            </CardDeck>
        )
    }

}