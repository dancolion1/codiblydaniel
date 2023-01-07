import React from "react";

class User extends React.Component {
    componentWillUnmount() {
       alert('Deleted User successfully');
    }
    render() {
       return (
          <div>
             <h3>Username: Dancolion</h3>
             <h3>Email: danieloleabhiele@gmail.com</h3>
          </div>
       );
    }
 }

 export default User;