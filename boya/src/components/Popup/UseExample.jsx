import React, { useRef, useState } from "react";
import FormControl from "react-bootstrap/FormControl";
import PopoverPass from "./Popover";
function UseExample() {
  const popup = useRef();
  const [passwordDemands, setPasswordDemands] = useState([
    {
      filled: false,
      content: "At least 12 characters long but 14 or more is better.",
    },
    {
      filled: false,
      content:
        "A combination of uppercase letters, lowercase letters, numbers, and symbols",
    },
  ]);

  function CheckValidality(e) {
    popup.current.classList.remove("d-none");
    if (e.target.value.length > 12) {
      const newList = [...passwordDemands];
      newList[0].filled = true;
      setPasswordDemands(newList);
    }
  }
  return (
    <div>
      <div ref={popup} className="d-none position-absolute start-50 top-0">
        <PopoverPass demands={passwordDemands} header="Password Demands" />
      </div>
      <FormControl onChange={CheckValidality} />
      <button>click me</button>
    </div>
  );
}

export default UseExample;
