// import React from 'react';

// import UsersList from './UserList';

// const Users = () => {
//   const USERS = [
//     {
//       id: 'u1',
//       name: 'Buzz Lightyear',
//       email: 'buzz.lightyear@email.com',
//       password: 'toinfinity'
//     },
    
//     {
//       id: 'u3',
//       name: 'Woody',
//       email: 'andys.toy@email.com',
//       password: 'snakeinboot'
//     }

//   ];
  
//   return <UsersList items={USERS} />;
// };

// export default Users;
import React from 'react';
import UsersList from './UserList';
//import EditProfile from '../../editProfile/EditProfile.js';

const Users = () => {
  const USERS = [
    {
      id: 'u1',
      name: 'Buzz Lightyear',
      email: 'buzz.lightyear@email.com',
      password: 'toinfinity',
      isAdmin: false, // Add the isAdmin property
    },
    {
      id: 'u3',
      name: 'Woody',
      email: 'andys.toy@email.com',
      password: 'snakeinboot',
      isAdmin: true, // Add the isAdmin property
    }
  ];
  

  return (
    <div>
      <UsersList items={USERS} /> 
    { /*<EditProfile userData={USERS} />
   */ }
    </div>
  );
};

export default Users;

