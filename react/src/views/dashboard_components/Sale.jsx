import { useState,useRef,useEffect } from 'react';
import { useStateContext } from '../../contexts/ContextProvider';
import imageNotAvailable from "../../assets/img/image-not-available.jpg";

export default function Sale() {

  const {setNotification} = useStateContext();
  const [errors, setErrors] = useState(null);
  const saleFormRef = useRef();
  const imageURLRef = useRef();
  const saleDateRef = useRef();
  const saleIDRef = useRef();
  const customerIDRef = useRef();
  const customerNameRef = useRef();
  const itemNumberRef = useRef();
  const itemNameRef = useRef();
  const currentStockRef = useRef();
  const discountRef = useRef();
  const quantityRef = useRef();
  const unitPriceRef = useRef();
  const totalCostRef = useRef();
  const updateButtonRef = useRef();
  const deleteButtonRef = useRef();
  const REGEX_NUMBER = /^[0-9]+$/;

  useEffect(()=>{
    resetForm();
  },[]);

  const handleClick = (event) => {
    //
  }
  const handleChange = (event) => {
    //
  }
  const resetForm = () => {
    imageURLRef.current.setAttribute("src",imageNotAvailable);
    saleDateRef.current.value = "";
    customerIDRef.current.value = "";
    customerNameRef.current.value = "";
    itemNumberRef.current.value = "";
    itemNameRef.current.value = "";
    currentStockRef.current.value = "";
    discountRef.current.value = 0;
    quantityRef.current.value = 0;
    unitPriceRef.current.value = 0;
    totalCostRef.current.value = 0;
    updateButtonRef.current.setAttribute("disabled",true);
    deleteButtonRef.current.setAttribute("disabled",true);
    
    setErrors("");
  }

  return (
    <form className="form-tab" id="sale" ref={saleFormRef}>
      {errors && 
        <div className="error-message">
          {Object.keys(errors).map(key=>{
            return <p key={key}>{errors[key][0]}</p>
          })}
        </div>
      }
      <h1>Sale</h1>
      <div className="row">
        <div className="column-1">
          <label>Image <br />
            <img  ref={imageURLRef} alt="Item image" />
          </label>
        </div>
        <div className="column-2">
          <div className="row">
            <div className="form-group">
              <label htmlFor="date">Sale Date</label>
              <input type="date" id="date" name="sale_date" ref={saleDateRef}/>
            </div>
            <div className="form-group">
              <label htmlFor="sale-id">Purchase ID</label>
              <input type="text" id="sale-id" name="id" className="id-selector" placeholder="Auto-generate on add" onChange={handleChange} ref={saleIDRef}/>
            </div>
          </div>
          <div className="row">
            <div className="form-group">
              <label htmlFor="customer-id">Customer ID</label>
              <input type="text" id="customer-id" name="customer_id" onChange={handleChange} ref={customerIDRef}/>
            </div>
            <div className="form-group">
              <label htmlFor="customer-name">Customer Name</label>
              <input type="text" id="customer-name" name="customer_name" placeholder="Auto-generate" readOnly tabIndex={-1} ref={customerNameRef}/>
            </div>
          </div>
          <div className="row">
            <div className="form-group">
              <label htmlFor="item-number">Item Number</label>
              <input type="text" id="item-number" name="item_number" onChange={handleChange} ref={itemNumberRef}/>
            </div>
            <div className="form-group">
              <label htmlFor="item-name">Item Name</label>
              <input type="text" id="item-name" name="item_name" placeholder="Auto-generate" readOnly tabIndex={-1} ref={itemNameRef}/>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="form-group">
          <label htmlFor="current-stock">Item Current Stock</label>
          <input type="text" id="current-stock" name="current_stock" placeholder="Auto-generate" readOnly tabIndex={-1} ref={currentStockRef}/>
        </div>
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
          <label htmlFor="total-cost">Total Cost</label>
          <input type="text" id="total-cost" name="total_cost" placeholder="Auto-generate" readOnly tabIndex={-1} ref={totalCostRef}/>
        </div>
      </div>
      <div className="buttons row">
        <button type="button" onClick={handleClick} name="add">Add</button>
        <button ref={updateButtonRef} type="button" onClick={handleClick} name="update">Update</button>
        <button ref={deleteButtonRef} type="button" onClick={handleClick} name="delete">Delete</button>
        <button type="button" onClick={handleClick} name="reset">Reset</button>
      </div>
    </form>
  )
}
