import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

export default function UserDetails()
{
    const { id } = useParams();

    const [user , setUser] = useState(null);

     useEffect(()=>{
        fetch(`https://dummyjson.com/users/${id}`)
        .then(res =>res.json())
        .then(data => setUser(data))
    },[id]);

    // display 

    if (!user) return <p> Loading.............</p>

    return(
        <>
        <div>
            <h2> User Details</h2>
            <p> Name: {user.firstName} {user.LastName}</p>
            <p> Email: {user.email}</p>
            <p> Phone: {user.phone} </p>
        </div>
        <div>
            <Link to = "/users"> Back to Users List </Link>
        </div>
        </>
    );
}