import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import { Dropdown, Form, Input, Button } from "antd";

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

function CreateFolder({ AppStore, form }) {
  const [dropdown, setDropdown] = useState(false);
  const {
    getFieldsError,
    getFieldDecorator,
    getFieldError,
    isFieldTouched,
    resetFields
  } = form;

  const fileName = isFieldTouched("fileName") && getFieldError("fileName");

  const handleSubmit = event => {
    event.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        AppStore.createDirectory(values);
        resetFields();
        setDropdown(false);
      }
    });
  };

  return (
    <Dropdown
      visible={dropdown}
      overlay={
        <div style={styles.dropdownContainer}>
          <Form onSubmit={handleSubmit}>
            <Form.Item
              validateStatus={fileName ? "error" : ""}
              label="Nome da pasta"
            >
              {getFieldDecorator("fileName", {
                rules: [
                  {
                    required: true,
                    message: "Por favor informe o nome da pasta!"
                  }
                ]
              })(
                <Input placeholder="xxxxxx" onClick={() => setDropdown(true)} />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                disabled={hasErrors(getFieldsError())}
                shape="round"
                htmlType="submit"
                block
              >
                Criar
              </Button>
            </Form.Item>
          </Form>
        </div>
      }
      placement="topLeft"
    >
      <Button
        onClick={() => setDropdown(true)}
        type="primary"
        shape="circle"
        icon="folder-add"
        size="large"
      />
    </Dropdown>
  );
}

export default Form.create({ name: "create_folder_form" })(
  inject("AppStore")(observer(CreateFolder))
);

const styles = {
  dropdownContainer: {
    padding: 14,
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 1px 13px 0px rgba(50, 50, 50, 0.1)"
  }
};
