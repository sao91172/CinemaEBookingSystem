import React from 'react';

import UserItem from './UserItem';
import Card from '../../Card/Card'
import './UserList.css';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const UsersList = props => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No users found.</h2>
        </Card>
      </div>
    );
  }
  //000217

  return (
    
    <ul className="users-list">
      <h1> Users</h1>
      {props.items.map(user => (
        //<div className = "container">
        <div className="container" key={user.id}>
        <UserItem
          key={user.id}
          id={user.id}
          name={user.name}
          email={user.email}
          password = {user.password}
          isAdmin={user.isAdmin}
          onDelete={props.onDelete}
          onToggleAdmin={props.onToggleAdmin}
        />
        <DeleteOutlineOutlinedIcon style={{color:'black', width:'28px',height:'28px', gap:'500px'}}/>
        </div>
      ))}
    </ul>

  );
};

export default UsersList;