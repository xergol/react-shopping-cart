//feature-1
import React, { useState } from 'react';
import Cart from './components/Cart';
import Filter from './components/Filter';
import Products from './components/Products';
import data from './data.json'
import store from './store';
import { Provider } from 'react-redux';

function App() {

  if (JSON.parse(localStorage.getItem("cartItems"))) {

  }

  const [products, setProducts] = useState(data.products);
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("");
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

  const sortProducts = event => {
    setSort(event.target.value);
    const resProducts = products.slice().sort((a, b) =>
      sort === "lowest" ?
        a.price < b.price ? 1 : -1
        : sort === "highest" ?
          a.price > b.price ? 1 : -1
          : a._id < b._id ? 1 : -1
    )
    setProducts(resProducts);
  }

  const filterProducts = event => {
    if (event.target.value === "") {
      setSize(event.target.value);
      setProducts(data.products);
    } else {
      const filteredArray = data.products.filter(product => product.availableSizes.indexOf(event.target.value) >= 0)
      setSize(event.target.value);
      setProducts(filteredArray);
    }
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
              <Filter count={products.length} size={size} sort={sort} filterProducts={filterProducts} sortProducts={sortProducts} />
              <Products products={products} addToCart={addToCart} />
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
