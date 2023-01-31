import { useRef,useEffect,useState } from "react";
import axiosClient from '../../AxiosClient';
import { useStateContext } from "../../contexts/ContextProvider";

export default function Purchase() {
  
  const {setNotification} = useStateContext();
  const [errors, setErrors] = useState(null);
  const purchaseFormRef = useRef();
  const itemNumberRef = useRef();
  const purchaseDateRef = useRef();
  const purchaseIDRef = useRef();
  const itemNameRef = useRef();
  const currentStockRef = useRef();
  const vendorNameRef = useRef();
  const quantityRef = useRef();
  const unitPriceRef = useRef();
  const totalCostRef = useRef();
  const updateButtonRef = useRef();
  const REGEX_NUMBER = /^[0-9]+$/;

  
  useEffect(()=>{
    resetForm();
    axiosClient.get(`/vendors`)
    .then(({data})=>{
      vendorNameRef.current.innerHTML = `<option value="" hidden>--Select Vendor--</option>`;
      Object.values(data.data).forEach(vendor => {
        vendorNameRef.current.innerHTML += `<option value="${vendor.full_name}" id="${vendor.id}">${vendor.full_name}</option>`;
      });
    })
  },[]);

  const handleChange = (event) => {

    if(event.target.name === "item_number"){
      const itemNumber = event.target.value;
      if(itemNumber.match(REGEX_NUMBER))
      {
        quantityRef.current.value = 0;
        const payload = {
          item_number: itemNumber
        }
        axiosClient.post("/item", payload)
          .then(({data})=>{
            itemNameRef.current.value = data.item_name;
            currentStockRef.current.value = data.stock;
            quantityRef.current.setAttribute("max",data.stock);
          })
          .catch(()=>{
            itemNameRef.current.value = "";
            currentStockRef.current.value = "";
          });
      } else 
      {
        itemNameRef.current.value = "";
        currentStockRef.current.value = "";
      }
    }

    if(event.target.name === "id")
    {
      const purchaseID = event.target.value;

      if(purchaseID.match(REGEX_NUMBER))
      {
        axiosClient.get(`/purchases/${purchaseID}`)
          .then(({data})=>{
            displayDataToFormField(data);
            updateButtonRef.current.removeAttribute("disabled");
          })
          .catch(()=>{
            resetForm();
          });
      } else 
      {
        resetForm();
      }
    }

    if(event.target.name === "quantity" || event.target.name === "unit_price")
    {
      totalCostRef.current.value = quantityRef.current.value * unitPriceRef.current.value;
    }
  }
  const handleClick = (event) => {
    event.preventDefault();

    if(event.target.name === "reset")
    {
      purchaseIDRef.current.value = "";
      resetForm();
      return;
    }

    const purchaseFormData = new FormData(purchaseFormRef.current);
    const vendorID = vendorNameRef.current.options[vendorNameRef.current.selectedIndex].id;
    purchaseFormData.append("vendor_id",vendorID);
    if(event.target.name === "add")
    {
      axiosClient.post("/purchases", purchaseFormData)
      .then(()=>{
        setNotification("Successfully added purchase.");
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
  const displayDataToFormField = (data) => {
    itemNumberRef.current.value = data.item_number;
    purchaseDateRef.current.value = data.purchase_date;
    itemNameRef.current.value = data.item_name;
    vendorNameRef.current.value = data.vendor_name;
    quantityRef.current.value = data.quantity;
    unitPriceRef.current.value = data.unit_price;
    totalCostRef.current.value = data.total_cost;
  }
  const resetForm = () => {
    itemNumberRef.current.value = "";
    purchaseDateRef.current.value = "";
    itemNameRef.current.value = "";
    currentStockRef.current.value = "";
    vendorNameRef.current.value = "";
    quantityRef.current.value = 0;
    unitPriceRef.current.value = 0;
    totalCostRef.current.value = 0;
    updateButtonRef.current.value = "";

    updateButtonRef.current.setAttribute("disabled",true);

    setErrors("");
  }

  return (
    <form className="form-tab" id="purchase" ref={purchaseFormRef}>
      {errors && 
        <div className="error-message">
          {Object.keys(errors).map(key=>{
            return <p key={key}>{errors[key][0]}</p>
          })}
        </div>
      }
      <h1>Purchase</h1>
      <div className="row">
        <div className="form-group">
          <label htmlFor="item-number">Item Number</label>
          <input type="text" id="item-number" name="item_number" onChange={handleChange} ref={itemNumberRef}/>
        </div>
        <div className="form-group">
          <label htmlFor="date">Purchase Date</label>
          <input type="date" id="date" name="purchase_date" ref={purchaseDateRef}/>
        </div>
        <div className="form-group">
          <label htmlFor="purchase-id">Purchase ID</label>
          <input type="text" id="purchase-id" name="id" className="id-selector" placeholder="Auto-generate on add" onChange={handleChange} ref={purchaseIDRef}/>
        </div>
      </div>
      <div className="row">
        <div className="form-group">
          <label htmlFor="item-name">Item Name</label>
          <input type="text" id="item-name" name="item_name" placeholder="Auto-generate" readOnly tabIndex={-1} ref={itemNameRef}/>
        </div>
        <div className="form-group">
          <label htmlFor="current-stock">Item Current Stock</label>
          <input type="text" id="current-stock" name="current_stock" placeholder="Auto-generate" readOnly tabIndex={-1} ref={currentStockRef}/>
        </div>
        <div className="form-group">
          <label htmlFor="vendor-name">Vendor Name</label>
          <select name="vendor_name" id="vendor_name" ref={vendorNameRef}>
            <option value="" hidden>--Select Vendor--</option>
          </select>
        </div>
      </div>
      <div className="row">
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input type="number" min="0" id="quantity" name="quantity" onChange={handleChange} ref={quantityRef}/>
        </div>
        <div className="form-group">
          <label htmlFor="unit-price">Unit Price</label>
          <input type="text" id="unit-price" name="unit_price" onChange={handleChange} ref={unitPriceRef}/>
        </div>
        <div className="form-group">
          <label htmlFor="total-cost">Total Cost</label>
          <input type="text" id="total-cost" name="total_cost" placeholder="Auto-generate" readOnly tabIndex={-1} ref={totalCostRef}/>
        </div>
      </div>
      <div className="buttons row">
        <button type="button" name="add" onClick={handleClick}>Add</button>
        <button type="button" name="update" ref={updateButtonRef}>Update</button>
        <button type="button" name="reset" onClick={handleClick}>Reset</button>
      </div>
    </form>
  )
}
