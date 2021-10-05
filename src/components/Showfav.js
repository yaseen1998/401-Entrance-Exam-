import React, { Component } from "react";
import axios from "axios";
import { Card, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
export class Showfav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      watch: [],
      image: "",
      title: "",
      description: "",
      toUSD: "",
      id: "",
      showmodal: false,
    };
  }

  componentDidMount = async () => {
    const wathces = await axios.get("http://localhost:8000/getfav");
    console.log(wathces.data);
    this.setState({
      watch: wathces.data.data,
    });
  };

  delfav = async (id) => {
    const create = await axios.delete(`http://localhost:8000/deletefav/${id}`);
    this.componentDidMount();
  };

  updatefav = async (id, title, image, description, toUSD) => {
    this.setState({
      id: id,
      title: title,
      description: description,
      toUSD: toUSD,
      image: image,
      showmodal: true,
    });
    console.log(this.state.showmodal);
  };

  handleClose = () => {
    this.setState({
      showmodal: false,
    });
  };
  handlelocation = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handlesubmit = async (e) => {
    e.preventDefault();
    let list = {
      title: this.state.title,
      description: this.state.description,
      toUSD: this.state.toUSD,
      image_url: this.state.image,
    };
    const create = await axios.patch(
      `http://localhost:8000/updatefav/${this.state.id}`,
      list
    );
    this.setState({
        showmodal: false,
      });
    this.componentDidMount();
  };
  render() {
    return (
      <div>
        <div>
          <Link to="/">home </Link>
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
                        variant="danger"
                        onClick={() => {
                          this.delfav(item._id);
                        }}
                      >
                        delete fav
                      </Button>{" "}
                      <Button
                        variant="primary"
                        onClick={() => {
                          this.updatefav(
                            item._id,
                            item.title,
                            item.image_url,
                            item.description,
                            item.toUSD
                          );
                        }}
                      >
                        update fav
                      </Button>{" "}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        <div>
          <Modal show={this.state.showmodal} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={this.handlesubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>title</Form.Label>
                  <Form.Control
                    type="text"
                    value={this.state.title}
                    name="title"
                    onChange={this.handlelocation}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>image</Form.Label>
                  <Form.Control
                    type="text"
                    value={this.state.image}
                    name="image"
                    onChange={this.handlelocation}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>description</Form.Label>
                  <Form.Control
                    type="text"
                    value={this.state.description}
                    name="description"
                    onChange={this.handlelocation}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>toUSD</Form.Label>
                  <Form.Control
                    type="text"
                    value={this.state.toUSD}
                    name="toUSD"
                    onChange={this.handlelocation}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Showfav;
