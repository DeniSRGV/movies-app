import React from "react";
import { Spin } from 'antd';
import './Spinner.css'

const Spinner = function Spinner() {
  return (<div className="load">
            <Spin size="large"/>
        </div>
  )
}
export default Spinner;