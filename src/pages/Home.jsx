import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { filterProductThunk, getproductsThunk, filterHeadlineThunk } from '../store/slices/news.slice';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Row, Col, Card } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';


const Home = () => {

    const dispatch = useDispatch();
    const products = useSelector(state => state.products);
    const [categoriesList, setCategoriesList] = useState([]);
    const [inputSearch, setImputSearch] = useState("");

    useEffect(() => {
        dispatch(getproductsThunk());
        axios.get('https://e-commerce-api.academlo.tech/api/v1/products/categories')
            .then(res => setCategoriesList(res.data.data.categories))
    }, [])
    console.log(categoriesList);

    return (
        <div>
            <Row>
                <Col lg={3}>

                    <ListGroup as="ul">
                        {
                            categoriesList.map(category => (
                                <ListGroup.Item as="li"
                                    onClick={() => dispatch(filterProductThunk(category.id))}
                                    style={{ cursor: "pointer" }}
                                >

                                    {category.name}
                                </ListGroup.Item>
                            ))
                        }
                    </ListGroup>
                </Col>
                <Col lg={9}>
                    <h1>Componente Home</h1>

                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Recipient's username"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={inputSearch}
                            onChange={e => setImputSearch(e.target.value)}
                        />
                        <Button
                            variant="outline-secondary"
                            onClick={() => dispatch(filterHeadlineThunk(inputSearch))}

                        >
                            Button
                        </Button>
                    </InputGroup>

                    <Row xs={1} md={2} lg={3} className="g-4">

                        {products?.map(productsItem => (<Col>
                            <Card>
                                <Link to={`/products/${productsItem.id}`} style={{ textDecoration: "none" }}>

                                    <Card.Img
                                        variant="top"
                                        src={productsItem.productImgs[0]}
                                        style={{ height: 200, objectFit: "contain" }}


                                    />
                                    <Card.Body>
                                        <Card.Title>{productsItem.title}</Card.Title>
                                        <Card.Text>
                                            
                                            {productsItem.description}
                                            <br />
                                            <br />
                                            
                                            <p>Price:  ${productsItem.price}</p>

                                        </Card.Text>
                                    </Card.Body>
                                </Link>
                            </Card>
                        </Col>
                        ))}
                    </Row>



                </Col>
            </Row>
        </div>
    );
};

export default Home;