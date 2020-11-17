import React, { useEffect, useState } from 'react';
import formatCurrency from '../utils'
import Fade from 'react-reveal/Fade'
import Zoom from 'react-reveal/Zoom'
import Modal from 'react-modal';
import { fetchProducts } from '../actions/productActions'
import { connect } from 'react-redux'

function Products(props) {


    const [product, setProduct] = useState(null)

    useEffect(() => { props.fetchProducts() },[])

    const openModal = (product) => {
        setProduct(product)
    }
    const closeModal = () => {
        setProduct(null);
    }

    return (
        <div>
            <Fade bottom cascade>
                {
                    !props.products ? (<div>Loading...</div>
                    )
                        :
                        (<ul className="products">
                            {props.products.map(product => (
                                <li key={product._id}>
                                    <div className="product">
                                        <a
                                            onClick={() => openModal(product)}
                                            href={`#${product._id}`
                                            }>
                                            <img src={product.image} alt={product.title} />
                                            <p>
                                                {product.title}
                                            </p>
                                        </a>
                                        <div className="product-price">
                                            <div>
                                                {formatCurrency(product.price)}
                                            </div>
                                            <button
                                                onClick={() => props.addToCart(product)}
                                                className="button primary">
                                                Add to Cart
                                </button>
                                        </div>
                                    </div>
                                </li>
                            )
                            )}
                        </ul>)
                }

            </Fade>
            {product && (
                <Modal isOpen={true}
                    onRequestClose={closeModal}
                >
                    <Zoom>
                        <button className="close-modal" onClick={closeModal}>x</button>
                        <div className="product-details">
                            <img src={product.image} alt={product.title} />
                            <div className="product-details-description">
                                <p><strong>{product.title}</strong></p>
                                <p>{product.description}</p>
                                <p>Available Sizes {" "}
                                    {product.availableSizes.map(x =>
                                        <span>
                                            {" "} <button className="button ">{x}</button>
                                        </span>
                                    )}
                                </p>
                                <div className="product-price">
                                    <div>{formatCurrency(product.price)}</div>
                                    <button className="primary button" onClick={() => {
                                        props.addToCart(product)
                                        closeModal()
                                    }}>Add To Cart</button>
                                </div>
                            </div>
                        </div>
                    </Zoom>
                </Modal>
            )
            }
        </div >
    )
}
export default connect((state) => ({
    products: state.products.items
}), { fetchProducts })(Products)