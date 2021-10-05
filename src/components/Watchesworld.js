import React, { Component } from "react";
import axios from "axios";
import { Card, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
export class Watchesworld extends Component {
  constructor(props) {
    super(props);
    this.state = {
      watch: [],
    };
  }
  componentDidMount = async () => {
    const wathces = await axios.get(
      "https://watches-world.herokuapp.com/watches-list/"
    );
    console.log(wathces.data);
    this.setState({
      watch: wathces.data,
    });
  };

  addfav = async (id, title, image, description, toUSD) => {
    let list = {
      id: id,
      title: title,
      description: description,
      toUSD: toUSD,
      image_url: image,
    };
    const create = await axios.post("http://localhost:8000/createfav", list);
    console.log(create.data);
  };
  render() {
    return (
      <div>
        <Link to="/showfav">show fav </Link>
        <Row xs={1} md={2} className="g-4">
          {this.state.watch.map((item, idx) => (
            <Col key={idx}>
              <Card>
                <Card.Img variant="top" src={item.image_url} />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>
                    {item.description}
                    <br />
                    {item.toUSD}
                    <br />
                    <Button
                      variant="primary"
                      onClick={() => {
                        this.addfav(
                          item.id,
                          item.title,
                          item.image_url,
                          item.description,
                          item.toUSD
                        );
                      }}
                    >
                      add fav
                    </Button>{" "}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

export default Watchesworld;
