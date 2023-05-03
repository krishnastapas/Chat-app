import React, { useContext, useState } from "react";
import { ChatContext } from "../feature/context/ChatContext";
import { Box, Card, TextField, Typography, useMediaQuery } from "@mui/material";
import { LoadingButton } from "@mui/lab";

function Register() {
  const [name, setName] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { createName } = useContext(ChatContext);
  const matches = useMediaQuery("(max-width:600px)");

  return (
    
      <Card
        style={{
          position: "absolute",
          width: matches ? "90vw" : "30vw",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          // border: "2px solid #000",
        }}
        sx={{ boxShadow: 4 }}
      >
        <Box sx={{ display: "flex", justifyContent: "center",margin: "5%" }}>
        <h1>Register </h1>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center",margin: "5%" }}>
          
        <TextField
              fullWidth
              size="small"
              label="Enter your name."
              variant="outlined"
              value={name}
              onChange={(event) => {
                setName(event.target.value)
              }}
              sx={{ mb: 2 }}
            />
        </Box>

        {/*  button div */}
        <Box
          style={{ display: "flex", justifyContent: "center", margin: "5%" }}
        >
          <LoadingButton
            variant="contained"
            color="success"
            loading={isLoading}
            onClick={async () => {
              setIsLoading(true);
              await createName(name);
              setIsLoading(false);
            }}
          >
            Submit
          </LoadingButton>
        </Box>
      </Card>
    
  );
}

export default Register;

// <div>
//   Enter name:
//   <input
//     value={name}
//     onChange={(e) => {
//       setName(e.target.value);
//     }}
//   />
// </div>
// <button
//   onClick={() => {
//     createName(name);
//   }}
// >
//   submit
// </button>
