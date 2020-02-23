import React from "react";
import "antd/dist/antd.css";
import { Button, Form, Input, Typography } from "antd";
import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

function RegisterForm({ form, AppStore }) {
  const history = useHistory();

  const {
    getFieldsError,
    getFieldDecorator,
    getFieldError,
    isFieldTouched,
    resetFields
  } = form;

  const firstName = isFieldTouched("firstName") && getFieldError("firstName");
  const lastName = isFieldTouched("lastName") && getFieldError("lastName");
  const email = isFieldTouched("email") && getFieldError("email");
  const password = isFieldTouched("password") && getFieldError("password");
  const passwordConfirmation =
    isFieldTouched("passwordConfirmation") &&
    getFieldError("passwordConfirmation");

  const handleSubmit = event => {
    event.preventDefault();
    form.validateFields(async (err, values) => {
      if (!err) {
        await AppStore.createNewAccount(values);
        resetFields();
        history.push({ pathname: "/" });
      }
    });
  };

  return (
    <>
      <Typography.Title level={3}>Criar uma conta</Typography.Title>
      <Typography.Paragraph>
        Informe seus dados para a sua conta UTFBox
      </Typography.Paragraph>
      <Form onSubmit={handleSubmit}>
        <div style={styles.formItemLabel}>
          <Form.Item
            label="Nome"
            validateStatus={firstName ? "error" : ""}
            style={styles.inlineFormItem}
          >
            {getFieldDecorator("firstName", {
              rules: [{ required: true, message: "Adicione o primeiro nome!" }]
            })(<Input placeholder="Nome" />)}
          </Form.Item>
          <Form.Item
            label="Sobrenome"
            validateStatus={lastName ? "error" : ""}
            style={styles.inlineFormItem}
          >
            {getFieldDecorator("lastName", {
              rules: [{ required: true, message: "Adicione o sobrenome!" }]
            })(<Input placeholder="Sobrenome" />)}
          </Form.Item>
        </div>
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
          })(<Input placeholder="user@domain.com" />)}
        </Form.Item>
        <Form.Item
          label="Senha"
          validateStatus={password ? "error" : ""}
          style={styles.formItemLabel}
        >
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Adicione uma senha!" }]
          })(<Input type="password" placeholder="***********" />)}
        </Form.Item>
        <Form.Item
          label="Confirmar senha"
          validateStatus={passwordConfirmation ? "error" : ""}
          style={styles.formItemLabel}
        >
          {getFieldDecorator("passwordConfirmation", {
            rules: [{ required: true, message: "Adicione uma senha!" }]
          })(<Input type="password" placeholder="***********" />)}
        </Form.Item>
        <Form.Item>
          <Button
            style={styles.actionButtons}
            type="primary"
            icon="user-add"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
            block
          >
            Criar conta
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
  inputIcons: {
    color: "rgba(0,0,0,.25)"
  },
  formItemLabel: {
    textAlign: "left"
  },
  inlineFormItem: {
    display: "inline-block",
    marginLeft: 4,
    marginRight: 4,
    width: "calc(50% - 8px)"
  }
};

export default Form.create({ name: "register_form" })(
  inject("AppStore")(observer(RegisterForm))
);
