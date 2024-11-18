import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBook } from '../features/books/bookSlice'

function ViewBooks({ handleEdit }) {
    const { books, error, loading } = useSelector((state) => state.book)
    const dispatch = useDispatch()

    if (loading)
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
                <div className="spinner-border text-primary" role="status"></div>
            </div>
        )

    if (books.length == 0)
        return <div className="text-center mt-5"><h5>No books to display...</h5></div>

    if (error) return <div className="text-danger text-center">{error}</div>



    return (
        <div className="row mt-3 justify-content-center">
            {books.map((book) => (
                <div className="col-lg-4 col-md-6 col-sm-12 my-3" key={book.id}>
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">{book.title}</h5>
                            <p className="card-text text-muted">{book.description}</p>

                            <button
                                onClick={() => dispatch(deleteBook(book.id))}
                                type="button"
                                className="btn btn-danger me-3"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => handleEdit(book)}
                                className="btn btn-primary"
                            >
                                Edit
                            </button>

                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ViewBooks
