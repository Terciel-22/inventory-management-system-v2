import React from 'react'
import Item from './dashboard_components/Item'
import Customer from './dashboard_components/Customer'
import Vendor from './dashboard_components/Vendor'
import Purchase from './dashboard_components/Purchase'
import Sale from './dashboard_components/Sale'
import Reports from './dashboard_components/Reports'

export default function Dashboard() {
  return (
    <div className="container">
      <Item />
      <Vendor />
      <Customer />
      <Purchase />
      <Sale />
      <Reports />
    </div>
  )
}
 