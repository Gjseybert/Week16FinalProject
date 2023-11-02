import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Alert } from 'react-bootstrap';

// Define the DeleteBook component
function DeleteBook({ FetchBooks, deleteBook }) {
  // Get the 'id' parameter from the route using useParams
  const { id } = useParams();

  // Define state variables for the book, and error
  const [book, setBook] = useState({});
  const [error, setError] = useState(null);

  // Use the useEffect hook to load the book when the component mounts
  useEffect(() => {
    // Define an async function to load the book with the given 'id'
    async function loadBooks() {
      // Make a GET request to fetch the book with the specified 'id' from the API
      fetch(`https://6521897aa4199548356d5792.mockapi.io/Code/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data)
          const bookToUpdate = data;
          if (bookToUpdate) {
            // Set the retrieved book in the state
            setBook(bookToUpdate);
          }
        })
        .catch((error) => {
          console.error('Error:', error)
          // Set the error state if there's an issue with the request
          setError(error);
        })
    }
    // Call the loadBooks function when the component mounts or when 'id' changes
    loadBooks();
  }, [id]);

  // Function to handle the book deletion
  const handleDelete = async (id) => {
    try {
      // Make a DELETE request to remove the book with the specified 'id' from the API
      fetch(`https://6521897aa4199548356d5792.mockapi.io/Code/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          // Redirect to the book list page after successful deletion
          document.location.href = "/book-list";
        })
        .catch((error) => {
          console.error('Error:', error)
          // Set the error state if there's an issue with the request
          setError(error);
        })
    } catch (error) {
      // Set the error state if there's an error in the try-catch block
      setError(error);
    }
  };

  // Render the DeleteBook component
  return (
    <div>
      <h2>Delete Book</h2>
      {error && <Alert variant="danger">{error.message}</Alert>}
      <ul>
        <li key={book.id}>
          {book.title} by {book.author}, Year: {book.year}
          <Button variant="danger" onClick={() => handleDelete(book.id)}>
            Confirm Delete
          </Button>
        </li>
      </ul>
    </div>
  );
}

// Export the DeleteBook component
export default DeleteBook;
