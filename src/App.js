//feature-1
import React, { useState } from 'react';
import Filter from './components/Filter';
import Products from './components/Products';
import data from './data.json'

function App() {

  const [products, setProducts] = useState(data.products);
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("");

  const sortProducts = event => {
    setSort(event.target.value);
    const resProducts = products.slice().sort((a,b) => 
    sort === "lowest"?
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
    <div className="grid-container">
      <header>
        <a href="/">React Shopping Cart</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Filter count={products.length} size={size} sort={sort} filterProducts={filterProducts} sortProducts={sortProducts} />
            <Products products={products} />
          </div>
          <div className="sidebar">
            Cart Items
          </div>
        </div>
      </main>
      <footer>
        All right is reserved.......
      </footer>
    </div>
  );
}

export default App;
