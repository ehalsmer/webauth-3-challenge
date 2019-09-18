import React, { useState, useEffect } from "react";
import { Input, Button } from "semantic-ui-react";
import axios from "axios";

const Onboard = () => {
  const [newUser, setNewUser] = useState({});

  const handleChange = e => {
    e.preventDefault();
    setNewUser({
      newUser,
      [e.target.name]: e.target.value
    });
  };

  const register = e => {
    e.preventDefault();
    axios
      .post("localhost:6000/api/register", newUser)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={register}>
      <Input
        type="text"
        name="username"
        value={newUser.username}
        placeholder="username"
        onChange={handleChange}
      />
      <Input
        type="text"
        name="password"
        value={newUser.password}
        placeholder="password"
        onChange={handleChange}
      />
      <Button>Join</Button>
    </form>
  );
};

export default Onboard;
