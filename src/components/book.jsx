import { useEffect, useState } from "react"

export default function Books() {
  const [books, setBooks] = useState([])
const [editBook, setEditBook] = useState(null)
  const loadBooks = async () => {
    const res = await fetch("http://localhost:4000/api/books")
    const data = await res.json()
    setBooks(data)
  }

  const deleteBook = async (id) => {
    await fetch(`http://localhost:4000/api/books/${id}`, {
      method: "DELETE"
    })

    loadBooks()
  }

  useEffect(() => {
    loadBooks()
  }, [])

  return (
    
    <div>
      <h2>Books</h2>
{editBook && (
  <div style={{ marginBottom: 20 }}>
    <h3>Edit Book</h3>

    <input
      value={editBook.title}
      onChange={(e) =>
        setEditBook({ ...editBook, title: e.target.value })
      }
    />

    <input
      value={editBook.author}
      onChange={(e) =>
        setEditBook({ ...editBook, author: e.target.value })
      }
    />

    <button onClick={updateBook}>Update</button>
  </div>
)}
      {books.map((b) => (
        <div key={b.id} style={{ border: "1px solid black", margin: 10, padding: 10 }}>
          <h3>{b.title}</h3>
          <p>{b.author}</p>

          <button onClick={() => deleteBook(b.id)}>
            Delete
          </button>
          <button onClick={() => startEdit(b)}>
  Edit
</button>
        </div>
      ))}
    </div>
  )
}