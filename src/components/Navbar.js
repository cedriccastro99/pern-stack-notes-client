import React from "react";

export const Navbar = ({user,setAuth}) =>{

    const onLogout = (e) =>{
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false)
    }

    return(
        <>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid mx-5">
                    <a className="navbar-brand" href="#">P.E.R.N NOTES</a>
                    
                    <div className="mt-2 d-flex nav-item dropdown">
                        <h5 className="text-white dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Welcome, {user?.name}
                        </h5>
                        <ul style={{zIndex:1021}} className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                            <li><button className="dropdown-item text-center" onClick={onLogout}>Logout</button></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )

}

export default Navbar;