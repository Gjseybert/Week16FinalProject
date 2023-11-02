import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, ListGroup, Alert } from 'react-bootstrap';

// Define the BookList component
function BookList({ deleteBook }) {
  // Define state variables for the book list and error
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  // Use the useEffect hook to load books when the component mounts
  useEffect(() => {
    // Define an async function to load books
    async function loadBooks() {
      try {
        // Make a GET request to fetch the list of books from the API
        fetch('https://6521897aa4199548356d5792.mockapi.io/Code', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data)
            // Set the retrieved books in the state
            setBooks(data);
          })
          .catch((error) => {
            console.error('Error:', error)
            // Set the error state if there's an issue with the request
            setError(error);
          })
      } catch (error) {
        // Set the error state if there's an issue with the async function
        setError(error);
      }
    }
    // Call the loadBooks function when the component mounts
    loadBooks();
  }, []);

  // Check if there's an error, and if so, display an alert
  if (error) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  // Render the BookList component
  return (
    <div>
      <h2>Book List</h2>
      <ListGroup>
        {books.map((book) => (
          <ListGroup.Item key={book.id}>
            {book.title} by {book.author}, Year: {book.year}
            <Link to={`/edit-book/${book.id}`}>
              <Button variant="primary" className="ml-2">Edit</Button>
            </Link>
            <Link to={`/delete-book/${book.id}`}>
              <Button variant="danger" className="ml-2">Delete</Button>
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

// Export the BookList component
export default BookList;
