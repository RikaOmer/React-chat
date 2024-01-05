import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Popover from "react-bootstrap/Popover";
import Container from "react-bootstrap/Container";
import { BsCheck, BsExclamationDiamond } from "react-icons/bs";
function PopoverPass(props) {
  const [rows, setRows] = useState();
  useEffect(() => {
    const propsRows = props.demands.map((demand) => {
      const clas = demand.filled ? "text-success  " : "text-danger ";
      const ico = demand.filled ? (
        <BsCheck className="fs-5 mb-1" />
      ) : (
        <BsExclamationDiamond className="fs-6 mb-1" />
      );
      return (
        <Row
          key={demand.content}
          className={clas + "text-center mb-1 p-1 border-bottom"}
        >
          {ico}
          <span>{demand.content}</span>
        </Row>
      );
    });
    setRows(propsRows);
  }, [props.demands]);
  return (
    <Popover id="popover-basic  " className="border-0 rounded-0">
      <Popover.Header as="h3">{props.header}</Popover.Header>
      <Popover.Body className="border rounded">
        <Container>{rows}</Container>
      </Popover.Body>
    </Popover>
  );
}

export default PopoverPass;
