
import { Link, Outlet } from "react-router"

function NavBar() {
    return (
        <><div>
            <div className="header" style={{
                backgroundColor: "gray", padding: "20px", color: "white", display: "flex",
                justifyContent: "space-between"
            }}>
                <div >
                    <Link className="link"><h2> Logo</h2></Link>
                </div>
                <div>
                    <ul>
                        <li>
                            <Link to="/"> Home Page</Link>
                        </li>
                        <li>
                            <Link to="/about"> About Us</Link>
                        </li>
                        <li>
                            <Link to="/login"> Login Page</Link>
                        </li>
                        <li>
                            <Link to="/collage"> Collage Portal</Link>
                        </li>

                    </ul>


                </div>

            </div>
            <Outlet/>
            </div>
        </>
    )

}

export default NavBar