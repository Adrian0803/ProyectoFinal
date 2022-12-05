import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { filterProductThunk, getproductsThunk, filterHeadlineThunk } from '../store/slices/news.slice';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const Home = () => {

    const dispatch = useDispatch();
    const products = useSelector(state => state.products);
    const [categoriesList, setCategoriesList] = useState([]);
    const [inputSearch, setImputSearch]= useState("");

    useEffect(() => {
        dispatch(getproductsThunk());
        axios.get('https://e-commerce-api.academlo.tech/api/v1/products/categories')
            .then(res => setCategoriesList(res.data.data.categories))
    }, [])
    console.log(categoriesList);

    return (
        <div>

            <h2>Components Home</h2>
            {
                categoriesList.map(category => (
                    <Button onClick={() => dispatch(filterProductThunk(category.id))}
                    >{category.name}
                    </Button>
                ))
            }
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Recipient's username"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    value={inputSearch}
                    onChange={e => setImputSearch(e.target.value) }
                />
                <Button 
                    variant="outline-secondary"
                    onClick={() => dispatch(filterHeadlineThunk(inputSearch))}
                    
                >
                    Button
                </Button>
            </InputGroup>


            {products?.map(productsItem => (
                <li>
                    <Link to={`/products/${productsItem.id}`}>
                        {productsItem.title} </Link>
                    <br />
                    <br /><img src={productsItem.productImgs[0]} style={{ width: 200 }} alt="" />



                </li>
            ))}
        </div>
    );
};

export default Home;