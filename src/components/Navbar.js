import React, { Fragment } from 'react';

const Navbar = ({skin}) => {
  return (
    <Fragment>
      <nav className={ skin ? "navbar navbar-light bg-light" : "navbar navbar-dark bg-dark" }>
        <a className='navbar-brand' href='#!'>
          {skin ? "Welcome to Cookie Bakery" : "We are Closed Come Tomorrow" }
        </a>
      </nav>
    </Fragment>
  );
};


export default Navbar;
