"use client";

import React, { useContext, useState } from "react";
import { UserContext } from "@/contexts/UserContext";
import { Button, message, Form, Input, Typography, Layout } from "antd";
import Link from "next/link";
import apiService from "@/services/api.service";
import constants from "@/constants";

const { Content } = Layout;
const { text } = constants;
const { authMsg } = text;
const { loginFailedMsg } = authMsg;

export default function Login() {
  const { setIsLogged, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onFinish = async (values: any) => {
    const { email, password } = values;
    setIsLoading(true);
    try {
      const res = await apiService.login(email, password);
      const { data } = res;
      if (data.success) {
        message.success(data.msg);
        setIsLogged(true);
        localStorage.setItem("loginStatus", "true");
        setUser(data.user);
      } else {
        message.error(data.msg);
      }
    } catch (error) {
      message.error(loginFailedMsg);
    }
    setIsLoading(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Content>
      <Typography.Title className="text-center">Login</Typography.Title>
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
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Login
            </Button>
            <Link href={"/auth/signup"}>
              <Button type="default" htmlType="submit" className="ml-4">
                Register
              </Button>
            </Link>
          </Form.Item>
        </Form>
      </Content>
    </Content>
  );
}
