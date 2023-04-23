import { useContext, useState } from "react";
import { ChatContext } from "./feature/context/ChatContext";

function CreateUser() {
  const [name, setName] = useState();
  const { createName} = useContext(ChatContext);
  return (
    <div>
      Enter name:
      <input
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <button onClick={createName(name)}>submit</button>
    </div>
  );
}

export default CreateUser;
