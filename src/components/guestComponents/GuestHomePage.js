/** @format */

import React, { Component } from "react";
import { Tabs } from "antd";
import SearchStays from "./SearchStays";
import MyReservations from "./MyReservations";
const { TabPane } = Tabs;

class GuestHomePage extends Component {
  render() {
    return (
      <Tabs defaultActiveKey="1" destroyInactiveTabPane={true}>
        <TabPane tab="Search Stays" key="1">
          <SearchStays />
        </TabPane>
        <TabPane tab="My Reservation" key="2">
          <MyReservations />
        </TabPane>
      </Tabs>
    );
  }
}
export default GuestHomePage;
