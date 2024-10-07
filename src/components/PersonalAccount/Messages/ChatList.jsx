import React, { useEffect } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "@/redux/users/operations";
import { selectUserById } from "@/redux/users/selectors";
import { selectTheme } from "@/redux/theme/selectors";
import { lightTheme, darkTheme } from "../../../styles/theme";
import { Aperture } from "react-feather";
import { PropTypes } from "prop-types";

export const ChatList = ({
  isMob,
  user,
  onOpenChat,
  setUserChat,
  messages,
  currentUser,
}) => {
  const theme = useSelector(selectTheme);
  const bckgrColor = !theme
    ? lightTheme.palette.background.messagesUsers
    : darkTheme.palette.background.messagesUsers;

  const handleSidebarChatClick = (chat) => {
    setUserChat(chat);
    isMob && onOpenChat();
  };

  return (
    <Box
      sx={{
        width: "40%",

        p: {
          sm: "32px 16px",
          md: "32px 12px 32px 60px",
          lg: "40px 12px",
        },
        boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.10)",
      }}
    >
      <List>
        {messages.map((chat) => {
          console.log(chat);
          const sortedMessages = [...chat.messages].sort((a, b) => {
            return new Date(b.writtedAt) - new Date(a.writtedAt);
          });
          const correspondenceId =
            sortedMessages[0].senderId === currentUser.id
              ? sortedMessages[0].receiverId
              : sortedMessages[0].senderId;
          const correspondenceName =
            correspondenceId === chat.user1.id
              ? chat.user1.firstName || "Unknown"
              : chat.user2.firstName || "Unknown";
          const correspondencePhoto =
            correspondenceId === chat.user1.id
              ? chat.user1.photoPath || null
              : chat.user2.photoPath || null;
          const lastMessage = sortedMessages[0];
          const isSelected = user === lastMessage;

          return (
            <React.Fragment key={chat.id}>
              <ListItem
                onClick={() => handleSidebarChatClick(chat)}
                sx={{
                  m: "12px 0",
                  backgroundColor: isSelected ? bckgrColor : "transparent",
                  "&:hover": { background: bckgrColor },
                }}
              >
                <ListItemAvatar>
                  {correspondencePhoto ? (
                    <Avatar
                      src={correspondencePhoto}
                      alt="Preview"
                      style={{
                        display: "flex",
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        borderRadius: "50px",
                        justifySelf: "center",
                        alignSelf: "center",
                        maxWidth: "263px",
                      }}
                    />
                  ) : (
                    <Avatar>
                      <Aperture />
                    </Avatar>
                  )}
                </ListItemAvatar>
                <ListItemText
                  primary={correspondenceName}
                  primaryTypographyProps={{
                    fontWeight: !lastMessage.isReaded ? "700" : "400",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                  secondary={lastMessage.text}
                  secondaryTypographyProps={{
                    fontWeight: !lastMessage.isReaded ? "700" : "400",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                />
              </ListItem>
              <Box
                sx={{
                  borderBottom: "1px solid #9CA3AF",
                }}
              />
            </React.Fragment>
          );
        })}
      </List>
    </Box>
  );
};

ChatList.propTypes = {
  isMob: PropTypes.bool,
  user: PropTypes.number.isRequired,
  onOpenChat: PropTypes.func.isRequired,
  setUserChat: PropTypes.func.isRequired,
};
