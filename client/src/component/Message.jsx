import React, { useContext, useEffect, useState } from "react";
import "./Message.css";
import { ChatContext } from "../feature/context/ChatContext";
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
function Message({ message, onChangeLoading }) {
  const [open, setOpen] = React.useState(false);
  const [translateMessage, setTranslateMessage] = useState();
  const anchorRef = React.useRef();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleOnclickLanguage = async (event, ele) => {
    onChangeLoading(true);
    const data = await googleTranslateApi({
      text: message.msg,
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
  const { currentAccount } = useContext(ChatContext);

  const [time, setTime] = useState();
  const [date, setDate] = useState();
  const [isReceiver, setIsReceiver] = useState(false);

  function unixToTime(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    console.log(day + "-" + month + "-" + year);
    setDate("   " + day + "-" + month + "-" + year);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const seconds = "0" + date.getSeconds();
    const formattedTime =
      hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
    return formattedTime;
  }

  const setTimeAndDate = () => {
    setTime(unixToTime(parseInt(message.time, 16)));
  };
  useEffect(() => {
    setTimeAndDate();
    if (
      message.sender.slice(-10).toLowerCase() ===
      currentAccount.slice(-10).toLowerCase()
    ) {
      setIsReceiver(true);
    }
  }, []);

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
              className={isReceiver ? "chat_message_receive" : "chat_message"}
            >
              {translateMessage}
            </Box>
          ) : (
            ""
          )}
          <div className={isReceiver ? "chat_message_receive" : "chat_message"}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{ overflowWrap: "anywhere" }}
                dangerouslySetInnerHTML={{ __html: message.msg }}
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

            <span className="chat_timestamp">{date}</span>
            <span className="chat_timestamp">{time}</span>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default Message;
