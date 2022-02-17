import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'antd';
import SearchInput from './Search/SearchInput';
import './Header.css';

class Header extends Component {
  state = {
    current: '1',
  };

  handleClick = (event) => {
    this.setState({ current: event.key });
  };

  render() {
    const { inputSearch } = this.props;
    const { current } = this.state;

    return (
      <>
        <div className="header-wrapper">
          <Menu className="header-menu" mode="horizontal" selectedKeys={[current]} onClick={this.handleClick}>
            <Menu.Item className="menu-item" key="1">
              Search
            </Menu.Item>
            <Menu.Item className="menu-item" key="2">
              Rated
            </Menu.Item>
          </Menu>
        </div>

        <SearchInput inputSearch={inputSearch} />
      </>
    );
  }
}

Header.defaultProps = {
  inputSearch: () => {},
};

Header.propTypes = {
  inputSearch: PropTypes.func,
};
export default Header;
