import React from 'react'
import CustomersReports from './reports_components/CustomersReports';
import ItemsReport from './reports_components/ItemsReport';
import PurchasesReport from './reports_components/PurchasesReport';
import SalesReport from './reports_components/SalesReport';
import VendorsReport from './reports_components/VendorsReport';

export default function Reports() {

  const handleClick = (event) => {
    event.preventDefault();
    const navLinks = document.querySelectorAll(".table-nav-link");
    for(let i=0; i<navLinks.length; i++)
    {
        navLinks[i].classList.remove("active");
    }
    event.target.classList.add("active");
    const tableTabs = document.querySelectorAll(".table-tabs");
    for(let i=0; i<tableTabs.length; i++)
    {
        tableTabs[i].classList.remove("active");
    }
    if(event.target.name)
    {
        document.getElementById(event.target.name).classList.add("active");
    }
  }
  return (
    <div className="form-tab" id="reports">
      <h1>Reports</h1>
      <div className="row">
        <div className="side-bar">
          <ul>
            <li><a className="table-nav-link active" name="items-table" onClick={handleClick}>Items</a></li>
            <li><a className="table-nav-link" name="vendors-table" onClick={handleClick}>Vendors</a></li>
            <li><a className="table-nav-link" name="customers-table" onClick={handleClick}>Customers</a></li>
            <li><a className="table-nav-link" name="purchases-table" onClick={handleClick}>Purchases</a></li>
            <li><a className="table-nav-link" name="sales-table" onClick={handleClick}>Sales</a></li>
          </ul>
        </div>
        <div className="data-table">
          <ItemsReport />
          <VendorsReport />
          <CustomersReports />
          <PurchasesReport />
          <SalesReport />
        </div>
      </div>
    </div>
  )
}
