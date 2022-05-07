/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { Menu } from 'antd'
import './Header.css'

class Header extends Component {
  render() {
    const { updateRateCard, tab, handleTabs } = this.props

    return (
      <div className="header-wrapper">
        <Menu
          className="header-menu"
          mode="horizontal"
          defaultSelectedKeys={[tab]}
          selectedKeys={[tab]}
          onClick={handleTabs}
        >
          <Menu.Item className="menu-item" key="1">
            Search
          </Menu.Item>

          <Menu.Item className="menu-item" key="2" onClick={updateRateCard}>
            Rated
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}

Header.defaultProps = {
  updateRateCard: () => {},
  tab: '1',
  handleTabs: () => {}
}

Header.propTypes = {
  updateRateCard: PropTypes.func,
  tab: PropTypes.string,
  handleTabs: PropTypes.func
}
export default Header
