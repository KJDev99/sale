"use client";
import React from "react";
import { Button, Input, Form } from "antd";
import { registerFunc } from "../Host/Auth";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";

export default function Register() {
  const router = useRouter();
  const onFinish = async (val) => {
    console.log(val);
    if (val.password != val.password2) {
      console.log("error");
    } else {
      try {
        var res = await registerFunc(val);
        console.log(res);
        router.push("/login");
      } catch (err) {
        console.log("error");
      }
    }
  };

  return (
    <div className="login_box">
      <div className="log_box log_box2">
        <div className="login_form">
          <h1>текст для входа</h1>
          <Form
            name="basic"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off" // ✅ Disable autocomplete at the form level
          >
            <Form.Item
              label="Имя пользователя"
              name="username"
              rules={[{ required: true, message: "ввод_текста_ошибки" }]}
            >
              <Input autoComplete="off" />
            </Form.Item>

            <Form.Item
              label="Електронная почта"
              name="email"
              rules={[
                {
                  type: "email",
                  message: "Электронная почта была введена неверно",
                },
                { required: true, message: "ввод_текста_ошибки" },
              ]}
            >
              <Input autoComplete="off" type="email" />
            </Form.Item>

            <Form.Item
              label="Пароль"
              name="password"
              rules={[{ required: true, message: "ввод_текста_ошибки" }]}
            >
              <Input.Password autoComplete="new-password" />
            </Form.Item>

            <Form.Item
              label="Верните пароль"
              name="password2"
              rules={[{ required: true, message: "ввод_текста_ошибки" }]}
            >
              <Input.Password
                visibilityToggle={false}
                autoComplete="new-password"
              />
            </Form.Item>

            <Form.Item label={null}>
              <Button className="login_btn" htmlType="submit">
                Отправить
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
