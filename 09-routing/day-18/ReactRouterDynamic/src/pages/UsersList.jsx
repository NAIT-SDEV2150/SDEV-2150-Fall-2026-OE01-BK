
import { useState,useEffect } from "react";
import { Link, useParams } from "react-router";
function UsersList() {
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        fetch("https://dummyjson.com/users")
            .then(res => res.json())
            .then(data => setUsers(data.users));
    }, []);

    return (
        <div>
            <h2>Users List </h2>
              {/*
              🔥 DYNAMIC LINK GENERATION

              For each user, we create a unique URL:
              /users/{user.id}

              Example:
              user.id = 3 → /users/3

              This matches the dynamic route in App.jsx:
              "/users/:id"

              So clicking the link:
              - changes URL
              - loads UserDetails component
              - passes id = 3
            */}

            {users.map(user => (
                <p >
                    <Link to ={"/users/"+user.id}>{user.firstName} {user.lastName}</Link> 
                </p>
            ))}

        </div>
    );
}



export default UsersList
