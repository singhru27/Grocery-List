import React from 'react';
import "./bootstrap-4.3.1-dist/css/bootstrap.min.css";
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import Button from 'react-bootstrap/Button';

export class DisplayList extends React.Component {
    constructor(props) {
        super(props);
        this.createCard = this.createCard.bind(this);

    }
    // Function that creates a card
    createCard(item) {
        return (
            <Card style={{}}>
                <Card.Img variant="top" src={item.image} />
                <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Subtitle> Price: ${item.price} </Card.Subtitle>
                    <br />
                    <Card.Subtitle> Shelf Life: {item.shelf_life} </Card.Subtitle>
                    <br />
                    <Card.Subtitle> Category: {item.type} </Card.Subtitle>
                    <br />
                    <Button variant="primary">Add to Cart</Button>
                </Card.Body>
            </Card>
        )
    }
    render() {
        return (
            <CardColumns>
                { this.props.produceList.map(this.createCard)}
            </CardColumns>
        )
    }

}