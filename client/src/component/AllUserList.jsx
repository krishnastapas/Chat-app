import React, { useState, useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
  OutlinedInput,
  Checkbox,
  ListItemText,
  styled,
  Card,
  Avatar,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ChatContext } from "../feature/context/ChatContext";
import { useContext } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  display: "block",
  height: "90%",
};
const CardHeader = styled(Box)(() => ({
  display: "flex",
  paddingLeft: "24px",
  paddingRight: "24px",
  marginBottom: "12px",
  alignItems: "center",
  justifyContent: "space-between",
}));
const ButtonCenter = styled(Box)(() => ({
  display: "grid",
  paddingLeft: "45%",
  width: "100vp",
  height: "50px",
  alignItems: "center",
  justifyContent: "space-between",
}));
const Title = styled("span")(() => ({
  fontSize: "1.5rem",
  fontWeight: "500",
  textTransform: "capitalize",
}));
const AllUserModal = ({ handleModal }) => {
  const { allUserList, addFriend } = useContext(ChatContext);
  console.log(allUserList[0].name);
  const [loading, setLoading] = useState(false);

  const handleAddfriend = async (account, name) => {
    setLoading(true);
    await addFriend(account, name);
    setLoading(false);
    handleModal("");
  };
  return (
    <div>
      <Modal
        open={true}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AppBar
            sx={{ position: "relative", backgroundColor: "#b2bec7" }}
            color="transparent"
          >
            <Toolbar>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                <Title> All user</Title>
              </Typography>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => {
                  handleModal("");
                }}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Box style={{ padding: "5%", height: "80%", overflow: "auto" }}>
            {allUserList &&
              allUserList.map((ele, index) => (
                <Card
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    margin: "10% 0%",
                  }}
                >
                  <Box>
                    <Box
                      style={{
                        display: "flex",
                        width: "90%",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        style={{
                          display: "flex",
                          margin: "5%",
                        }}
                      >
                        <Avatar />
                        <h2
                          style={{
                            margin: "9px 0px 0px 16px",
                          }}
                        >
                          {ele.name}
                        </h2>
                      </Box>
                      <Box style={{ marginTop: "8%" }}>
                        <LoadingButton
                          loading={loading}
                          variant="contained"
                          onClick={() => {
                            handleAddfriend(ele.accountAddress, ele.name);
                          }}
                        >
                          Message
                        </LoadingButton>
                      </Box>
                    </Box>
                    <h4
                      style={{
                        marginLeft: "25px",
                      }}
                    >
                      {" "}
                      Account Address : {ele.accountAddress}
                    </h4>
                  </Box>
                </Card>
              ))}
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default AllUserModal;
