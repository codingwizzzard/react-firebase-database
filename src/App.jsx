import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import ViewBooks from './components/ViewBooks'
import { createBook, editBook, fetchBook } from './features/books/bookSlice'

function App() {
  const [books, setBooks] = useState({})
  const dispatch = useDispatch()
  const [editId, setEditId] = useState("")

  const handleEdit = (book) => {
    setBooks(book)
    setEditId(book.id)
  }

  const handleInput = (e) => {
    const { name, value } = e.target
    setBooks({ ...books, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (editId === "") {
      dispatch(createBook(books))
    } else {
      dispatch(editBook(books))
      setEditId("")
    }
    setBooks({})
  }

  useEffect(() => {
    dispatch(fetchBook())
  }, [])

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 mb-5 w-50 mx-auto">
        <h3 className="text-center mb-4">Book Store</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              id="title"
              value={books.title || ""}
              onChange={handleInput}
              placeholder="Enter book title"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input
              type="text"
              className="form-control"
              name="description"
              id="description"
              value={books.description || ""}
              onChange={handleInput}
              placeholder="Enter book description"
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">
            {editId ? "Update Book" : "Add Book"}
          </button>
        </form>
      </div>
      <ViewBooks handleEdit={handleEdit} />
    </div>
  )
}

export default App
