import { Nav } from "react-bootstrap";
import { useState } from "react";
import TabContent from "./tabContent";
import { Card } from "react-bootstrap";

function Tab(props) {
  let [tab, setTab] = useState(0);
  const tabs = [0, 1, 2];
  const tabBtn = ["Product Name", "Product Description", "Price"];

  return (
    <Card>
      <Card.Header>
        <Nav variant="tabs" defaultActiveKey="link0">
          {tabs.map((tabNum) => {
            return (
              <Nav.Item key={tabNum}>
                <Nav.Link
                  eventKey={"link" + tabNum}
                  onClick={() => setTab(tabNum)}
                >
                  {tabBtn[tabNum]}
                </Nav.Link>
              </Nav.Item>
            );
          })}
        </Nav>
      </Card.Header>
      <Card.Body>
        <TabContent
          tab={tab}
          title={props.title}
          content={props.content}
          price={props.price}
        />
      </Card.Body>
    </Card>
  );
}

export default Tab;
