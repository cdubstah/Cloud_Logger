import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../styling/graphic_elements/cloud_logo.svg';
import '../styling/Header.css';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Login With Google</a>
          </li>
        );
      default:
        return (
          <li>
            <a href="/api/logout">Logout</a>
          </li>
        );
    }
  }

  render() {
    return (
      <div className="Header">
        <header className="Header-banner">
          <img src={logo} className="Header-logo" alt="logo" />
          <Link to={this.props.auth ? '/home' : '/'} className="brand-logo">
            <h1>CLOUD LOGGER</h1>
          </Link>
          <div className="right">
            <div className="waves-effect waves-light btn white black-text">
              {this.renderContent()}
            </div>
          </div>
        </header>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, null)(Header);
