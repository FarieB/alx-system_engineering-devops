import React from 'react';
import UsersList from './components/UsersList'; // Import the UsersList component

const App = () => {
  return (
    <div>
      <h1>Welcome to the Insurance Comparison App</h1>
      <UsersList /> {/* Use the UsersList component */}
    </div>
  );
};

export default App;
