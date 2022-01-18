// *Relationships:
// how multiple documents are connected to other documents. There are two ways of creating relationships in MongoDB:
//We can use embedded documents or use references

// *Nested/Embedded Documents
const EmeddedDoc = {
  id: 1,
  userName: "Harry",
  gender: "male",
  address: {
    street: "Hertzel 30",
    city: "Bat-Yam",
  },
};

//You can also store the address in a new collection but it is strongly related to that user and we might want to fetch both at the same time or at least have an easy way to fetching both.

//*References
const user = {
  userName: "Pini",
  favBooks: [{}, {}, {}],
};
//each book can have a title, description, price etc
//This can lead to a lot of duplicate data. Because each customer can have the same book. And if we update a particular book we need to change it to all customers. Here we might go for references.
//We might have a customer and books collection

const customersCollection = {
  userName: "Pini",
  favBooks: ["id1", "id2", "id3"],
};

const BooksCollection = {
  _id: "id1",
  name: "Harry Potter",
  price: 12.55,
};
//to get the favorite books we do need to do 2 queries, but on the other hand if we change a book, we dont have to change it on 10 different customers but only the books collection.

//one document has a relationship to another one document

//*One to one - embedded/*
//*one to one using references
//* one to many relationships - Embedded
//* one to many relationships - references
//* many to many - Embedded
//* many to many - references

//When to use which?

//*One to one - embedded/*
//like the address document above. strongly related to the document and you usually need to get that data too

//*one to one using references
//sometimes multiple embedded documents can lead to large doucmunets that contains fields that the app does not need. This unnecessary data can cause extra load on your server and slow down read operations.

//So you use the subset pattern, partially showing.

///* tmdb api example
//popular movies
// https://api.themoviedb.org/3/movie/popular?api_key=3e296e6f6a1b142633468c58b584ab9b&language=en-US&page=1

//detailed movie
// https://api.themoviedb.org/3/movie/399566?api_key=3e296e6f6a1b142633468c58b584ab9b&language=en-US

//! amazon, airbnb etc

//* one to many relationships - Embedded
const user = {
  name: "Pini",
  addresses: [
    {
      country: "Israel",
      street: "Hertzel",
      city: "Bat-Yam",
      zip: "0275499",
    },
    {
      country: "America",
      street: "Riverside",
      city: "Los Angeles",
      zip: "45654",
    },
  ],
};

//! amazon account example

//* one to many relationships - references
//a publisher has many books
const books = [
  {
    title: "The bootcamp",
    author: "Pinchas Hodadad",
    genre: "Horror",
    pages: 100000000000000000,
    language: "Finnish",
    publisher: {
      name: "Pini industries",
      founded: 1800,
      address: {
        country: "The moon",
        city: "3rd rock to the right",
      },
    },
  },
  {
    title: "Master of Zoom",
    author: "Avi Cohen",
    genre: "Sci-Fi",
    pages: 0.5,
    language: "Yiddish",
    publisher: {
      name: "Pini industries",
      founded: 1800,
      address: {
        country: "The moon",
        city: "3rd rock to the right",
      },
    },
  },
];

//Embedding the publisher document inside the book document would lead to repetition of the publisher data,
//To avoid repetition of the publisher data, use references and keep the publisher information in a separate collection from the book collection.

const publishers = [
  {
    _id: ObjectId(453453534535),
    name: "Pini industries",
    founded: 1800,
    address: {
      country: "The moon",
      city: "3rd rock to the right",
    },
    books: ["id1", "id2", "id3"],
  },
];

const books = [
  {
    title: "Master of Zoom",
    author: "Mordecai",
    genre: "Sci-Fi",
    pages: 0.5,
    language: "Yiddish",
    publisherId: ObjectId(453453534535),
  },
];

//* many to many - Embedded

//! Who ever finds a good use case gets a cookie!

//* many to many - references

//A typical example of a many-to many relationship using references is one between students and courses. A student can register for many courses, and a course can include many students.

const Student = {
  _id: ObjectId(4534535345),
  name: "Pinchas Hodadadadadad",
  courses: [ObjectId(2), ObjectId(3)],
};

const Course = {
  _id: ObjectId(2),
  name: "What the hell is 'This' in JS",
  students: [ObjectId(4534535345), ObjectId(455)],
};
