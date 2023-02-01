import { useRef,useEffect,useState } from 'react';
import axiosClient from '../../AxiosClient';
import { useStateContext } from '../../contexts/ContextProvider';

export default function Vendor(){

  const {setNotification} = useStateContext();
  const [errors, setErrors] = useState(null);
  const vendorFormRef = useRef();
  const fullNameRef = useRef();
  const statusRef = useRef();
  const vendorIDRef = useRef();
  const mobileRef = useRef();
  const telephoneRef = useRef();
  const emailRef = useRef();
  const addressRef = useRef();
  const regionRef = useRef();
  const provinceRef = useRef();
  const cityMunicipalityRef = useRef();
  const barangayRef = useRef();
  const updateButtonRef = useRef();
  const deleteButtonRef = useRef();
  const NCR_CODE = "130000000";
  const REGEX_NUMBER = /^[0-9]+$/;

  useEffect(()=>{
    resetForm();

    fetch(`https://psgc.gitlab.io/api/regions/`)
      .then(response => response.json())
      .then((regions)=>{
        regionRef.current.innerHTML = `<option value="" hidden>--Select Region--</option>`;
        Object.values(regions).forEach(region => {
          regionRef.current.innerHTML += `<option value="${region.name}" id="${region.code}">${region.name}</option>`;
        });
      })
  },[]);
  
  const handleClick = (event) => {
    event.preventDefault();
    
    if(event.target.name === "reset")
    {
      vendorIDRef.current.value = "";
      resetForm();
      return;
    }
    
    if (event.target.name === "delete")
    {
      if(window.confirm("Are you sure you want to delete this vendor?"))
      {
        axiosClient.delete(`/vendors/${vendorIDRef.current.value}`)
        .then(()=>{
          setNotification("Successfully deleted vendor.");
          resetForm();
        })
      }
      return;
    }

    const vendorFormData = new FormData(vendorFormRef.current);
    if(regionRef.current.value === "NCR")
    {
      vendorFormData.append("province","")
    } 
    
    if(event.target.name === "add")
    {
      axiosClient.post(`/vendors`,vendorFormData)
      .then(()=>{
        setNotification("Successfully added vendor.");
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
      axiosClient.post(`/vendors/${vendorIDRef.current.value}?_method=PUT`,vendorFormData)
      .then(()=>{
        setNotification("Successfully updated vendor.");
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
    if(event.target.name === "id"){
      const vendorID = event.target.value;

      if(vendorID.match(REGEX_NUMBER))
      {
        axiosClient.get(`/vendors/${vendorID}`)
          .then(({data})=>{
            displayDataToFormField(data);
          })
          .catch(()=>{
            resetForm();
          });
      } else 
      {
        resetForm();
      }
    }
    else if (event.target.name === "region")
    {
      provinceRef.current.setAttribute("disabled",true);
      provinceRef.current.innerHTML = `<option value="" hidden>--Select Province--</option>`;
      cityMunicipalityRef.current.setAttribute("disabled",true);
      cityMunicipalityRef.current.innerHTML = `<option value="" hidden>--Select City/Municipality--</option>`;
      barangayRef.current.setAttribute("disabled",true);
      barangayRef.current.innerHTML = `<option value="" hidden>--Select Barangay--</option>`;
      const regionCode = event.target.options[event.target.selectedIndex].id;

      if(regionCode !== NCR_CODE)
      {
        getProvinces(regionCode);
      }else {
        provinceRef.current.innerHTML = `<option value="" hidden>--Select Province--</option>`;
        getCityAndMunicipalities(regionCode);
      }
    }
    else if (event.target.name === "province")
    {
      cityMunicipalityRef.current.setAttribute("disabled",true);
      cityMunicipalityRef.current.innerHTML = `<option value="" hidden>--Select City/Municipality--</option>`;
      barangayRef.current.setAttribute("disabled",true);
      barangayRef.current.innerHTML = `<option value="" hidden>--Select Barangay--</option>`;

      const provinceCode = event.target.options[event.target.selectedIndex].id;
      getCityAndMunicipalities(provinceCode);
    }
    else if (event.target.name === "city_municipality")
    {
      barangayRef.current.setAttribute("disabled",true);
      barangayRef.current.innerHTML = `<option value="" hidden>--Select Barangay--</option>`;

      const cityMunicipalityCode = event.target.options[event.target.selectedIndex].id;
      getBarangays(cityMunicipalityCode);
    }
  }
  const getProvinces = async (regionCode) => {
    return fetch(`https://psgc.gitlab.io/api/regions/${regionCode}/provinces/`)
      .then(response => response.json())
      .then((provinces)=>{
        Object.values(provinces).forEach(province => {
          provinceRef.current.innerHTML += `<option value="${province.name}" id="${province.code}">${province.name}</option>`;
        });
      })
      .then(()=>{
        provinceRef.current.removeAttribute("disabled");
      });
  }
  const getCityAndMunicipalities = async (provinceCode) => {
    let url = "";
    if(provinceCode === NCR_CODE)
    {
      url = `https://psgc.gitlab.io/api/regions/${provinceCode}/cities-municipalities/`;
    } else 
    {
      url = `https://psgc.gitlab.io/api/provinces/${provinceCode}/cities-municipalities/`;
    }
    return fetch(url)
      .then(response => response.json())
      .then((cities)=>{
        Object.values(cities).forEach(city => {
          cityMunicipalityRef.current.innerHTML += `<option value="${city.name}" id="${city.code}">${city.name}</option>`;
        });
      })
      .then(()=>{
        cityMunicipalityRef.current.removeAttribute("disabled");
      });
  }
  const getBarangays = async (cityMunicipalityCode) => {
    return fetch(`https://psgc.gitlab.io/api/cities-municipalities/${cityMunicipalityCode}/barangays/`)
      .then(response => response.json())
      .then((barangays)=>{
        Object.values(barangays).forEach(barangay => {
          barangayRef.current.innerHTML += `<option value="${barangay.name}" id="${barangay.code}">${barangay.name}</option>`;
        });
      })
      .then(()=>{
        barangayRef.current.removeAttribute("disabled");
      });
  }
  const displayDataToFormField = async (data) => {

    resetForm();
    updateButtonRef.current.removeAttribute("disabled");
    deleteButtonRef.current.removeAttribute("disabled");

    fullNameRef.current.value = data.full_name;
    statusRef.current.value = data.status;
    mobileRef.current.value = data.mobile;
    telephoneRef.current.value = data.telephone;
    emailRef.current.value = data.email;
    addressRef.current.value = data.address;
    regionRef.current.value = await data.region;
    const regionCode = await regionRef.current.options[regionRef.current.selectedIndex].id;

    if(regionCode !== NCR_CODE)
    {
      await getProvinces(regionCode);
      provinceRef.current.value = await data.province;
      const provinceCode = await provinceRef.current.options[provinceRef.current.selectedIndex].id;
      provinceRef.current.removeAttribute("disabled");

      await getCityAndMunicipalities(provinceCode);
      cityMunicipalityRef.current.value = await data.city_municipality;
      const cityMunicipalityCode = await cityMunicipalityRef.current.options[cityMunicipalityRef.current.selectedIndex].id;

      await getBarangays(cityMunicipalityCode);
      barangayRef.current.value = await data.barangay;
    } else 
    {
      await getCityAndMunicipalities(regionCode);
      cityMunicipalityRef.current.value = await data.city_municipality;
      const cityMunicipalityCode = await cityMunicipalityRef.current.options[cityMunicipalityRef.current.selectedIndex].id;
      
      await getBarangays(cityMunicipalityCode);
      barangayRef.current.value = await data.barangay;
    }
    cityMunicipalityRef.current.removeAttribute("disabled");
    barangayRef.current.removeAttribute("disabled");
  }
  const resetForm = () => {
    fullNameRef.current.value = "";
    statusRef.current.value = "";
    mobileRef.current.value = "";
    telephoneRef.current.value = "";
    emailRef.current.value = "";
    addressRef.current.value = "";
    regionRef.current.value = "";
    provinceRef.current.value = "";
    cityMunicipalityRef.current.value = "";
    barangayRef.current.value = "";
    
    provinceRef.current.innerHTML = `<option value="" hidden>--Select Province--</option>`;
    cityMunicipalityRef.current.innerHTML = `<option value="" hidden>--Select City/Municipality--</option>`;
    barangayRef.current.innerHTML = `<option value="" hidden>--Select Barangay--</option>`;
    provinceRef.current.setAttribute("disabled",true);
    cityMunicipalityRef.current.setAttribute("disabled",true);
    barangayRef.current.setAttribute("disabled",true);

    updateButtonRef.current.setAttribute("disabled",true);
    deleteButtonRef.current.setAttribute("disabled",true);

    setErrors("");
  }

  return (
    <form className="form-tab" id="vendor" ref={vendorFormRef}>
      {errors && 
        <div className="error-message">
          {Object.keys(errors).map(key=>{
            return <p key={key}>{errors[key][0]}</p>
          })}
        </div>
      }
      <h1>Vendor</h1>
      <div className="row">
        <div className="form-group">
          <label htmlFor="vendor-full-name">Full Name</label>
          <input type="text" id="vendor-full-name" name="full_name" ref={fullNameRef}/>
        </div>
        <div className="form-group">
          <label htmlFor="vendor-status">Status</label>
          <select name="status" id="vendor-status" ref={statusRef}>
            <option value="" hidden>--Select Status--</option>
            <option value="active">Active</option>
            <option value="disabled">Disabled</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="vendor-id">Vendor ID</label>
          <input type="text" id="vendor-id" name="id" className="id-selector" placeholder="Auto-generate on add" onChange={handleChange} ref={vendorIDRef}/>
        </div>
      </div>
      <div className="row">
        <div className="form-group">
          <label htmlFor="vendor-mobile">Mobile Number</label>
          <input type="text" id="vendor-mobile" name="mobile" ref={mobileRef}/>
        </div>
        <div className="form-group">
          <label htmlFor="vendor-telephone">Telephone Number</label>
          <input type="tel" id="vendor-telephone" name="telephone" ref={telephoneRef}/>
        </div>
        <div className="form-group">
          <label htmlFor="vendor-email">Email Address</label>
          <input type="email" id="vendor-email" name="email" ref={emailRef}/>
        </div>
      </div>
      <div className="row">
        <div className="form-group">
          <label htmlFor="vendor-address">Address</label>
          <input type="text" id="vendor-address" name="address" ref={addressRef}/>
        </div>
      </div>
      <div className="row">
        <div className="form-group">
          <label htmlFor="vendor-region">Region</label>
          <select name="region" defaultValue="" id="vendor-region" ref={regionRef} onChange={handleChange}>
            <option value="" hidden>--Select Region--</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="vendor-province">Province</label>
          <select name="province" defaultValue="" id="vendor-province" ref={provinceRef} onChange={handleChange}>
            <option value="" hidden>--Select Province--</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="vendor-city-municipality">City/Municipality</label>
          <select name="city_municipality" defaultValue="" id="vendor-city-municipality" ref={cityMunicipalityRef} onChange={handleChange}>
            <option value="" hidden>--Select City/Municipality--</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="vendor-barangay">Barangay</label>
          <select name="barangay" defaultValue="" id="vendor-barangay" ref={barangayRef}>
            <option value="" hidden>--Select Barangay--</option>
          </select>
        </div>
      </div>
      <div className="buttons row">
        <button type="button" name="add" onClick={handleClick}>Add</button>
        <button ref={updateButtonRef} type="button" name="update" onClick={handleClick}>Update</button>
        <button ref={deleteButtonRef} type="button" name="delete" onClick={handleClick}>Delete</button>
        <button type="button" name="reset" onClick={handleClick}>Reset</button>
      </div>
    </form>
  )
}
