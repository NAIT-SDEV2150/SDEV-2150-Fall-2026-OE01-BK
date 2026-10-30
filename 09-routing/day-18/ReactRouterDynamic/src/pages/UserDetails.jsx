import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function UserDetails() {

  {/*
    useParams() (VERY IMPORTANT)

    This hook reads dynamic values from URL.

    From route:
    "/users/:id"

    If URL = /users/7
    then:
    id = "7"
  */}

  const { id } = useParams();
  console.log(id);

  const [user, setUser] = useState(null);

  useEffect(() => {
     {/*
      USING DYNAMIC PARAM IN API CALL

      We use the id from URL to fetch specific user

      Example:
      id = 5 → fetch(".../users/5")

      So each URL loads different data dynamically
    */}

    fetch(`https://dummyjson.com/users/${id}`)
      .then(res => res.json())
      .then(data => setUser(data));

  }, [id]);

   // dependency ensures:
  // if URL changes (e.g., /users/2 → /users/3),
  // data will re-fetch automatically

  if (!user) return <p>Loading...</p>;

  return (
    <>
      <div>

        <h2>User Details</h2>

        <p>Name: {user.firstName} {user.lastName}</p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Age: {user.age}</p>

      </div>
      <div> 
        <Link to ="/users"> Back </Link>
      </div>
    </>
  );
}

export default UserDetails;