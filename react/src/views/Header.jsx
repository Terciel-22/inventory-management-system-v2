import logo from "./../assets/img/personal-logo.png";

export default function Header(props) {

    const logoutUser = (event) => {
        event.preventDefault();
        alert("Log out");
    }

    return (
        <header>
            <div className="container">
                <nav>
                    <img src={logo} alt="Logo" />
                    <ul>
                        <li><a href="">Item</a></li>
                        <li><a href="">Vendor</a></li>
                        <li><a href="">Customer</a></li>
                        <li><a href="">Purchase</a></li>
                        <li><a href="">Sale</a></li>
                        <li><a href="">Reports</a></li>
                        <li><a href="">{props.user.name}</a></li>
                        <li><a href="" onClick={logoutUser}>Logout</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}
