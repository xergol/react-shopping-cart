import React, { useState } from 'react'
import formatCurrency from '../utils'

export default function Cart(props) {

    const { cartItems } = props;

    const [form, setForm] = useState({
        name: "",
        email: "",
        address: "",
    });

    const [showCheckOut, setShowCheckOut] = useState(false);

    const handleInput = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const createOrder = event => {
        event.preventDefault();
        props.createOrder(form);
    }

    return (
        <>
            <div>
                {cartItems.length === 0 ? (
                    <div className="cart cart-header">Cart is Empty</div>
                ) : (
                        <div className="cart cart-header">
                            You have {cartItems.length} in cart {" "}
                        </div>
                    )
                }
                <div className="cart">
                    <ul className="cart-items">
                        {cartItems.map(item =>
                            <li key={cartItems._id}>
                                <div>
                                    <img src={item.image} alt={item.title} />
                                </div>
                                <div>
                                    <div>{item.title}</div>
                                    <div className="right">
                                        {formatCurrency(item.price)} x  {item.count} {" "}
                                        <button className="button" onClick={() => props.removeFromCart(item)}>Remove</button>
                                    </div>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
                {cartItems.length !== 0 && (
                    <div>
                        <div className="cart">
                            <div className="total">
                                <div>
                                    Total:{" "}
                                    {formatCurrency(cartItems.reduce((a, c) => a + (c.price * c.count), 0))}
                                </div>
                                <button
                                    onClick={() => setShowCheckOut(true)}
                                    className="button primary">Proceed
                            </button>
                            </div>
                        </div>
                        {showCheckOut && (
                            <div className="cart">
                                <form onSubmit={createOrder}>
                                    <ul className="form-container">
                                        <li>
                                            <label>Email</label>
                                            <input name="email" type="email" required onChange={handleInput} />
                                        </li>
                                        <li>
                                            <label>Name</label>
                                            <input name="name" type="text" required onChange={handleInput} />
                                        </li>
                                        <li>
                                            <label>Address</label>
                                            <input name="address" type="text" required onChange={handleInput} />
                                        </li>
                                        <li>
                                            <button className="button primary" type="submit">Checkout</button>
                                        </li>
                                    </ul>
                                </form>
                            </div>
                        )}
                    </div>
                )}
            </div>

        </>
    )
}