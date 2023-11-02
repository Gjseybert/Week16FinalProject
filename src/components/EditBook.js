import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';

// Define the EditBook component
function EditBook(updateBook, FetchBooks) {
  // Get the 'id' parameter from the route using useParams
  const { id } = useParams();

  // Define state variables for the book, and its title, author, year, and error
  const [book, setBook] = useState({});
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [error, setError] = useState(null);

  // Use the useEffect hook to load the book when the component mounts or 'id' changes
  useEffect(() => {
    // Define an async function to load the book with the given 'id'
    async function loadBook() {
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
          // Find the book with the specified 'id'
          const bookToUpdate = data.find((b) => b.id === id);
          if (bookToUpdate) {
            // Set the retrieved book and its details in the state
            setBook(bookToUpdate);
            setTitle(bookToUpdate.title);
            setAuthor(bookToUpdate.author);
            setYear(bookToUpdate.year);
          }
        })
        .catch((error) => {
          console.error('Error:', error)
          // Set the error state if there's an issue with the request
          setError(error);
        })
    }
    // Call the loadBook function when the component mounts or when 'id' changes
    loadBook();
  }, [id]);

  // Function to handle form submission and update the book
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create an updated book object with the new title, author, and year
    const updatedBook = { title, author, year };
    // Make a PUT request to update the book with the specified 'id'
    fetch(`https://6521897aa4199548356d5792.mockapi.io/Code/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedBook)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
        // Set the error state if there's an issue with the request
        setError(error);
      })
  };

  // Render the EditBook component
  return (
    <div>
      <h2>Edit Book</h2>
      <Link to={`/book-list`}>
        &larr; Back to Book List
      </Link>
      {error && <Alert variant="danger">{error.message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Author</Form.Label>
          <Form.Control type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Year</Form.Label>
          <Form.Control type="number" value={year} onChange={(e) => setYear(e.target.value)} required />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update Book
        </Button>
      </Form>
    </div>
  );
}

// Export the EditBook component
export default EditBook;
