import React from 'react'

export default function Customer() {
  return (
    <form className="form-tab" id="customer">
      <div className="row">
        <div className="form-group">
          <label htmlFor="customer-full-name">Full Name</label>
          <input type="text" id="customer-full-name" name="full_name"/>
        </div>
        <div className="form-group">
          <label htmlFor="customer-status">Status</label>
          <select name="status" id="customer-status">
            <option value="active">Active</option>
            <option value="disabled">Disabled</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="customer-id">Customer ID</label>
          <input type="text" id="customer-id" name="id" className="id-selector" placeholder="Auto-generate on add"/>
        </div>
      </div>
      <div className="row">
        <div className="form-group">
          <label htmlFor="customer-mobile">Mobile Number</label>
          <input type="text" id="customer-mobile" name="mobile"/>
        </div>
        <div className="form-group">
          <label htmlFor="customer-telephone">Telephone Number</label>
          <input type="tel" id="customer-telephone" name="telephone"/>
        </div>
        <div className="form-group">
          <label htmlFor="customer-email">Email Address</label>
          <input type="email" id="customer-email" name="email"/>
        </div>
      </div>
      <div className="row">
        <div className="form-group">
          <label htmlFor="customer-address">Address</label>
          <input type="text" id="customer-address" name="address"/>
        </div>
      </div>
      <div className="row">
        <div className="form-group">
          <label htmlFor="customer-region">Region</label>
          <select name="region" defaultValue="" id="customer-region">
            <option value="" hidden>--Select Region--</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="customer-province">Province</label>
          <select name="province" defaultValue="" id="customer-province">
            <option value="" hidden>--Select Province--</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="customer-city-municipality">City/Municipality</label>
          <select name="city_municipality" defaultValue="" id="customer-city-municipality">
            <option value="" hidden>--Select City/Municipality--</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="customer-barangay">Barangay</label>
          <select name="barangay" defaultValue="" id="customer-barangay">
            <option value="" hidden>--Select Barangay--</option>
          </select>
        </div>
      </div>
      <div className="buttons row">
        <button type="button" name="add">Add</button>
        <button type="button" name="update">Update</button>
        <button type="button" name="delete">Delete</button>
        <button type="button" name="reset">Reset</button>
      </div>
    </form>
  )
}
