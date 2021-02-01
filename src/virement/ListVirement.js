import React, { Component } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  FormControl,
  InputGroup,
  Row,
  Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Virement.css";
import Axios from "axios";
import NavigationBar from "../shared/NavigationBar";
import Virement from "./Virement";

class ListVirement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      virements: [],
      currentPage: 1,
      numberPerPage: 5,
    };
  }

  path = window.location.origin;

  componentWillMount() {
    if((sessionStorage.getItem('username') === null)) window.location.reload();
  }
  componentDidMount() {
    
    this.getAllVirements();
    
  }

  changePage = (event) => {
    let virementsLength = this.state.virements.length;
    if (
      (event.target.value > 0) &
      (event.target.value <
        Math.ceil(virementsLength / this.state.numberPerPage) + 1)
    ) {
      this.setState({
        currentPage: parseInt(event.target.value),
      });
    }
  };

  firstPage = () => {
    if (this.state.currentPage > 1)
      this.setState({
        currentPage: 1,
      });
  };

  prevPage = () => {
    if (this.state.currentPage > 1)
      this.setState({
        currentPage: this.state.currentPage - 1,
      });
  };

  nextPage = () => {
    let virementsLength = this.state.virements
      .length;
    if (
      this.state.currentPage <
      Math.ceil(virementsLength / this.state.numberPerPage)
    )
      this.setState({
        currentPage: this.state.currentPage + 1,
      });
  };

  lastPage = () => {
    let virementsLength = this.state.virements
      .length;
    if (
      this.state.currentPage <
      Math.ceil(virementsLength / this.state.numberPerPage)
    )
      this.setState({
        currentPage: Math.ceil(
          virementsLength / this.state.numberPerPage
        ),
      });
  };


  getAllVirements = () => {
    let authString = sessionStorage.getItem('basicauth');
    
    Axios.get("http://localhost:8082/abonne/"+sessionStorage.getItem('id')+"/virements",
    {headers : {authorization : authString}})
    .then((response) => response.data)
    .then((data) => {
      
      this.setState({
        virements : data,
        });
      });
  };




  render() {
    
    const { currentPage, numberPerPage, virements } = this.state;
    const lastIndex = currentPage * numberPerPage;
    const firstIndex = lastIndex - numberPerPage;
    const currentList = virements.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(virements.length / numberPerPage);

    return (
      <div>
        <NavigationBar />
      <Container>
        <Row>
          <Col lg="12" style={{marginTop: '25px'}}>
          <br></br>
        <ButtonGroup style={{ display: "flex", justifyContent: "center" }}>
                        <Link
                          to={{
                            pathname: "addVirement",
                            state: { fromDashboard: true },
                          }}
                          className="btn btn-warning"
                          
                          
                        >
                          <img
                            src={this.path+"/images/add-black.png"}
                            width="20"
                            style={{ marginRight: "10px" }}
                            alt="Add"
                          />
                           Effectuer un virement
                        </Link>
          </ButtonGroup>
        <br></br>
        <br></br>
          <Card className="border border-dark bg-dark text-white">
        <Card.Header>Liste des virements</Card.Header>
        <Card.Body>
          
          <Table striped bordered hover responsive variant="dark">
            <thead>
              <tr>
                <th>Numéro compte</th>
                <th>Bénéficiaire</th>
                <th>Motif</th>
                <th>Date d'exécution</th>
                <th>Montant</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {virements.length === 0 ? (
                <tr align="center">
                  <td colSpan="7">Aucune virement effectué.</td>
                </tr>
              ) : (
                currentList.map((virement) => (
                  <tr key={virement.id}>
                    <td>{virement.compte.numeroCompte}</td>
                    <td>{virement.beneficiaire.numeroCompte}</td>
                    <td>{virement.motif}</td>
                    <td>{virement.dateExecution}</td>
                    <td>{virement.montant}</td>
                    <td>{virement.statut}</td>
                    <td align="center">
                      <ButtonGroup>
                        <Link
                          to={{
                            pathname: "seeVirement/" + virement.id,
                            state: { fromDashboard: true },
                          }}
                          className="btn btn-primary"
                          style={{ marginRight: "25px" }}
                        >
                          <img
                            src={this.path+"/images/see.png"}
                            width="20"
                            alt="See"
                          />
                        </Link>

                        {virement.statut === "Enregistré" ? (
                          <Link
                            to={{
                              pathname: "editVirement/" + virement.id,
                              state: { fromDashboard: true },
                            }}
                            className="btn btn-danger"
                          >
                            <img
                              src={this.path+"/images/edit.png"}
                              width="20"
                              alt="Edit"
                            />
                          </Link>
                        ) : (
                          <Button disabled variant="danger">
                            <img
                              src={this.path+"/images/edit.png"}
                              width="20"
                              alt="Edit"
                            />
                          </Button>
                        )}
                      </ButtonGroup>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
        <Card.Footer>
          <div style={{ float: "left" }}>
            Page {currentPage} de {totalPages}
          </div>

          <div style={{ float: "right" }}>
            <InputGroup>
              <InputGroup.Prepend>
                <Button
                  type="button"
                  variant="outline-secondary"
                  disabled={currentPage === 1 ? true : false}
                  onClick={this.firstPage}
                >
                  <img
                    src={this.path+"/images/first.png"}
                    width="20"
                    alt="first"
                  />
                </Button>
                <Button
                  type="button"
                  variant="outline-secondary"
                  disabled={currentPage === 1 ? true : false}
                  onClick={this.prevPage}
                >
                  <img
                    src={this.path+"/images/prev.png"}
                    width="20"
                    alt="prev"
                  />
                </Button>
              </InputGroup.Prepend>

              <FormControl
                className={" bg-dark page-num"}
                name="currentPage"
                value={currentPage}
                onChange={this.changePage}
                type="text"
                pattern="[0-9]+"
              />

              <InputGroup.Append>
                <Button
                  type="button"
                  variant="outline-secondary"
                  disabled={currentPage === totalPages ? true : false}
                  onClick={this.nextPage}
                >
                  <img
                    src={this.path+"/images/next.png"}
                    width="20"
                    alt="next"
                  />
                </Button>

                <Button
                  type="button"
                  variant="outline-secondary"
                  disabled={currentPage === totalPages ? true : false}
                  onClick={this.lastPage}
                >
                  <img
                    src={this.path+"/images/last.png"}
                    width="20"
                    alt="last"
                  />
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </div>
        </Card.Footer>
      </Card>
          </Col>
          </Row>
          </Container>
          </div>
      
    );
  }
}

export default ListVirement;
