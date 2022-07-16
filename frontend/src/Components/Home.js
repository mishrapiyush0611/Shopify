import React, { Fragment, useEffect } from 'react'
import MetaData from './Layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../action/productAction'
import { Link, useParams } from 'react-router-dom'
import Loader from './Layout/Loader'
const Home = () => {
    const dispatch = useDispatch();
    const params=useParams();
    const keyword=params.keyword
    
    const { loading, products, error } = useSelector(state => state.products)
    useEffect(() => {
        console.log(keyword)
        dispatch(getProducts(keyword));
    }, [dispatch,keyword])
    return (
        <Fragment>
            <MetaData title={'Buy Best Products Online'}></MetaData>
            <h1 id="products_heading">Latest Products</h1>
            {loading ?<Loader></Loader>:(
                <Fragment>
                    <section id="products" className="container mt-5">
                <div className="row">
                    {products && products.map(product => (
                        <div key={product._id}className="col-sm-12 col-md-6 col-lg-3 my-3">
                            <div className="card p-3 rounded">
                                <img
                                    className="card-img-top mx-auto"
                                    src={product.images[0].url}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">
                                        <a href={`/product/${product._id}`}>{product.name}</a>
                                    </h5>
                                    <div className="ratings mt-auto">
                                        <div className="rating-outer">
                                            <div className="rating-inner" style={{width:`${(product.ratings/5)*100}%`}}></div>
                                        </div>
                                        <span id="no_of_reviews">{product.numOfReviews}</span>
                                    </div>
                                    <p className="card-text">Rs.{product.price}</p>
                                    <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block">View Details</Link>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </section >
                </Fragment>
            )}
            
        </Fragment >
    )
}

export default Home