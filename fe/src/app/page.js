"use client"

import { useEffect, useState } from 'react';
import { Typography, TextField, Button, List, ListItem, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { toast, ToastContainer } from 'react-toastify';
import client from '~/api/apolloClient';
import { getBookAPI, getAuthorAPI, addAuthorAPI, updateAuthorAPI, deleteAuthorAPI, addBookAPI, updateBookAPI, deleteBookAPI } from '~/api/api'
import CloseIcon from '@mui/icons-material/Close';

export default function Home() {
  const [authors, setAuthors] = useState([]);
  const [books, setBooks] = useState([]);
  const [authorNameCreate, setAuthorNameCreate] = useState('');
  const [authorNameUpdate, setAuthorNameUpdate] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [bookTitleUpdate, setBookTitleUpdate] = useState('');
  const [bookAuthorId, setBookAuthorId] = useState('');
  const [bookAuthorIdUpdate, setBookAuthorIdUpdate] = useState('');
  const [editAuthorIndex, setEditAuthorIndex] = useState(null);
  const [editBookIndex, setEditBookIndex] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await client.query({
          query: getBookAPI,
        })
        setBooks(response.data.books);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, [])

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await client.query({
          query: getAuthorAPI,
        })
        setAuthors(response.data.authors);
      } catch (error) {
        console.error('Error fetching authors:', error);
      }
    };

    fetchAuthors();
  }, [])

  const handleAddAuthor = async () => {
    try {
      if (!authorNameCreate.trim()) return toast.error('Nhập tên tác giả đã rồi thêm');
      const response = await client.mutate({
        mutation: addAuthorAPI,
        variables: {
          name: authorNameCreate,
        },
      });
      setAuthors([...authors, response.data.addAuthor]);
      toast.success('Thêm tác giả thành công');
    } catch (error) {
      toast.error('Có lỗi xảy ra khi thêm tác giả');
    }
  }

  const handleDeleteAuthor = async (index) => {
    try {
      const authorList = [...authors]
      await client.mutate({
        mutation: deleteAuthorAPI,
        variables: {
          id: authorList[index].id,
        },
      });
      const newAuthorList = authorList.filter((_, i) => i !== index)
      setAuthors(newAuthorList);
      toast.success('Xóa tác giả thành công');
    } catch (error) {
      toast.error('Có lỗi xảy ra khi xóa tác giả');
    }
  };

  const handleUpdateAuthor = async () => {
    try {
      if (!authorNameUpdate.trim()) return toast.error('Tên tác giả không được để trống')
      const updated = [...authors]
      const author = updated[editAuthorIndex]
      updated[editAuthorIndex] = { ...author, name: authorNameUpdate };
      setAuthors(updated);
      setEditAuthorIndex(null);
      await client.mutate({
        mutation: updateAuthorAPI,
        variables: {
          name: authorNameUpdate,
          id: author.id,
        },
      });
      toast.success('Cập nhật tác giả thành công');
    } catch (error) {
      toast.error('Có lỗi xảy ra khi cập nhật tác giả');
    }
  }

  const handleAddBook = async () => {
    try {
      if (!bookTitle.trim() || !bookAuthorId.trim()) return toast.error('Tên sách và id của tác giả không được để trống');
      const author = authors.find((author) => author.id.toString() === bookAuthorId);
      if (!author) return toast.error('Tác giả không tồn tại');

      const response = await client.mutate({
        mutation: addBookAPI,
        variables: {
          title: bookTitle,
          authorId: author.id,
        },
      });
      setBooks([...books, response.data.addBook]);
      toast.success('Thêm sách thành công');
    }
    catch (error) {
      toast.error('Có lỗi xảy ra khi thêm sách');
    }
  }

  const handleDeleteBook = async (index) => {
    try {
      const bookList = [...books]
      await client.mutate({
        mutation: deleteBookAPI,
        variables: {
          id: bookList[index].id,
        },
      });
      const newBookList = bookList.filter((_, i) => i !== index)
      setBooks(newBookList);
      toast.success('Xóa sách thành công');
    } catch (error) {
      toast.error('Có lỗi xảy ra khi xóa sách');
    }
  }

  const handleUpdateBook = async () => {
    try {
      if (!bookTitleUpdate.trim() || !bookAuthorIdUpdate.trim()) return toast.error('Tên sách và id của tác giả không được để trống');
      const author = authors.find((author) => author.id.toString() === bookAuthorIdUpdate);
      if (!author) return toast.error('Tác giả không tồn tại');
      const updatedBooks = [...books];
      const book = updatedBooks[editBookIndex];
      updatedBooks[editBookIndex] = { ...book, title: bookTitle, author: { id: author.id, name: author.name } };
      setBooks(updatedBooks);
      setEditBookIndex(null);
      const authorId = parseInt(bookAuthorIdUpdate);
      await client.mutate({
        mutation: updateBookAPI,
        variables: {
          title: bookTitleUpdate,
          authorId: authorId,
          id: book.id,
        },
      });
      toast.success('Cập nhật sách thành công');
    } catch (error) {
      toast.error('Có lỗi xảy ra khi cập nhật sách');
    }
  }

  const handleClose = () => {
    setEditAuthorIndex(null);
    setEditBookIndex(null);
    setAuthorNameUpdate('');
    setBookTitle('');
    setBookAuthorId('');
  }

  return (
    <>
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Quản lý Sách và Tác giả
        </Typography>

        {/* Author Management */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6">Tác giả</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            {editAuthorIndex === null ?
              <TextField
                label="Tên tác giả"
                value={authorNameCreate}
                onChange={(e) => setAuthorNameCreate(e.target.value)}
                sx={{ mr: 2, mt: 1 }}
              />
              :
              <TextField
                label="Tên tác giả sửa"
                value={authorNameUpdate}
                onChange={(e) => setAuthorNameUpdate(e.target.value)}
                sx={{ mr: 2, mt: 1 }}
              />
            }

            {editAuthorIndex === null && (
              <Button variant="contained" onClick={handleAddAuthor} sx={{ mt: 1 }}>
                Thêm
              </Button>
            )}
            {editAuthorIndex !== null && (
              <Box>
                <Button variant='outlined' onClick={handleUpdateAuthor} sx={{ ml: 2, mt: 1 }}>
                  Cập nhật
                </Button>
                <IconButton onClick={handleClose} sx={{ ml: 2, mt: 1 }}>
                  <CloseIcon />
                </IconButton>
              </Box>
            )}
          </Box>

          <List>
            {authors.map((author, index) => (
              <ListItem
                key={index}
                sx={{ border: '1px solid #ccc', borderRadius: '4px', padding: 2 }}
                secondaryAction={
                  <>
                    <IconButton edge="end"
                      onClick={() => {
                        setEditAuthorIndex(index)
                        setAuthorNameUpdate(author.name)
                      }}
                      sx={{ m: 1 }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end"
                      onClick={() => {
                        handleDeleteAuthor(index)
                      }}
                      sx={{ m: 1 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
              >
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography>Tên tác giả: {author.name}</Typography>
                  <Typography>Id: {author.id}</Typography>
                  <Typography>
                    Những cuốn sách đã viết: {author.bookWrittenIds.map((bookId) => {
                      const book = books.find((b) => b.id === bookId);
                      return book ? book.title : '';
                    }
                    ).join(', ')}
                  </Typography>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Book Management */}
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>Sách</Typography>
          {editBookIndex !== null ?
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TextField
                label="Tên sách sửa"
                value={bookTitleUpdate}
                onChange={(e) => setBookTitleUpdate(e.target.value)}
                sx={{ mr: 2, mb: 2 }}
              />
              <TextField
                label="Id của tác giả"
                value={bookAuthorIdUpdate}
                onChange={(e) => setBookAuthorIdUpdate(e.target.value)}
                sx={{ mr: 2, mb: 2 }}
              />
              <Button variant="contained" onClick={() => handleUpdateBook()} sx={{ mb: 2 }}>
                Cập nhật
              </Button>
              <IconButton onClick={handleClose} sx={{ ml: 2, mb: 2 }}>
                <CloseIcon />
              </IconButton>
            </Box>
            :
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TextField
                label="Tên sách"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
                sx={{ mr: 2, mb: 2 }}
              />
              <TextField
                label="Id của tác giả"
                value={bookAuthorId}
                onChange={(e) => setBookAuthorId(e.target.value)}
                sx={{ mr: 2, mb: 2 }}
              />
              <Button variant="contained" onClick={handleAddBook} sx={{ mb: 2 }}>
                Thêm
              </Button>
            </Box>
          }

          <List>
            {books.map((book, index) => (
              <ListItem
                key={index}
                sx={{ border: '1px solid #ccc', borderRadius: '4px', padding: 2, mt: 2 }}
                secondaryAction={
                  <>
                    <IconButton edge="end" onClick={() => {
                      setBookTitleUpdate(book.title)
                      setBookAuthorIdUpdate(book.author.id)
                      setEditBookIndex(index)
                    }} sx={{ m: 1 }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" onClick={() => handleDeleteBook(index)} sx={{ m: 1 }}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
              >
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography>Id: {book.id}</Typography>
                  <Typography>Tên sách: {book.title}</Typography>
                  <Typography>Tác giả: {book.author?.name || 'Không rõ'}</Typography>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
      <ToastContainer
        position='bottom-right'
        autoClose={1000}
      />
    </>
  );
}
