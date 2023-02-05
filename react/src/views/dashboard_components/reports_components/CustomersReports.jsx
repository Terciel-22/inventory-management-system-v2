import { useRef,useEffect,useState } from 'react';
import axiosClient from '../../../AxiosClient';
import useExportPDF from '../../../customhooks/useExportPDF';

export default function CustomersReport() {

  const [setReport] = useExportPDF();

  const captionRef = useRef();
  const tbodyRef = useRef();
  const prevButtonRef = useRef();
  const nextButtonRef = useRef();
  
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
        title:"Customers Report",
        table_id:"#customersTable",
        filename:"CustomersReport.pdf"
      });
    }
  }
  const displayDataToTable = () => {
    captionRef.current.innerHTML = "Loading...";
    axiosClient.get(`/customers?page_size=${pageSize}&${pageNumber}&${keyword}`)
    .then(({data})=>{

      setMaxPageSize(data.meta.total);

      captionRef.current.innerHTML = `Page ${data.meta.current_page} out of ${data.meta.last_page}`;

      tbodyRef.current.innerHTML = "";
      Object.values(data.data).forEach(customer => {
        tbodyRef.current.innerHTML += `
          <tr>
            <td>${customer.id}</td>
            <td>${customer.full_name}</td>
            <td>${customer.email}</td>
            <td>${customer.mobile}</td>
            <td>${customer.telephone}</td>
            <td>${customer.address}</td>
            <td>${customer.region}</td>
            <td>${customer.province}</td>
            <td>${customer.city_municipality}</td>
            <td>${customer.barangay}</td>
            <td>${customer.status}</td>
          </tr>
        `;
      });
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

  return (
    <div className="table-tabs"  id="customers-table">
      <h2>Customers Report</h2>
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
          <input type="text" id="search" name="search" placeholder="Search name" onChange={handleChange}/>
        </label>
        <div id="printButtons">
          <button name="pdf" onClick={handleClick}>
            Print
          </button>
        </div>
      </div>
      <div className="table-container">
        <table id="customersTable">
          <caption ref={captionRef}>Loading...</caption>
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>Telephone Number</th>
              <th>Address</th>
              <th>Region</th>
              <th>Province</th>
              <th>City/Municipality</th>
              <th>Barangay</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody ref={tbodyRef}></tbody>
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
