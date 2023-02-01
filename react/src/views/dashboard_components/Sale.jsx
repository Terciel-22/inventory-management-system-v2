import { useState,useRef,useEffect } from 'react';
import { useStateContext } from '../../contexts/ContextProvider';
import imageNotAvailable from "../../assets/img/image-not-available.jpg";
import axiosClient from '../../AxiosClient';

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
  const newStockRef = useRef();
  const unitPriceRef = useRef();
  const totalCostRef = useRef();
  const updateButtonRef = useRef();
  const deleteButtonRef = useRef();
  const REGEX_NUMBER = /^[0-9]+$/;

  useEffect(()=>{
    resetForm();
  },[]);

  const handleClick = (event) => {
    event.preventDefault();

    if(event.target.name === "reset")
    {
      saleIDRef.current.value = "";
      resetForm();
      return;
    }
    if(event.target.name === "delete")
    {
      if(window.confirm("Are you sure you want to delete this sale?"))
      {
        axiosClient.delete(`/sales/${saleIDRef.current.value}`)
        .then(()=>{
          setNotification("Successfully deleted sale.");
          resetForm();
        })
      }
      return;
    }

    const saleFormData = new FormData(saleFormRef.current);

    if(event.target.name === "add")
    {
      axiosClient.post("/sales", saleFormData)
      .then(()=>{
        setNotification("Successfully added sale.");
        setErrors("");
      })
      .catch(error=>{
        const response = error.response;
        if(response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
    }

    if(event.target.name === "update")
    {
      axiosClient.post(`/sales/${saleIDRef.current.value}?_method=PUT`, saleFormData)
      .then(()=>{
        setNotification("Successfully updated sale.");
        setErrors("");
      })
      .catch(error=>{
        const response = error.response;
        if(response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
    }
  }

  const handleChange = (event) => {
    if(event.target.name === "id")
    {
      const saleID = event.target.value;
      if(saleID.match(REGEX_NUMBER))
      {
        axiosClient.get(`/sales/${saleID}`)
          .then(({data})=>{
            displayDataToFormField(data);
            updateButtonRef.current.removeAttribute("disabled");
            deleteButtonRef.current.removeAttribute("disabled");
          })
          .catch(()=>{
            resetForm();
          });
      } else 
      {
        resetForm();
      }
    }
    if(event.target.name === "customer_id")
    {
      const customerID = event.target.value;
      if(customerID.match(REGEX_NUMBER))
      {
        axiosClient.get(`/customers/${customerID}`)
          .then(({data})=>{
            if(data.status === "active")
            {
              customerNameRef.current.value = data.full_name;
            } else 
            {
              customerNameRef.current.value = "";
            }
          })
          .catch(()=>{
            customerNameRef.current.value = "";
          });
      } else 
      {
        customerNameRef.current.value = "";
      }
    }
    if(event.target.name === "item_number")
    {
      const itemNumber = event.target.value;
      if(itemNumber.match(REGEX_NUMBER))
      {
        quantityRef.current.value = 0;
        const payload = {
          item_number: itemNumber
        }
        axiosClient.post("/item", payload)
          .then(({data})=>{
            if(data.status === "active")
            {
              itemNameRef.current.value = data.item_name;
              currentStockRef.current.value = data.stock;
              quantityRef.current.setAttribute("max",data.stock);
              imageURLRef.current.setAttribute("src",data.image_url);
            } else 
            {
              itemNameRef.current.value = "";
              currentStockRef.current.value = "";
              imageURLRef.current.setAttribute("src",imageNotAvailable);
            }
          })
          .catch(()=>{
            itemNameRef.current.value = "";
            currentStockRef.current.value = "";
            imageURLRef.current.setAttribute("src",imageNotAvailable);
          });
      } else 
      {
        itemNameRef.current.value = "";
        currentStockRef.current.value = "";
        imageURLRef.current.setAttribute("src",imageNotAvailable);
      }
    }
    if(event.target.name === "discount" || event.target.name === "quantity" || event.target.name === "unit_price")
    {
      newStockRef.current.value = parseInt(currentStockRef.current.value) - parseInt(quantityRef.current.value);
      totalCostRef.current.value = (quantityRef.current.value * unitPriceRef.current.value) - ((quantityRef.current.value * unitPriceRef.current.value) * (discountRef.current.value / 100));
    }
  }
  const displayDataToFormField = (data) => {
    imageURLRef.current.setAttribute("src",data.item.image_url);
    saleDateRef.current.value = data.sale.sale_date;
    customerIDRef.current.value = data.sale.customer_id;
    customerNameRef.current.value = data.sale.customer_name;
    itemNumberRef.current.value = data.sale.item_number;
    itemNameRef.current.value = data.sale.item_name;
    currentStockRef.current.value = data.item.stock;
    discountRef.current.value = data.sale.discount;
    quantityRef.current.value = data.sale.quantity;
    unitPriceRef.current.value = data.sale.unit_price;
    totalCostRef.current.value = data.sale.total_cost;

    itemNumberRef.current.setAttribute("readOnly",true);
    quantityRef.current.setAttribute("readOnly",true);
    updateButtonRef.current.removeAttribute("disabled");
    deleteButtonRef.current.removeAttribute("disabled");
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

    itemNumberRef.current.removeAttribute("readOnly");
    quantityRef.current.removeAttribute("readOnly");
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
          <label>Item Image<br />
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
              <label htmlFor="sale-id">Sale ID</label>
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
          <input ref={discountRef} type="text" id="item-discount" name="discount" onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="item-quantity">Quantity</label>
          <input ref={quantityRef} type="number" min="0" id="item-quantity" name="quantity"  onChange={handleChange}/>
          <input type="hidden" name="new_stock" ref={newStockRef}/>
        </div>
        <div className="form-group">
          <label htmlFor="item-unit-price">Unit Price</label>
          <input ref={unitPriceRef} type="text" id="item-unit-price" name="unit_price" onChange={handleChange}/>
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
