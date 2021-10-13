import { FunctionComponent } from "react";

import { Row, Col } from "react-bootstrap";
import NavBar from "../components/navbar";

import SideBar from "../components/sidebar/SideBar";

const styles = {
  contentDiv: {
    display: "flex",
  },
  contentMargin: {
    marginLeft: "10px",
    width: "100%",
  },
};
export const MainPage: FunctionComponent = () => {
  return (
    <>
      <Row>
        <Col>
          <NavBar />
        </Col>
      </Row>
      <div>
        <SideBar />
      </div>
    </>
  );
};

export default MainPage;
