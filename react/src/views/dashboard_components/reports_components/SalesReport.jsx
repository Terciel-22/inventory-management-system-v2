import { useRef,useEffect,useState } from 'react';
import axiosClient from '../../../AxiosClient';
import useExportPDF from '../../../customhooks/useExportPDF';

export default function SalesReport() {

  const [setReport] = useExportPDF();

  const captionRef = useRef();
  const tbodyRef = useRef();
  const prevButtonRef = useRef();
  const nextButtonRef = useRef();
  const totalQuantityRef = useRef();
  const totalUnitPriceRef = useRef();
  const totalTotalCostRef = useRef();
  
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState("page=1");
  const [maxPageSize, setMaxPageSize] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [firstLink, setFirstLink] = useState("");
  const [prevLink, setPrevLink] = useState("");
  const [nextLink, setNextLink] = useState("");
  const [lastLink, setLastLink] = useState("");

  useEffect(()=>{
    displayDataToTable();
  },[pageSize,pageNumber,keyword]);

  const handleChange = (event) => {
    if(event.target.name === "entries_count")
    {
      setPageSize(event.target.value);
      setPageNumber(1);
    }
    if(event.target.name === "search")
    {
      setKeyword(`keyword=${event.target.value}`);
      setPageNumber(1);
    }
  }
  const handleClick = (event) => {
    event.preventDefault();
    if(event.target.name === "first")
    {
      const splitedLink = firstLink.split("?");
      setPageNumber(splitedLink[1]);
    }
    if(event.target.name === "prev")
    {
      const splitedLink = prevLink.split("?");
      setPageNumber(splitedLink[1]);
    }
    if(event.target.name === "next")
    {
      const splitedLink = nextLink.split("?");
      setPageNumber(splitedLink[1]);
    }
    if(event.target.name === "last")
    {
      const splitedLink = lastLink.split("?");
      setPageNumber(splitedLink[1]);
    }

    if(event.target.name === "pdf")
    {
      setReport({
        title:"Sales Report",
        table_id:"#salesTable",
        filename:"SalesReport.pdf"
      });
    }
  }
  const displayDataToTable = () => {
    captionRef.current.innerHTML = "Loading...";
    axiosClient.get(`/sales?page_size=${pageSize}&${pageNumber}&${keyword}`)
    .then(({data})=>{

      setMaxPageSize(data.meta.total);

      captionRef.current.innerHTML = `Page ${data.meta.current_page} out of ${data.meta.last_page}`;

      tbodyRef.current.innerHTML = "";
      let pageTotalQuantity_int = 0;
      let pageTotalUnitPrice_float = 0;
      let pageTotalTotalCost_float = 0;
      Object.values(data.data).forEach(sale => {
        tbodyRef.current.innerHTML += `
          <tr>
            <td>${sale.id}</td>
            <td>${sale.item_number}</td>
            <td>${sale.customer_id}</td>
            <td>${sale.customer_name}</td>
            <td>${sale.item_name}</td>
            <td>${sale.sale_date}</td>
            <td>${sale.discount}</td>
            <td>${sale.quantity}</td>
            <td>${sale.unit_price}</td>
            <td>${sale.total_cost}</td>
          </tr>
        `;

        pageTotalQuantity_int += parseInt(sale.quantity);
        pageTotalUnitPrice_float += parseFloat(sale.unit_price);
        pageTotalTotalCost_float += parseFloat(sale.total_cost);
      });

      const pageTotalUnitPrice_str = pageTotalUnitPrice_float.toLocaleString("en-US");
      const pageTotalTotalCost_str = pageTotalTotalCost_float.toLocaleString("en-US");
      
      displayTotalQuantity(pageTotalQuantity_int);
      displayTotalUnitPrice(pageTotalUnitPrice_str);
      displayTotalTotalCost(pageTotalTotalCost_str);
      
      setFirstLink(data.links.first);
      setLastLink(data.links.last);

      if(data.links.prev === null)
      {
        prevButtonRef.current.setAttribute("disabled",true);
      }else 
      {
        prevButtonRef.current.removeAttribute("disabled");
        setPrevLink(data.links.prev);
      }
      if(data.links.next === null)
      {
        nextButtonRef.current.setAttribute("disabled",true);
      }else 
      {
        nextButtonRef.current.removeAttribute("disabled");
        setNextLink(data.links.next);
      }
    })
  }
  const displayTotalQuantity = (pageTotalQuantity_int) => {
    totalQuantityRef.current.innerHTML = "Loading...";
    axiosClient.get("/sales-total-quantity")
    .then(({data})=>{
      totalQuantityRef.current.innerHTML = `${pageTotalQuantity_int} <br/> (${data.total_quantity} Total)`;
    })
  }
  const displayTotalUnitPrice = (pageTotalUnitPrice_str) => {
    totalUnitPriceRef.current.innerHTML = "Loading...";
    axiosClient.get("/sales-total-unit-price")
    .then(({data})=>{
      const totalOfAllUnitPrice_float = parseFloat(data.total_unit_price);
      const totalOfAllUnitPrice_str = totalOfAllUnitPrice_float.toLocaleString("en-US");
      totalUnitPriceRef.current.innerHTML = `PHP ${pageTotalUnitPrice_str} <br/> (PHP ${totalOfAllUnitPrice_str} Total)`;
    })
  }
  const displayTotalTotalCost = (pageTotalTotalCost_str) => {
    totalTotalCostRef.current.innerHTML = "Loading...";
    axiosClient.get("/sales-total-total-cost")
    .then(({data})=>{
      const totalOfAllTotalCost_float = parseFloat(data.total_total_cost);
      const totalOfAllTotalCost_str = totalOfAllTotalCost_float.toLocaleString("en-US");
      totalTotalCostRef.current.innerHTML = `PHP ${pageTotalTotalCost_str} <br/> (PHP ${totalOfAllTotalCost_str} Total)`;
    })
  }

  return (
    <div className="table-tabs" id="sales-table">
      <h2>Sales Report</h2>
      <div className="row">
        <label htmlFor="entries-count">Show &nbsp;
          <select name="entries_count" id="entries-count" onChange={handleChange}>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value={maxPageSize}>All</option>
          </select>
          &nbsp; entries
        </label>
        <label htmlFor="search">
          Search&nbsp;
          <input type="text" id="search" name="search" placeholder="Search item or customer" onChange={handleChange}/>
        </label>
        <div id="printButtons">
          <button name="pdf" onClick={handleClick}>
            Print
          </button>
        </div>
      </div>
      <div className="table-container">
        <table id="salesTable">
          <caption ref={captionRef}>Loading...</caption>
          <thead>
            <tr>
              <th>Sale ID</th>
              <th>Item Number</th>
              <th>Customer ID</th>
              <th>Customer Name</th>
              <th>Item Name</th>
              <th>Sale Date</th>
              <th>Discount %</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total Cost</th>
            </tr>
          </thead>
          <tbody ref={tbodyRef}></tbody>
          <tfoot>
            <tr>
              <td colSpan={7}>Total:</td>
              <td ref={totalQuantityRef}></td>
              <td ref={totalUnitPriceRef}></td>
              <td ref={totalTotalCostRef}></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="buttons row">
        <button name="first" onClick={handleClick}>First</button>
        <button name="prev" onClick={handleClick} ref={prevButtonRef}>Prev</button>
        <button name="next" onClick={handleClick} ref={nextButtonRef}>Next</button>
        <button name="last" onClick={handleClick}>Last</button>
      </div>
    </div>
  )
}
