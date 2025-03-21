"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../Host/host";
import cookies from "js-cookie";
import { Form, Input, Button } from "antd";
import Link from "next/link";
import { useStore } from "../Store/Store"; // Import our Zustand store
import Navbar from "../../components/Navbar";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../components/Loader";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const setCurrentUser = useStore((state) => state.setCurrentUser);

  useEffect(() => {
    const token = cookies.get("token_access_test");
    if (token !== undefined) {
      router.push("/add");
    }
  }, [router]);

  const onFinish = async (val) => {
    if (!val.email || !val.password) {
      toast.error("Email va parolni kiriting!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${api}/users/login/`, val);
      const data = response.data;

      cookies.set("token_access_test", data.token, { expires: 8 });
      cookies.set("token_refresh_test", data.token, { expires: 8 });
      localStorage.setItem("token", data.token);

      setCurrentUser({
        email: val.email,
        token: data.accessToken,
        ...data.user, // Assuming API returns user object
      });

      toast.success("Tizimga muvaffaqiyatli kirdingiz!");
      router.push("/");
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Login amalga oshmadi!");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  return (
    <div className="login_box login_log">
      <div className="log_box">
        <div className="login_form login_log2">
          <h1>Авторизоваться</h1>
          <Form
            name="basic"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Електронная почта"
              name="email"
              rules={[
                { type: "email", message: "Iltimos, to'g'ri email kiriting!" },
                {
                  required: true,
                  message: "Вы должны ввести адрес электронной почты!",
                },
              ]}
            >
              <Input type="email" />
            </Form.Item>

            <Form.Item
              label="Пароль"
              name="password"
              rules={[{ required: true, message: "Вы должны ввести пароль!" }]}
            >
              <Input.Password autoCapitalize="new-password" />
            </Form.Item>
            <Link href="/register" className="login_link">
              Вы зарегистрированы?
            </Link>
            <Form.Item>
              <Button htmlType="submit" className="login_btn">
                доступ
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
