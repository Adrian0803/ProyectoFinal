import React, { useEffect } from 'react';
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
        productsItem.category.id === product.category.id

    )
    console.log(relatedProducts);

    return (
        <div>
            <h1>{product?.title} </h1>
            <br />
            <br />
            <img src={product?.productImgs[0]} style={{ width: 400 }} alt="" />
            <h2>Related Products</h2>
            {relatedProducts.map(productsItem => (

                <li>
                    <Link to={`/products/${productsItem.id}`}>
                        {productsItem.title}
                    </Link>

                    <br />
                    <img src={productsItem.productImgs[0]} style={{ width: 200 }} alt="" />
                </li>
            ))}


        </div>
    );
};


export default ProductsId;