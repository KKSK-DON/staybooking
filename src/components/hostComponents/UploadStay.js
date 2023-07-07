/** @format */

import { Form, Button, Input, InputNumber, message } from "antd";
import React, { Component } from "react";
import { uploadStay } from "../../utils";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

class UploadStay extends Component {
  state = {
    loading: false,
  };

  fileInputRef = React.createRef(); //拿用户上传的文件的时候用
  // React.createRef() 是建立global variable，可以在整个class里面用
  handleSubmit = async (values) => {
    console.log(values);
    const formData = new FormData(); //因为api要求的是formdata，所以要转换
    const { files } = this.fileInputRef.current;
    if (files.length > 5) {
      message.error("You can at most upload 5 pictures.");
      return;
    }

    Object.keys(values).forEach((key) => {
      if (key === "picture") {
        for (let i = 0; i < files.length; i++) {
          formData.append("images", files[i]);
        }
      } else {
        formData.append(key, values[key]);
      }
    });

    this.setState({
      loading: true,
    });
    try {
      await uploadStay(formData);
      message.success("upload successfully");
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
      <Form
        {...layout}
        name="nest-messages"
        onFinish={this.handleSubmit}
        style={{ maxWidth: 1000, margin: "auto" }}
      >
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="address" label="Address" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true }]}
        >
          <Input.TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
        </Form.Item>
        <Form.Item
          name="guest_number"
          label="Guest Number"
          rules={[{ required: true, type: "number", min: 1 }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item name="picture" label="Picture" rules={[{ required: true }]}>
          <input
            type="file"
            accept="image/png, image/jpeg"
            ref={this.fileInputRef}
            multiple={true}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit" loading={this.state.loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default UploadStay;
