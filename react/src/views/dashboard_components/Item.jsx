import React from 'react';
import imageNotAvailable from "../../assets/img/image-not-available.jpg"

export default function Item() {
  
  const handleClick = (event) => {
    event.preventDefault();
    if(event.target.name === "add")
    {
      alert("added");
    }
  }
  return (
    <form className="form-tab active" id="item">
        <h1>Item</h1>
        <div className="row">
          <div className="column-1">
            <label htmlFor="item-image">Image <br />
              <input type="file" name="item-image" id="item-image" />
              <img src={imageNotAvailable} alt="Image not available" />
            </label>
          </div>
          <div className="column-2">
            <div className="row">
              <div className="form-group">
                <label htmlFor="item-number">Item Number</label>
                <input type="text" id="item-number"/>
              </div>
              <div className="form-group">
                <label htmlFor="product-id">Product ID</label>
                <input type="text" id="product-id" tabIndex={-1} disabled placeholder="Auto-generate"/>
              </div>
            </div>
            <div className="row">
              <div className="form-group">
                <label htmlFor="item-name">Item Name</label>
                <input type="text" id="item-name"/>
              </div>
              <div className="form-group">
                <label htmlFor="item-status">Status</label>
                <select name="item-status" id="item-status">
                  <option value="active">Active</option>
                  <option value="disable">Disable</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="item-date">Date Created</label>
                <input type="date" name="item-date" id="item-date" tabIndex={-1} disabled/>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="item-description">Description</label>
              <textarea name="" id="item-description" rows="12"></textarea>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="form-group">
            <label htmlFor="item-discount">Discount %</label>
            <input type="text" id="item-discount"/>
          </div>
          <div className="form-group">
            <label htmlFor="item-quantity">Quantity</label>
            <input type="number" min="0" id="item-quantity"/>
          </div>
          <div className="form-group">
            <label htmlFor="item-unit-price">Unit Price</label>
            <input type="text" id="item-unit-price"/>
          </div>
          <div className="form-group">
            <label htmlFor="item-total-stock">Total Stock</label>
            <input type="text" id="item-total-stock" tabIndex={-1} disabled placeholder="Auto-generate"/>
          </div>
        </div>
        <div className="buttons row">
          <button type="button" onClick={handleClick} name="add">Add</button>
          <button type="button" onClick={handleClick} name="update">Update</button>
          <button type="button" onClick={handleClick} name="delete">Delete</button>
          <button type="button" onClick={handleClick} name="reset">Reset</button>
        </div>
    </form>
  )
}
