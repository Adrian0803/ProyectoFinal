import React, { useEffect } from 'react';
import { Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getproductsThunk } from '../store/slices/news.slice';

const ProductsId = () => {

    const { id } = useParams();

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getproductsThunk());
    }, [])

    const productsList = useSelector(state => state.products);

    const product = productsList.find(productsItem => productsItem.id === Number(id))
    const relatedProducts = productsList.filter(productsItem =>
        productsItem.category.id === product.category.id &&
        productsItem.id !== product.id

    )
    console.log(relatedProducts);

    return (
        <div>
            <h1>{product?.title} </h1>
            <Row>
                {/* El producto seleccionado*/}
                <Col lg={9}>

                    <img src={product?.productImgs[0]} style={{ width: 400 }} alt="" className='img-fluid' />
                    <p >{product?.description} </p>
                    <p>Price:  ${product?.price}</p>
                    <br />


                </Col>
                {/* Los productos relacionados*/}
                <Col lg={3}>

                    <h2>Related Products</h2>
                    <ListGroup variant="flush">

                        {relatedProducts.map(productsItem => (

                            <ListGroup.Item>
                                <Link to={`/products/${productsItem.id}`}>
                                    {productsItem.title}
                                    <br />
                                    <img src={productsItem.productImgs[0]} className="img-fluid" />
                                </Link>
                                <p>Price:  ${productsItem.price}</p>


                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>

            </Row>
            <br />
            <br />


        </div>
    );
};


export default ProductsId;