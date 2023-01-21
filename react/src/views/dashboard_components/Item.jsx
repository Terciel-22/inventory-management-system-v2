import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import imageNotAvailable from "../../assets/img/image-not-available.jpg"
import axiosClient from '../../AxiosClient';

export default function Item() {
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const itemFormRef = useRef();
  const imageURLRef = useRef();
  const itemNumberRef = useRef();
  const productIDRef = useRef();
  const itemNameRef = useRef();
  const statusRef = useRef();
  const dateCreatedRef = useRef();
  const descriptionRef = useRef();
  const discountRef = useRef();
  const quantityRef = useRef();
  const unitPriceRef = useRef();
  const totalStockRef = useRef();
  const addButtonRef = useRef();
  const updateButtonRef = useRef();
  const deleteButtonRef = useRef();

  useEffect(()=>{
    getItems();
    resetForm();
  },[]);

  const getItems = () => {
    setLoading(true);
    axiosClient.get("/items")
      .then(({data})=>{
        setLoading(false);
        console.log(data);
      })
      .catch(()=>{
        setLoading(false);
      });
  }
  
  const handleClick = (event) => {
    event.preventDefault();

    if(event.target.name === "add")
    {
      const itemFormData = new FormData(itemFormRef.current);
      console.log(itemFormData);
      axiosClient.post("/items", itemFormData)
      .then(()=>{
        alert("Successfully added item.");
      })
      .catch(error=>{
        const response = error.response;
        if(response && response.status === 422) {
          setErrors(response.data.errors);
        }
      })
    } else if(event.target.name === "reset")
    {
      itemNumberRef.current.value = "";
      resetForm();
    }
  }

  const handleChange = (event) => {
    
    const value = event.target.value;
    
    if(value !== "")
    {
      const payload = {
        item_number: value
      }
      setLoading(true);
      axiosClient.post("/item", payload)
        .then(({data})=>{
          displayDataToFormField(data);
        })
        .catch(()=>{
          resetForm();
        });
    } else 
    {
      resetForm();
    }
  }

  const handleFileInput = (event) => {
    const uploadedFile = event.target.files[0];
    if(uploadedFile)
    {
      const path = URL.createObjectURL(uploadedFile);
      imageURLRef.current.src = path;
    }
  }

  const displayDataToFormField = (data) => {
    imageURLRef.current.src = data.image_url;
    productIDRef.current.value = data.id;
    itemNameRef.current.value = data.item_name;
    statusRef.current.value = data.status;
    dateCreatedRef.current.value = data.created_at;
    descriptionRef.current.value = data.description;
    discountRef.current.value = data.discount;
    unitPriceRef.current.value = data.unit_price;
    totalStockRef.current.value = data.stock;
    updateButtonRef.current.removeAttribute("disabled");
    deleteButtonRef.current.removeAttribute("disabled");
  }
  
  const resetForm = () => {
    imageURLRef.current.src = imageNotAvailable;
    productIDRef.current.value = "";
    itemNameRef.current.value = "";
    statusRef.current.value = "active";
    dateCreatedRef.current.value = "";
    descriptionRef.current.value = "";
    discountRef.current.value = 0;
    quantityRef.current.value = 0;
    unitPriceRef.current.value = 0;
    totalStockRef.current.value = "";
    updateButtonRef.current.setAttribute("disabled",true);
    deleteButtonRef.current.setAttribute("disabled",true);
  }

  return (
    <form ref={itemFormRef} className="form-tab active" id="item" encType="multipart/form-data">
        {errors && 
          <div className="error-message">
            {Object.keys(errors).map(key=>{
              return <p key={key}>{errors[key][0]}</p>
            })}
          </div>
        }
        <h1>Item</h1>
        <div className="row">
          <div className="column-1">
            <label htmlFor="item-image">Image <br />
              <input type="file" name="image_url" id="item-image" accept="image/*" onChange={handleFileInput}/>
              <img  ref={imageURLRef} alt="Image not available" />
            </label>
          </div>
          <div className="column-2">
            <div className="row">
              <div className="form-group">
                <label htmlFor="item-number">Item Number</label>
                <input ref={itemNumberRef} type="text" id="itemNumber" name="item_number" onChange={handleChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="product-id">Product ID</label>
                <input ref={productIDRef} type="text" id="product-id" disabled placeholder="Auto-generate" />
              </div>
            </div>
            <div className="row">
              <div className="form-group">
                <label htmlFor="item-name">Item Name</label>
                <input ref={itemNameRef} type="text" id="item-name" name="item_name"/>
              </div>
              <div className="form-group">
                <label htmlFor="item-status">Status</label>
                <select ref={statusRef} name="status" id="item-status">
                  <option value="active">Active</option>
                  <option value="disabled">Disabled</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="item-date">Date Created</label>
                <input ref={dateCreatedRef} type="date" id="item-date" name="created_at" disabled/>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="item-description">Description</label>
              <textarea ref={descriptionRef} name="description" id="item-description" rows="12"></textarea>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="form-group">
            <label htmlFor="item-discount">Discount %</label>
            <input ref={discountRef} type="text" id="item-discount" name="discount"/>
          </div>
          <div className="form-group">
            <label htmlFor="item-quantity">Quantity</label>
            <input ref={quantityRef} type="number" min="0" id="item-quantity" name="stock"/>
          </div>
          <div className="form-group">
            <label htmlFor="item-unit-price">Unit Price</label>
            <input ref={unitPriceRef} type="text" id="item-unit-price" name="unit_price"/>
          </div>
          <div className="form-group">
            <label htmlFor="item-total-stock">Total Stock</label>
            <input ref={totalStockRef} type="text" id="item-total-stock" disabled placeholder="Auto-generate" name="totalStock"/>
          </div>
        </div>
        <div className="buttons row">
          <button ref={addButtonRef} type="button" onClick={handleClick} name="add">Add</button>
          <button ref={updateButtonRef} type="button" onClick={handleClick} name="update" disabled>Update</button>
          <button ref={deleteButtonRef} type="button" onClick={handleClick} name="delete" disabled>Delete</button>
          <button type="button" onClick={handleClick} name="reset">Reset</button>
        </div>
    </form>
  )
}
