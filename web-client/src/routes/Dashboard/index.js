import React, { useState, useEffect } from "react";
import { inject, observer } from "mobx-react";
import { List, Breadcrumb } from "antd";
import AppBar from "../../components/AppBar";
import Drawer from "../../components/Drawer";
import Archive from "../../components/Archive";
import styles from "./styles";
import "antd/dist/antd.css";
import CreateFolder from "../../components/Forms/CreateFolder";

const PAGES = [
  {
    key: 0,
    title: "Meus Arquivos",
    icon: "container",
    action: () => console.log("Meus Arquivos")
  },
  {
    key: 1,
    title: "Compartilhados Comigo",
    icon: "branches",
    action: () => console.log("Compartilhados Comigo")
  }
];

function Dashboard({ AppStore }) {
  const [childrenDir, setChildrenDir] = useState([]);

  useEffect(() => {
    AppStore.directory !== null &&
      setChildrenDir([...AppStore.directory.children]);
  }, [AppStore]);

  return (
    AppStore.directory !== null && (
      <div>
        <AppBar title="UTFBox" user={AppStore.user} />
        <main style={styles.mainContainer}>
          <Drawer pages={PAGES} selectedKey="0" />
          <div style={styles.contentContainer}>
            <Breadcrumb separator=">" style={{ margin: 14 }}>
              <Breadcrumb.Item>
                {`${AppStore.directory.title}`.toUpperCase()}
              </Breadcrumb.Item>
            </Breadcrumb>
            <div>
              {AppStore.directory.children.map((child, index) => (
                <Archive key={index} data={child} isLoading={false} />
              ))}
            </div>
            <div>
              <CreateFolder />
            </div>
          </div>
        </main>
      </div>
    )
  );
}

export default inject("AppStore")(observer(Dashboard));
