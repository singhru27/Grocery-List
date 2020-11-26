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

export class AggregateList extends React.Component {
    constructor(props) {
        super(props);
        this.createAggregatedCards = this.createAggregatedCards.bind(this);
    }

    // Function that creates aggregated cards
    createAggregatedCards(keyValue) {
        let currItem = this.props.aggregatedItems[keyValue];
        return (
            <Card style={cardWrapper}>
                <Card.Body>
                    <Card.Title>{keyValue}</Card.Title>
                    <Card.Subtitle> Price per Unit: ${currItem.price} </Card.Subtitle>
                    <br />
                    <Card.Subtitle> Number in Cart: {currItem.numInCart} </Card.Subtitle>
                    <br />
                    <Card.Subtitle> Subtotal: ${currItem.numInCart * currItem.price} </Card.Subtitle>
                    <br />
                    <Button onClick={() => this.props.addToCart({ name: keyValue, price: currItem.price })} variant="primary">+</Button>
                    <Button onClick={() => this.props.removeFromCart({ name: keyValue, price: currItem.price })} className="ml-4" variant="primary">-</Button>
                </Card.Body>
            </Card>
        )
    }
    // Function used to sum up all the values in the current aggregated list
    render() {
        // Checking to see if there is anything currently being aggregated
        if (Object.keys(this.props.aggregatedItems).length === 0) {
            return (
                <h3> Checkout Total: $0</h3>
            )
        } else {
            return (
                <CardDeck>
                    {Object.keys(this.props.aggregatedItems).map(this.createAggregatedCards)}
                </CardDeck>
            )
        }

    }
}