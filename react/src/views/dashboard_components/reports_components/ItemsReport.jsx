import { useRef,useEffect,useState } from 'react';
import axiosClient from '../../../AxiosClient';

export default function ItemsReport() {

  const captionRef = useRef();
  const tbodyRef = useRef();
  const prevButtonRef = useRef();
  const nextButtonRef = useRef();
  const totalUnitPriceRef = useRef();
  
  const [firstLink, setFirstLink] = useState("");
  const [prevLink, setPrevLink] = useState("");
  const [nextLink, setNextLink] = useState("");
  const [lastLink, setLastLink] = useState("");

  useEffect(()=>{
    displayDataToTable();
  },[]);

  const handleClick = (event) => {
    event.preventDefault();
    if(event.target.name === "first")
    {
      const splitedLink = firstLink.split("?");
      displayDataToTable("?"+splitedLink[1]);
    }
    if(event.target.name === "prev")
    {
      const splitedLink = prevLink.split("?");
      displayDataToTable("?"+splitedLink[1]);
    }
    if(event.target.name === "next")
    {
      const splitedLink = nextLink.split("?");
      displayDataToTable("?"+splitedLink[1]);
    }
    if(event.target.name === "last")
    {
      const splitedLink = lastLink.split("?");
      displayDataToTable("?"+splitedLink[1]);
    }
  }
  const displayDataToTable = (params = "") => {
    captionRef.current.innerHTML = "Loading...";
    axiosClient.get("/items"+params)
    .then(({data})=>{
      console.log(data);
      captionRef.current.innerHTML = `Page ${data.meta.current_page} out of ${data.meta.last_page}`;
      tbodyRef.current.innerHTML = "";
      let totalUnitPrice = 0;
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

        totalUnitPrice += parseInt(item.unit_price);
      });

      totalUnitPriceRef.current.innerHTML = totalUnitPrice.toLocaleString("en-US", {style:"currency", currency:"PHP"});
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
    <div className="table-tabs active" id="items-table">
      <h2>Items Report</h2>
      <table>
        <caption ref={captionRef}>Loading...</caption>
        <thead>
          <tr>
            <th>ID</th>
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

      <div className="buttons row">
        <button name="first" onClick={handleClick}>First</button>
        <button name="prev" onClick={handleClick} ref={prevButtonRef}>Prev</button>
        <button name="next" onClick={handleClick} ref={nextButtonRef}>Next</button>
        <button name="last" onClick={handleClick}>Last</button>
      </div>
    </div>
  )
}
