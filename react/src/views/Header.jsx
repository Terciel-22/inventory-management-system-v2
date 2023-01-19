import { useEffect } from "react";
import axiosClient from "../AxiosClient";
import { useStateContext } from "../contexts/ContextProvider";
import logo from "./../assets/img/personal-logo.png";

export default function Header() {

    const {user, setUser, setToken,} = useStateContext();
    
    const logoutUser = (event) => {
        event.preventDefault();
        axiosClient.post("/logout")
            .then(()=>{
                setUser({});
                setToken(null);
            })
    }

    useEffect(()=>{
        axiosClient.get("/user")
            .then(({data})=>{
                setUser(data);
            })

    },[]);

    const handleClick = (event) => {
        event.preventDefault();
        const navLinks = document.querySelectorAll(".nav-link");
        for(let i=0; i<navLinks.length; i++)
        {
            navLinks[i].classList.remove("active");
        }
        event.target.classList.add("active");
        const formTabs = document.querySelectorAll(".form-tab");
        for(let i=0; i<formTabs.length; i++)
        {
            formTabs[i].classList.remove("active");
        }
        if(event.target.name)
        {
            document.getElementById(event.target.name).classList.add("active");
        }
    }
    return (
        <header>
            <div className="container">
                <nav className="row">
                    <img src={logo} alt="Logo" />
                    <ul>
                        <li><a className="nav-link active" onClick={handleClick} name="item">Item</a></li>
                        <li><a className="nav-link" onClick={handleClick} name="vendor">Vendor</a></li>
                        <li><a className="nav-link" onClick={handleClick} name="customer">Customer</a></li>
                        <li><a className="nav-link" onClick={handleClick} name="purchase">Purchase</a></li>
                        <li><a className="nav-link" onClick={handleClick} name="sale">Sale</a></li>
                        <li><a className="nav-link" onClick={handleClick} name="reports">Reports</a></li>
                        <li><a className="nav-link" onClick={handleClick}>{user.name}</a></li>
                        <li><a className="nav-link" onClick={logoutUser}>Logout</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}
