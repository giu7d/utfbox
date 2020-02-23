import React from "react";
import "antd/dist/antd.css";
import { Icon, Button, Form, Input, Typography } from "antd";
import { observer, inject } from "mobx-react";
import { Redirect } from "react-router-dom";

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

function LoginForm({ AppStore, form }) {
  const {
    getFieldsError,
    getFieldDecorator,
    getFieldError,
    isFieldTouched,
    resetFields
  } = form;

  const email = isFieldTouched("email") && getFieldError("email");
  const password = isFieldTouched("password") && getFieldError("password");

  const handleSubmit = event => {
    event.preventDefault();
    form.validateFields(async (err, values) => {
      if (!err) {
        await AppStore.authAccount(values);
        resetFields();
      }
    });
  };

  return AppStore.token !== "" && AppStore.user !== null ? (
    <Redirect to="/" />
  ) : (
    <>
      <Typography.Title level={3}>Entrar</Typography.Title>
      <Typography.Paragraph>Prosseguir para o UTFBox</Typography.Paragraph>
      <Form onSubmit={handleSubmit} style={styles.formContainer}>
        <Form.Item
          label="Email"
          validateStatus={email ? "error" : ""}
          style={styles.formItemLabel}
        >
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "The input is not valid E-mail!"
              },
              {
                required: true,
                message: "Please input your E-mail!"
              }
            ]
          })(
            <Input
              prefix={<Icon type="mail" style={styles.inputIcons} />}
              placeholder="user@domain.br"
            />
          )}
        </Form.Item>
        <Form.Item
          label="Senha"
          validateStatus={password ? "error" : ""}
          style={styles.formItemLabel}
        >
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "Adicione uma senha!"
              }
            ]
          })(
            <Input
              prefix={<Icon type="lock" style={styles.inputIcons} />}
              placeholder="Senha"
              type="password"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            style={styles.actionButtons}
            type="primary"
            icon="login"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
            block
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

const styles = {
  actionButtons: {
    fontWeight: "bold",
    maxWidth: 150
  },
  formContainer: {
    margin: "auto",
    maxWidth: 300
  },
  formItemLabel: {
    textAlign: "left"
  },
  inputIcons: {
    color: "rgba(0,0,0,.25)"
  }
};

export default Form.create({ name: "login_form" })(
  inject("AppStore")(observer(LoginForm))
);
