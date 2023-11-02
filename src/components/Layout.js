import React from 'react';
import { Link, Outlet } from 'react-router-dom';

// Define the Layout component
function Layout() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/book-list">Book List</Link>
          </li>
          <li>
            <Link to="/add-book">Add Book</Link>
          </li>
        </ul>
      </nav>

      <hr />

      {}
      <Outlet />
    </div>
  );
}

// Export the Layout component
export default Layout;




