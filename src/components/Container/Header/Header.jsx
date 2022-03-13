import React, { Component } from 'react';

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
    const { updateMainCard, updateRateCard } = this.props;

    const { current } = this.state;

    return (
      <div className="header-wrapper">
        <Menu className="header-menu" mode="horizontal" selectedKeys={[current]} onClick={this.handleClick}>
          <Menu.Item className="menu-item" key="1" onClick={updateMainCard}>
            Search
          </Menu.Item>

          <Menu.Item className="menu-item" key="2" onClick={updateRateCard}>
            Rated
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

Header.defaultProps = {
  updateMainCard: () => {},
  updateRateCard: () => {},
};

Header.propTypes = {
  updateMainCard: PropTypes.func,
  updateRateCard: PropTypes.func,
};
export default Header;
