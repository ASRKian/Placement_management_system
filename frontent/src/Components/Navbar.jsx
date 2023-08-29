import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {

    const navigate = useNavigate()
    const [token, setToken] = useState(null)

    useEffect(() => {
        setToken(Cookies.get('token'))
    }, [token])

    const logout = () => {
        navigate('/login')
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Resume Form</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Submit Your Form</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="login">See all submitted forms</Link>
                        </li>
                    </ul>
                    {token && <form className="d-flex" role="search">
                        <button className="btn btn-primary" onClick={logout} type="submit">Logout</button>
                    </form>}
                </div>
            </div>
        </nav>
    )
}
