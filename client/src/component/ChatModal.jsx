import {
  Box,
  Button,
  styled,
  TextField,
  Modal,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import { useContext, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import EditorContainer from "../utils/EditorContainer";
import { ChatContext } from "../feature/context/ChatContext";

const Modalstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  dispaly: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: 24,
  maxHeight: "90%",
  borderRadius: "5px",
  overflow: "auto",
};
const ContentHeading = styled(AppBar)(() => ({
  position: "relative",
  backgroundColor: "#ec6a08",
  borderRadius: "5px 5px 0px 0px",
  color: "white",
}));
// deign for modal content
const ContentBody = styled(Box)(() => ({
  height: "65%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  // border: "1px solid black",
  padding: "10%",
  //   overflow: "auto",
}));

const Title = styled("span")(() => ({
  fontSize: "1.5rem",
  fontWeight: "500",
  textTransform: "capitalize",
  color: "white",
}));

export default function CreateMassageModal({ onClose, getAllList }) {
  const [message, setMessage] = useState();
  const { sendMessage,currentFriend } = useContext(ChatContext);
  const [loading, setLoading] = useState(false);

  const handleOnclickSendButton = async () => {
    setLoading(true);

    await sendMessage(currentFriend.pubkey, message);

   
    setLoading(false);
  };

  return (
    <Modal
      open={true}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {/* modal */}
      <Box sx={Modalstyle}>
        {/* heading */}

        <ContentHeading sx={{}}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              <Title> Write your message</Title>
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                onClose();
              }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </ContentHeading>

        {/* body */}
        <ContentBody>
          {/* message editor */}
          {/* <Title>Question :</SubTitle> */}
          <EditorContainer
            content={message}
            handleContent={(e) => {
              setMessage(e);
            }}
          />
                  
          {/* add button */}
          <Button
            sx={{ margin: "2% 0%" }}
            variant="contained"
            color="success"
            onClick={handleOnclickSendButton}
          >
            Send Message
          </Button>
        </ContentBody>
      </Box>
    </Modal>
  );
}
