import './App.css';
import React, { useState, useEffect } from 'react';
import Input from './components/Input';
import Product from './components/Product';
import Quantity from './components/Quantity';

function App() {
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [allProducts, setAllProducts] = useState([]);
  const [showProducts, setShowProducts] = useState(false);
  const [buttonName, setButtonName] = useState("Show Products");
  const [status, setStatus] = useState(false);
  const [deleteProduct, setDeletedProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [unit, setUnit] = useState('');

  const handleStatusChange = (product) => {
    product.status = !product.status;
    fetch(`http://localhost:3000/api/shopping/${product._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: product.status }),
    })
      .then(response => response.json())
      .then(data => setAllProducts([...allProducts]))
      .catch(error => console.log(error));
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/shopping")
      .then((response) => response.json())
      .then((data) => (setAllProducts(data)))
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title === "") return
    if (unit === '') return
    const data = { title, comment, status, quantity, unit };
    fetch('http://localhost:3000/api/shopping', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(response => {
        setAllProducts([...allProducts, response]);
        setComment('');
        setTitle('');
        setQuantity(1);
        setUnit('')
      })
      .catch(error => {
        console.log(error);
      });
  }

  const deleteObjectElement = (deleteElement) => {
    console.log(allProducts)
    if (!deleteElement) {
      return;
    }
    fetch(`http://localhost:3000/api/shopping/${deleteElement._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => {
        setAllProducts(allProducts.filter(product => product._id !== deleteElement._id))
      })
      .catch(error => {
        console.log(error);
      });
  }

  const editObjectElement = (editProduct) => {
    if (!editProduct) {
      return;
    }
    fetch(`http://localhost:3000/api/shopping/${editProduct._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, comment, status, quantity }),
    })
      .then(response => response.json())
      .then(response => {
        console.log(response)
        setAllProducts(allProducts.map(product => product._id === editProduct._id ? response : product));
        setTitle(editProduct.title);
        setComment(editProduct.comment);
        setQuantity(editProduct.quantity);
        setUnit(editProduct.unit);
      })
      .catch(error => {
        console.log(error);
      });
  }

  const handleShowProducts = () => {
    setShowProducts(!showProducts);
    setButtonName(showProducts ? "Show products" : "Hide products")
  }

  const handleSelectChange = (event) => {
    setUnit(event.target.value);
  };

  const handleTask = (event) => {
    event.preventDefault();
    setTitle(event.target.value);
  }

  const handleComment = (event) => {
    event.preventDefault();
    setComment(event.target.value);
  }

  const handleDecrement = (event) => {
    event.preventDefault();
    if (quantity === 1) return;
    setQuantity(quantity - 1);
  }

  const handleIncrement = (event) => {
    event.preventDefault();
    setQuantity(quantity + 1);
  }

  const handleTypeInput = (event) => {
    console.log(event.target.value)
    if (event.target.value === '') { 
      setQuantity(1);
    } else {
      setQuantity(parseInt(event.target.value));
    }
  }
  
  return (
    <div className="App">
      <h2 id="intro">Shopping list</h2>
      <h3>{new Date().toJSON().slice(0, 10)}</h3>
      <form onSubmit={handleSubmit}>
        <Input
          maxLength={45}
          value={title}
          type="text"
          id="addTitle"
          placeholder="Add product"
          onChangeCallback={handleTask} />
        <Input
          value={comment}
          type="text"
          id="addComment"
          placeholder="Add comment"
          onChangeCallback={handleComment} />
        <Quantity
          className={title.split("").length === 0 ? "disabled" : ""}
          onChangeCallback={handleTypeInput}
          decrement={handleDecrement}
          value={quantity}
          increment={handleIncrement}
          handleSelectChange={handleSelectChange}
        /> 
        <button id="addButton" type="submit" className={title.split("").length === 0 ? "disabled" : ""}>Add</button>
      </form>
      <button id="showHideButton" onClick={handleShowProducts}>{buttonName}</button>
      {showProducts ?
        <div id="allTasks">
        {allProducts.length > 0 ? (
          allProducts.map((product) => {
            return (
              <Product product={product}
              setSelectedCallback={() => { handleStatusChange(product) }}
              setDeleteCallback={() => {setDeletedProduct(product); deleteObjectElement(product)}} 
              setEditCallback={() => { setEditProduct(product); editObjectElement(product); deleteObjectElement(product) }} />
            )
            })
        ) : (
          <h3>There are no products to buy.</h3>
        )}
      </div>
       : null} 
    </div>
  );
}

export default App;
