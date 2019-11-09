"use strict"

import React from 'react';
import {Link} from 'react-router-dom'; //enables the link so you can move from one link to another
//it dynamically removes one node and adds the next node

//defines the logo and the two links
export const Header =  () => {
    return(
        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <ul className="list-inline">
                    <li className="list-inline-item"> 
                        <Link to="/" className="navbar-brand">
                            <img width="90px" height="30px" src="images/Library-logo.png" />
                        </Link>
                    </li>
                    <li className="list-inline-item"><Link to="/" replace>Home</Link></li>
                    <li className="list-inline-item"><Link to="/books" replace>Books</Link></li>
                    <li className="list-inline-item"><Link to="/authors" replace>Authors</Link></li>
                </ul>
            </div>
        </nav>
    );
}