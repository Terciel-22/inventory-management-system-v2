import { useRef,useEffect,useState } from 'react';
import axiosClient from '../../../AxiosClient';
import useExportPDF from '../../../customhooks/useExportPDF';

export default function ItemsReport() {

  const [setReport] = useExportPDF();

  const captionRef = useRef();
  const tbodyRef = useRef();
  const prevButtonRef = useRef();
  const nextButtonRef = useRef();
  const totalUnitPriceRef = useRef();
  
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
        title:"Items Report",
        table_id:"#itemsTable",
        filename:"ItemsReport.pdf"
      });
    }
  }
  const displayDataToTable = () => {
    captionRef.current.innerHTML = "Loading...";
    axiosClient.get(`/items?page_size=${pageSize}&${pageNumber}&${keyword}`)
    .then(({data})=>{

      setMaxPageSize(data.meta.total);

      captionRef.current.innerHTML = `Page ${data.meta.current_page} out of ${data.meta.last_page}`;

      tbodyRef.current.innerHTML = "";
      let pageTotalUnitPrice_float = 0;
      Object.values(data.data).forEach(item => {
        tbodyRef.current.innerHTML += `
          <tr>
            <td>${item.id}</td>
            <td>${item.item_number}</td>
            <td>${item.item_name}</td>
            <td>${item.stock}</td>
            <td>${item.discount}</td>
            <td>${item.unit_price}</td>
            <td>${item.status}</td>
            <td>${item.created_at}</td>
          </tr>
        `;

        pageTotalUnitPrice_float += parseFloat(item.unit_price);
      });
      const pageTotalUnitPrice_str = pageTotalUnitPrice_float.toLocaleString("en-US");
      
      displayTotalUnitPrice(pageTotalUnitPrice_str);
      
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
  const displayTotalUnitPrice = (pageTotalUnitPrice_str) => {
    totalUnitPriceRef.current.innerHTML = "Loading...";
    axiosClient.get("/items-total-unit-price")
    .then(({data})=>{
      const totalOfAllUnitPrice_float = parseFloat(data.total_unit_price);
      const totalOfAllUnitPrice_str = totalOfAllUnitPrice_float.toLocaleString("en-US");
      totalUnitPriceRef.current.innerHTML = `PHP ${pageTotalUnitPrice_str} <br/> (PHP ${totalOfAllUnitPrice_str} Total)`;
    })
  }

  return (
    <div className="table-tabs active" id="items-table">
      <h2>Items Report</h2>
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
          <input type="text" id="search" name="search" placeholder="Search item name" onChange={handleChange}/>
        </label>
        <div id="printButtons">
          <button name="pdf" onClick={handleClick}>
            Print
          </button>
        </div>
      </div>
      <div className="table-container">
        <table id="itemsTable">
          <caption ref={captionRef}>Loading...</caption>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Item Number</th>
              <th>Item Name</th>
              <th>Stock</th>
              <th>Discount %</th>
              <th>Unit Price</th>
              <th>Status</th>
              <th>Date Created</th>
            </tr>
          </thead>
          <tbody ref={tbodyRef}></tbody>
          <tfoot>
            <tr>
              <td colSpan={5}>Total:</td>
              <td ref={totalUnitPriceRef}></td>
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
