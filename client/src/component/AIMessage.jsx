import React, { useContext, useEffect, useState } from "react";
import "./Message.css";
import {
  Box,
  Card,
  ClickAwayListener,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { laguageCodeList } from "../utils/laguageCodeList";
import { googleTranslateApi } from "./googleTranslate";
// function AIMessage({ message }) {
//   useEffect(() => {
   
//   }, []);
//   return (
//     <>
//       {message ? (
//         <div className={message.role=="user"?"chat_message_receive" :"chat_message"}>
//           <span className="chat_name"></span>
//           <div dangerouslySetInnerHTML={{ __html: message.content }}></div>

//           <span className="chat_timestamp">{}</span>
//           <span className="chat_timestamp">{}</span>
//         </div>
//       ) : (
//         ""
//       )}
//     </>
//   );
// }

// export default AIMessage;



function AIMessage({ message, onChangeLoading }) {
  const [open, setOpen] = React.useState(false);
  const [translateMessage, setTranslateMessage] = useState();
  const anchorRef = React.useRef();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleOnclickLanguage = async (event, ele) => {
    onChangeLoading(true);
    const data = await googleTranslateApi({
      text: message.content,
      code: ele.code,
    });
    if (data) {
      setTranslateMessage(data);
    }
    onChangeLoading(false);
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleOnClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }


  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
    <>
      {message ? (
        <>
          {translateMessage ? (
            <Box
              className={message.role=="user"?"chat_message_receive" :"chat_message"}
            >
              {translateMessage}
            </Box>
          ) : (
            ""
          )}
          <div className={message.role=="user"?"chat_message_receive" :"chat_message"}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{ overflowWrap: "anywhere" }}
                dangerouslySetInnerHTML={{ __html: message.content }}
              ></div>
              <div style={{ top: "-12px" }}>
                <IconButton
                  ref={anchorRef}
                  id="composition-button"
                  aria-controls={open ? "composition-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleToggle}
                >
                  <ArrowDropDownIcon fontSize="small" />
                </IconButton>
                <Popper
                  style={{ height: "150px", overflowY: "auto" }}
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  placement="bottom-start"
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === "bottom-start"
                            ? "left top"
                            : "left bottom",
                      }}
                    >
                      <Paper>
                        <ClickAwayListener
                          onClickAway={(e) => {
                            handleOnClose(e);
                          }}
                        >
                          <MenuList
                            autoFocusItem={open}
                            id="composition-menu"
                            aria-labelledby="composition-button"
                            onKeyDown={handleListKeyDown}
                          >
                            {laguageCodeList.map((ele) => (
                              <MenuItem
                                onClick={(event) => {
                                  handleOnclickLanguage(event, ele);
                                }}
                              >
                                {ele.name}
                              </MenuItem>
                            ))}
                            {/* <MenuItem onClick={handleClose}>
                              My account
                            </MenuItem>
                            <MenuItem onClick={handleClose}>Logout</MenuItem> */}
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </div>
            </div>
{/* 
            <span className="chat_timestamp">{date}</span>
            <span className="chat_timestamp">{time}</span> */}
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default AIMessage;
