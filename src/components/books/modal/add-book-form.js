import React, { useState } from "react";

const Form = ({ onSubmit, book }) => {
  const [currBook, setBook] = useState(book);

  const handleChange = (event) => {
    setBook({
      ...currBook,
      [event.target.name]: event.target.value,
    });
  };

  var component = (
    <>
      <div className="base-container">
        <div className="header"> Add new book </div>
        <form
          className="form content"
          onSubmit={(event) => onSubmit(event, book.id)}
        >
          <div className="form-group">
            <label htmlFor="name">Book name</label>
            <input
              type="text"
              name="name"
              placeholder="bookname"
              className="form-control"
              value={currBook.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              name="author"
              placeholder="author"
              className="form-control"
              value={currBook.author}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="test"
              name="description"
              placeholder="description"
              className="form-control"
              value={currBook.description}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pages">Amount of pges</label>
            <input
              type="test"
              name="pages"
              placeholder="pages"
              className="form-control"
              value={currBook.pages}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <button type="btn form-control" className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );

  return component;
};

export default Form;
