import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const UserList = () => {
  const [users, setUsers] = useState([]);
   

  useEffect(() => {
    getUsers();
  }, []);

  // const getUsers = async () => {
  //   const response = await axios.get(`http://localhost:5000/users`);
  //   setUsers(response.data);
  // };

  const getUsers = async () => {
    const response = await axios.get(`http://localhost:5000/users`);
    setUsers(response.data);
  };

  const deleteUser = async (userId) => {
    swal({
      title: "Hapus User!",
      text: "You clicked the button!",
      icon: "success",
      button: "Aww yiss!",
    });
    await axios.delete(`http://localhost:5000/user/${userId}`);
    getUsers();
  };

 
  

  return (
    <div>
      <h1 className="title">Users</h1>
      <Link to="/users/add" className="button is-primary mb-2">
        Add New
      </Link>
      <h2 className="subtitle">List of Users</h2>

      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.uuid}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Link
                  to={`/users/edit/${user.uuid}`}
                  className="button is-small is-info"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteUser(user.uuid)}
                  className="button is-small is-danger"
                >
                  Hapus
                </button>
              </td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
