import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { Menu } from 'antd';
import './Header.css';

class Header extends Component {
  state = {
    current: '1',
  };

  handleClick = (event) => {
    this.setState({ current: event.key });
  };

  render() {
    const { updateCard, mainCard } = this.props;

    const { current } = this.state;

    return (
      <div className="header-wrapper">
        <Menu className="header-menu" mode="horizontal" selectedKeys={[current]} onClick={this.handleClick}>
          <Menu.Item className="menu-item" key="1" onClick={mainCard}>
            <Link to="/">Search</Link>
          </Menu.Item>

          <Menu.Item className="menu-item" key="2" onClick={updateCard}>
            <Link to="/rated">Rated</Link>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

Header.defaultProps = {
  updateCard: () => {},
  mainCard: () => {},
};

Header.propTypes = {
  updateCard: PropTypes.func,
  mainCard: PropTypes.func,
};
export default Header;
