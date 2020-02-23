import React from "react";
import "antd/dist/antd.css";
import { Menu, Icon } from "antd";
import styles from "./styles";

export default function Drawer({ pages, selectedKey }) {
  return (
    <nav style={styles.container}>
      <Menu style={styles.menu} defaultSelectedKeys={selectedKey} mode="inline">
        {pages.map(({ key, icon, title, action }) => (
          <Menu.Item key={key} onClick={action}>
            <Icon type={icon} />
            {title}
          </Menu.Item>
        ))}
      </Menu>
    </nav>
  );
}
