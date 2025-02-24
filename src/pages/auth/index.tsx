import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Panel, Input, Message } from "rsuite";
import { login } from "@redux/auth/authSlice";
import { useAppDispatch } from "@hooks/hooks";

const AuthPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ login: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (value: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const action = await dispatch(login(formData));

    if (login.fulfilled.match(action)) {
      navigate("/admin");
    } else {
      setError("Неверный логин или пароль");
    }
  };

  return (
    <Panel header="Админ Авторизация" bordered style={{ maxWidth: 400, margin: "auto", marginTop: 50 }}>
      <Form fluid onSubmit={handleSubmit}>
        <Form.Group controlId="login">
          <Form.ControlLabel>Логин</Form.ControlLabel>
          <Input name="login" value={formData.login} onChange={(value) => handleChange(value, "login")} required />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.ControlLabel>Пароль</Form.ControlLabel>
          <Input type="password" name="password" value={formData.password} onChange={(value) => handleChange(value, "password")} required />
        </Form.Group>

        {error && <Message type="error" showIcon closable>{error}</Message>}

        <Form.Group>
          <Button appearance="primary" type="submit" block>
            Войти
          </Button>
        </Form.Group>
      </Form>
    </Panel>
  );
};

export default AuthPage;
