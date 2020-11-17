//feature-1
import React, { useState } from 'react';
import Cart from './components/Cart';
import Filter from './components/Filter';
import Products from './components/Products';
import store from './store';
import { Provider } from 'react-redux';

function App() {

  if (JSON.parse(localStorage.getItem("cartItems"))) {

  }

  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("cartItems")) ? JSON.parse(localStorage.getItem("cartItems")) : []);

  const createOrder = (order) => {
    alert("Need to save order for " + order.name)
  }

  const removeFromCart = (product) => {
    const removeCartItems = cartItems.slice().filter(x => x._id !== product._id);
    setCartItems(removeCartItems);
    localStorage.setItem("cartItems", JSON.stringify(removeCartItems));
  }

  const addToCart = (product) => {
    let alreadyInCart = false;
    const addedCardItems = cartItems.slice();
    addedCardItems.forEach(item => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      addedCardItems.push({ ...product, count: 1 });
    }

    setCartItems(addedCardItems);
    localStorage.setItem("cartItems", JSON.stringify(addedCardItems));
  }


  return (
    <Provider store={store}>
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter />
              <Products addToCart={addToCart} />
            </div>
            <div className="sidebar">
              <Cart cartItems={cartItems} removeFromCart={removeFromCart} createOrder={createOrder} />
            </div>
          </div>
        </main>
        <footer>
          All right is reserved.......
      </footer>
      </div>
    </Provider>
  );
}

export default App;
