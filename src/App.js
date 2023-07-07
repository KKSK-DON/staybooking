/** @format */

import React from "react";
import LoginPage from "./components/LoginPage";
import { Layout, Dropdown, Menu, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import HostHomePage from "./components/hostComponents/HostHomePage";
import GuestHomePage from "./components/guestComponents/GuestHomePage";

const { Header, Content } = Layout;

class App extends React.Component {
  state = {
    authed: false,
    asHost: false,
  };

  renderContent = () => {
    if (!this.state.authed) {
      return <LoginPage handleLoginSuccess={this.handleLoginSuccess} />;
    }
    if (this.state.asHost) {
      return <HostHomePage />;
    }
    return <GuestHomePage />;
  };

  handleLoginSuccess = (token, asHost) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("asHost", asHost);
    this.setState({ authed: true, asHost });
  };
  // logout
  handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("asHost");
    this.setState({ authed: false, asHost: false });
  };
  //componentDidMount is a lifecycle method that is called after the component is rendered for the first time.
  //initial state
  componentDidMount() {
    const token = localStorage.getItem("authToken");
    const asHost = localStorage.getItem("asHost") === "true"; //强制转换为boolean
    this.setState({ authed: token !== null, asHost });
  }

  userMenu = (
    <Menu>
      <Menu.Item key="logout" onClick={this.handleLogout}>
        Log Out
      </Menu.Item>
    </Menu>
  );

  render() {
    // return jsx
    return (
      <Layout style={{ height: "100vh" }}>
        <Header style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: "white" }}>
            StayBooking
          </div>
          {this.state.authed && (
            <div>
              <Dropdown trigger="click" overlay={this.userMenu}>
                <Button icon={<UserOutlined />} shape="circle"></Button>
              </Dropdown>
            </div>
          )}
        </Header>
        <Content
          style={{ height: "calc(100% - 64px)", margin: 20, overflow: "auto" }}
        >
          {this.renderContent()}
          {/* 一般这种情况可以把jsx 抽出去写 */}
        </Content>
      </Layout>
    );
  }
}

export default App;
