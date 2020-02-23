import React from "react";
import "antd/dist/antd.css";
import { PageHeader, Input, Typography, Dropdown, Button, Divider } from "antd";
import styles from "./styles";

export default function AppBar({ title, user }) {
  return (
    <PageHeader
      style={styles.container}
      title={
        <Typography.Title style={styles.titleTypography} level={2}>
          UTFBox
        </Typography.Title>
      }
      subTitle={
        <Input.Search
          style={styles.searchInput}
          placeholder="Buscar no box"
          size="large"
        />
      }
      extra={
        <Dropdown
          overlay={
            <div style={styles.overlayContainer}>
              <Typography.Title level={4}>
                {user.firstName + " " + user.lastName}
              </Typography.Title>
              <Typography.Paragraph style={styles.subTitleTypography}>
                {user.email}
              </Typography.Paragraph>
              <Divider />
              <Button
                style={styles.logoutButton}
                type="danger"
                shape="round"
                block
              >
                Sair
              </Button>
            </div>
          }
          placement="bottomRight"
        >
          <Button style={styles.userProfileButton} size="large" shape="circle">
            {user.initials}
          </Button>
        </Dropdown>
      }
    />
  );
}
