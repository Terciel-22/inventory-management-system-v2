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

    const handleClick = (e) => {
        e.preventDefault();
        console.log(user);
    }
    return (
        <header>
            <div className="container">
                <nav>
                    <img src={logo} alt="Logo" />
                    <ul>
                        <li><a href="#">Item</a></li>
                        <li><a href="#">Vendor</a></li>
                        <li><a href="#">Customer</a></li>
                        <li><a href="#">Purchase</a></li>
                        <li><a href="#">Sale</a></li>
                        <li><a href="#">Reports</a></li>
                        <li><a href="#" onClick={handleClick}>{user.name}</a></li>
                        <li><a href="#" onClick={logoutUser}>Logout</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}
