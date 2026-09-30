
export default function User({name, stid, children}){
    return(
        <>
        <h2> I am a child component: User</h2>
        <h2> Username is : {name} </h2>
       <div>
        {children}
        <h2> Student ID is : {stid}</h2>
        </div>
        </>
    );
}