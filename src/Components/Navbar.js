import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "../ComponentStyles/Navbar.css";

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(evt) {
        this.setState({ query: evt.target.value })
    }

    handleSubmit() {
        const query = this.state.query;
        this.props.handleQuery(query);

    }

    render() {
        return (
            <header>
                <Link to="/" className="logo">
                    <h1>Logo</h1></Link >
                <input
                    type="checkbox"
                    id="nav-toggle"
                    className="nav-toggle"
                />
                <nav>
                    <ul>
                        <li className="search-container">
                            <input
                                value={this.state.query}
                                className="nav-search"
                                type="text"
                                name=""
                                id=""
                                onChange={this.handleChange}
                                placeholder="search movie" />

                            <Link onClick={this.handleSubmit} to={`/SearchMovie/${this.state.query}`} className="search-btn">Search</Link>

                        </li>
                        <li>
                            <a href="#">EXPLORE</a>
                        </li>

                    </ul>
                </nav>
                <label for="nav-toggle" className="nav-toggle-label">
                    <span></span>
                </label>
            </header>
        );
    }
}

export default Navbar;