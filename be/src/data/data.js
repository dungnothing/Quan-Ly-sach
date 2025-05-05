export const booksData = [
  {
    id: 1,
    title: 'B52',
    authorId: '1',
    publishedDate: new Date('2023-01-01'),
    genre: 'Oanh nhau',
    description: 'Description 1'
  },
  {
    id: 2,
    title: 'Ak47',
    authorId: '2',
    publishedDate: new Date('2023-02-01'),
    genre: 'Oanh nhau',
    description: 'Description 2'
  },
  {
    id: 3,
    title: 'True Love',
    authorId: '3',
    publishedDate: new Date('2023-03-03'),
    genre: 'Tinh cam',
    description: 'Description 3'
  },
  {
    id: 4,
    title: 'Fake Love',
    authorId: '3',
    publishedDate: new Date('2023-04-04'),
    genre: 'Tinh cam',
    description: 'Description 4'
  }
]

export const authorsData = [
  {
    id: 1,
    name: 'Dung 1',
    bookWrittenIds: [1]
  },
  {
    id: 2,
    name: 'Dung 2',
    bookWrittenIds: [2]
  },
  {
    id: 3,
    name: 'Dung 3',
    bookWrittenIds: [3, 4]
  }
]
