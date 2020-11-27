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

export class AggregateList extends React.Component {
    constructor(props) {
        super(props);
        this.createAggregatedCards = this.createAggregatedCards.bind(this);
        this.sumUpValues = this.sumUpValues.bind(this);
    }

    /*
     Function that creates aggregated cards. This function is used via the "map" operator. It 
     accepts a keyValue (which is a name for the current item - i.e "Banana"). It then uses this key
     value to create a card that displays the relevant information for the user. 
     */
    createAggregatedCards(keyValue) {
        let currItem = this.props.aggregatedItems[keyValue];
        return (
            <Card style={cardWrapper}>
                <Card.Img variant="top" src={currItem.image} />
                <Card.Body>
                    <Card.Title>{keyValue}</Card.Title>
                    <Card.Subtitle> Shelf Life: {currItem.shelf_life} </Card.Subtitle>
                    <br />
                    <Card.Subtitle> Type: {currItem.type} </Card.Subtitle>
                    <br />
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
    // The item being summed is the price
    sumUpValues(accumulator, keyValue) {
        let currItem = this.props.aggregatedItems[keyValue];
        return accumulator + currItem.numInCart * currItem.price;
    }
    render() {
        // Checking to see if there is anything currently being aggregated
        // If there is not anything being aggregated, then the checkout total
        // is simply set to 0
        if (Object.keys(this.props.aggregatedItems).length === 0) {
            return (
                <h3> Checkout Total: $0</h3>
            )
            // If there are things being aggregated, we call map using the item names from the aggregatedItems
            // object. This object was passed in as a prop to this class
        } else {
            return (
                <div>
                    <CardDeck>
                        {Object.keys(this.props.aggregatedItems).map(this.createAggregatedCards)}
                    </CardDeck>
                    <h3>Checkout Total: ${Object.keys(this.props.aggregatedItems).reduce(this.sumUpValues, 0)}</h3>
                </div>

            )
        }

    }
}