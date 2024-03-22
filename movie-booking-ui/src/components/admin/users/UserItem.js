import React from 'react';
//import Card from '../../Card/Card';

import './UserItem.css';

const UserItem = props => {
  //console.log(props);

  const handleDeleteClick = () => {
    // Implement your delete logic here, maybe by calling a function passed through props
    props.onDelete(props.id);
  };

  const handleToggleAdmin = () => {
    // Implement logic to toggle user admin status
    props.onToggleAdmin(props.id);
  };

  return (
    <li className="user-item">
      
      <div className="user-item__info">
      <h2>{props.name}</h2>
      <h2>{props.email}</h2>
      <h2> {props.password}</h2>
      {props.isAdmin ? (
          <button className="revoke-admin-button" onClick={handleToggleAdmin}>
            Remove Admin
          </button>
        ) : (
          <button className="make-admin-button" onClick={handleToggleAdmin}>
            Make Admin
          </button>
        )}
      <button className="delete-button" onClick={handleDeleteClick}>
        Delete
      </button>
      </div>

        {/* <Link to={`/${props.id}/places`}>
          <div className="user-item__image">
            <Avatar image={props.image} alt={props.name} />
          </div>
          <div className="user-item__info">
            <h2>{props.name}</h2>
            <h3>
              {props.placeCount} {props.placeCount === 1 ? 'Place' : 'Places'}
            </h3>
          </div>
        </Link> */}
      
    </li>
  );
};

export default UserItem;