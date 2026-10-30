// we will data from https://dummyjson.com/users/
// fetch data- useEffect
// 

import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function UserList()
{
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        fetch("https://dummyjson.com/users")
        .then(res =>res.json())
        .then(data => setUsers(data.users))
    },[]);

    return(
        <>
        <div>
            <h2> Users List</h2>
            {users.map(user => 
                <p key={user.id}> 
                    <Link to ={"/users/"+user.id}> 
                            {user.firstName} {user.lastName}
                    </Link>
                </p>
            )}

        </div>
        </>

    );


}