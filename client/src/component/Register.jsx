import React, { useContext, useState } from "react";
import { ChatContext } from "../feature/context/ChatContext";

function Register() {
  const [name, setName] = useState();
  const { createName } = useContext(ChatContext);
  return (
    <>
      <div>
        Enter name:
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <button
        onClick={() => {
          createName(name);
        }}
      >
        submit
      </button>
    </>
  );
}

export default Register;
