/** @format */

import {
  Card,
  Form,
  List,
  Image,
  Button,
  InputNumber,
  message,
  Carousel,
  Typography,
} from "antd";
import DataPicker from "antd/lib/date-picker";
import React, { Component } from "react";
import { LeftCircleFilled, RightCircleFilled } from "@ant-design/icons";
import StayDetailInfoButton from "../StayDetailInfoButton";
import { searchStays } from "../../utils";
import BookStayButton from "./BookStayButton";
const { Text } = Typography;

class SearchStays extends Component {
  state = {
    loading: false, // track loading status and show loading 效果
    data: [],
  };
  search = async (query) => {
    this.setState({
      loading: true,
    });
    try {
      const resp = await searchStays(query);
      this.setState({
        data: resp,
      });
    } catch (error) {
      message.error(error.message);
    } finally {
      this.setState({
        loading: false,
      });
    }
  };
  render() {
    return (
      <>
        <Form onFinish={this.search} layout="inline">
          <Form.Item
            label="Guest Number"
            name="guest_number"
            rules={[{ required: true }]}
          >
            <InputNumber min={1} max={99} />
          </Form.Item>
          <Form.Item
            label="Checkin Date"
            name="checkin_date"
            rules={[{ required: true }]}
          >
            <DataPicker />
          </Form.Item>
          <Form.Item
            label="Checkout Date"
            name="checkout_date"
            rules={[{ required: true }]}
          >
            <DataPicker />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              loading={this.state.loading}
              type="primary"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
        <List
          style={{ marginTop: 20 }}
          loading={this.state.loading}
          grid={{
            gutter: 16,
            xs: 1,
            sm: 3,
            md: 3,
            lg: 3,
            xl: 4,
            xxl: 4,
          }}
          dataSource={this.state.data}
          renderItem={(item) => (
            <List.Item>
              <Card
                key={item.id}
                title={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Text ellipsis={true} style={{ maxWidth: 150 }}>
                      {item.name}
                    </Text>
                    <StayDetailInfoButton stay={item} />
                  </div>
                }
                actions={[]}
                extra={<BookStayButton stay={item} />}
              >
                {
                  <Carousel
                    // 可以传多个图片像走马灯
                    dots={false}
                    arrows={true}
                    prevArrow={<LeftCircleFilled />}
                    nextArrow={<RightCircleFilled />}
                  >
                    {item.images.map((image, index) => (
                      <div key={index}>
                        <Image src={image.url} width="100%" />
                      </div>
                    ))}
                  </Carousel>
                }
              </Card>
            </List.Item>
          )}
        />
      </>
    );
  }
}

export default SearchStays;
