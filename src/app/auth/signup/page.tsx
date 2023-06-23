"use client";

import React, { useContext, useState } from "react";
import { UserContext } from "@/contexts/UserContext";
import { Button, Form, Input, Typography, Layout, message } from "antd";
import Link from "next/link";
import apiService from "@/services/api.service";
import constants from "@/constants";

const { Content } = Layout;

const { text } = constants;
const { authMsg } = text;
const { signupFailedMsg } = authMsg;

export default function Signup() {
  const { setIsLogged, setUser, user, isLogged } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onFinish = async (values: any) => {
    const { email, name, password } = values;
    setIsLoading(true);
    try {
      const res = await apiService.signup(email, name, password);
      const { data } = res;
      if (data.success) {
        message.success(data.msg);
        setIsLogged(true);
        localStorage.setItem("loginStatus", "true");
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
      } else {
        message.error(data.msg);
      }
    } catch (error) {
      message.error(signupFailedMsg);
    }
    setIsLoading(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Content>
      <Typography.Title className="text-center">Sign Up</Typography.Title>
      <Content className="flex justify-center">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="User Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Signup
            </Button>
            <Link href={"/auth/login"}>
              <Button
                type="default"
                htmlType="submit"
                className="ml-4"
                loading={isLoading}
              >
                Login
              </Button>
            </Link>
          </Form.Item>
        </Form>
      </Content>
    </Content>
  );
}
