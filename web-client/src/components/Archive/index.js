import React from "react";
import "antd/dist/antd.css";
import { Button, List, Avatar } from "antd";
import Skeleton from "react-loading-skeleton";
import styles from "./styles";

export default function Archive({ data, isLoading }) {
  const openAction = () => {};

  return (
    <List.Item key={data.id}>
      <List.Item.Meta
        onClick={openAction}
        style={styles.clickable}
        avatar={<Avatar icon={data.type} style={styles.avatar} />}
        title={
          isLoading ? (
            <Skeleton width={200 + Math.floor(Math.random() * 100)} />
          ) : (
            data.title
          )
        }
        description={
          isLoading ? (
            <Skeleton width={50 + Math.floor(Math.random() * 100)} />
          ) : (
            data.creationDate
          )
        }
      />
      <Button
        style={styles.moreButton}
        shape="circle"
        icon="more"
        onClick={() => console.log("OPEN")}
      />
    </List.Item>
  );
}
