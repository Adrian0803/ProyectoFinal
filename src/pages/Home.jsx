import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getNewsThunk } from '../store/slices/news.slice';

const Home = () => {

    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(getNewsThunk());
    },[])

    return (
        <div>
            <h2>Components Home</h2>
        </div>
    );
};

export default Home;