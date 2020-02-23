import React, { useState } from "react";
import "antd/dist/antd.css";
import { Card, Typography, Divider } from "antd";
import styles from "./styles";
import LoginForm from "../../components/Forms/LoginForm";
import RegisterForm from "../../components/Forms/RegisterForm";
import { useParams } from "react-router-dom";
const tabNameList = [
  {
    key: "login",
    tab: "Login"
  },
  {
    key: "register",
    tab: "Criar conta"
  }
];

const tabContentList = {
  login: <LoginForm />,
  register: <RegisterForm />
};

export default function Login() {
  const { page } = useParams();
  const [tabKeyPosition, setTabKeyPosition] = useState(page ? page : "login");

  return (
    <div style={styles.container}>
      <Card
        style={styles.cardContainer}
        activeTabKey={tabKeyPosition}
        onTabChange={key => setTabKeyPosition(key)}
        tabList={tabNameList}
      >
        <Typography.Title level={2}>UTFBOX</Typography.Title>
        <Divider dashed={true} />
        {tabContentList[tabKeyPosition]}
      </Card>
    </div>
  );
}
