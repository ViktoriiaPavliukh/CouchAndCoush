import { useDispatch, useSelector } from "react-redux";
import { getUserMessages } from "@/redux/users/operations";
import { selectMessages } from "@/redux/users/selectors";
import { Box, Stack } from "@mui/material";
import { ChatWithUser } from "./ChatWithUser";
import { useEffect, useState } from "react";
import { ChatList } from "./ChatList";
import { selectUser } from "@/redux/auth/selectors";

export const Messages = ({ currentUser, fetchMessages }) => {
  const dispatch = useDispatch();
  const [isChatOpen, setIsChatOpen] = useState(false);
  console.log(currentUser);
  console.log(fetchMessages);
  const uniqueIds = new Set();
  if (fetchMessages) {
    fetchMessages.forEach((conversation) => {
      console.log(conversation);
      conversation.messages.forEach((message) => {
        console.log(message);
        if (message.senderId !== message.receiverId) {
          uniqueIds.add(message.senderId);
        }
      });
    });
  }

  const result = Array.from(uniqueIds);


  const sortedChats = [...fetchMessages].sort((a, b) => {
    const lastMessageA = a.messages[a.messages.length - 1];
    const lastMessageB = b.messages[b.messages.length - 1];

    if (lastMessageA && lastMessageB) {
      return (
        new Date(lastMessageB.writtedAt) - new Date(lastMessageA.writtedAt)
      );
    }
    if (lastMessageA) {
      return -1; 
    } else if (lastMessageB) {
      return 1; 
    }
    return 0; 
  });

  const [userChat, setUserChat] = useState(
    sortedChats.length > 0 ? sortedChats[0] : null
  );


  const getLastMessage = (messages) => {
    return messages.length > 0 ? messages[messages.length - 1] : null;
  };

  const lastMessage = getLastMessage(userChat?.messages || []);
  const userActive = lastMessage ? lastMessage.senderId : null;

  console.log(userChat, "userChat");
  console.log(lastMessage, "Last Message");
  console.log(userActive, "userActive");

  const onGoBack = () => {
    setIsChatOpen(false);
  };
  const onOpenChat = () => {
    setIsChatOpen(true);
  };

  return (
    <Box sx={{ width: "100%", height: "100vh" }}>
      {sortedChats.length !== 0 ? (
        <Stack
          sx={{
            display: { xs: "flex", md: "none" },
            flexDirection: { xs: "column" },
          }}
        >
          {isChatOpen && userChat ? (
            <ChatWithUser user={userChat} onClose={onGoBack} />
          ) : (
            <ChatList
              isMob
              user={userActive}
              onOpenChat={onOpenChat}
              setUserChat={setUserChat}
              messages={fetchMessages}
            />
          )}
          <ChatList
            isMob
            user={userActive}
            onOpenChat={onOpenChat}
            setUserChat={setUserChat}
            messages={fetchMessages}
          />
        </Stack>
      ) : (
        <p> у вас ще немає повідомлень</p>
      )}
      {sortedChats.length !== 0 ? (
        <Stack
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: { md: "row" },
            justifyContent: { md: "center" },
          }}
        >
          <ChatList
            user={userActive}
            onOpenChat={onOpenChat}
            setUserChat={setUserChat}
            messages={fetchMessages}
          />
          {userChat && <ChatWithUser user={userChat} currentUser={currentUser} />}
        </Stack>
      ) : (
        <p> у вас ще немає повідомлень</p>
      )}
    </Box>
  );
};

// import { useDispatch, useSelector } from "react-redux";
// import { getCurrentUser, getUserMessages } from "@/redux/users/operations";
// import { selectMessages } from "@/redux/users/selectors";
// import { Box, Stack } from "@mui/material";

// import { ChatWithUser } from "./ChatWithUser";
// import { useEffect, useState } from "react";
// import { ChatList } from "./ChatList";
// import { selectUser } from "@/redux/auth/selectors";

// export const Messages = ({ currentUser }) => {
//   console.log("Messages component mounted");
//   const dispatch = useDispatch();
//   const fetchMessages = useSelector(selectMessages);
//   const [messages, setMessages] = useState([]);
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   console.log(currentUser);

//   useEffect(() => {
//     console.log("component mounted"); // Log to check component mounting
//     dispatch(getUserMessages());
//     console.log("getUserMessages dispatched");
//   }, [dispatch]);

//   const uniqueIds = new Set();
//   console.log(uniqueIds);

//   // if (fetchMessages) {
//   //   fetchMessages.forEach((conversation) => {
//   //     console.log(conversation);
//   //     conversation.messages.forEach((message) => {
//   //       console.log(message);
//   //       if (message.senderId !== message.receiverId) {
//   //         uniqueIds.add(message.senderId);
//   //       }
//   //     });
//   //   });
//   // }

//   const result = Array.from(uniqueIds);
//   console.log(result);

//   console.log(fetchMessages);

//   const sortedChats2 = [...fetchMessages].sort((a, b) => {
//     const lastMessageA = a.messages[a.messages.length - 1];
//     const lastMessageB = b.messages[b.messages.length - 1];

//     if (lastMessageA && lastMessageB) {
//       return (
//         new Date(lastMessageB.writtedAt) - new Date(lastMessageA.writtedAt)
//       );
//     }
//     if (lastMessageA) {
//       return -1; // lastMessageA exists and lastMessageB doesn't
//     } else if (lastMessageB) {
//       return 1; // lastMessageB exists and lastMessageA doesn't
//     }
//     return 0; // both messages are empty
//   });

//   const [userChat, setUserChat] = useState(
//     sortedChats2.length > 0 ? sortedChats2[0] : null
//   );

//   // // Function to get the last message
//   const getLastMessage = (messages) => {
//     return messages.length > 0 ? messages[messages.length - 1] : null;
//   };

//   // useEffect(() => {
//   //   if (userChat) {
//   //     const lastMessage = getLastMessage(userChat.messages);
//   //     console.log(lastMessage, "Last Message");

//   //     if (lastMessage) {
//   //       // Now you can set userActive based on the last message
//   //       const userActive = lastMessage.senderId;
//   //       console.log(userActive);
//   //     }
//   //   }
//   // }, [userChat]); // Runs whenever userChat changes

//   // console.log(userChat);

//   // const [userChat, setUserChat] = useState(sortedChats2[0]);
//   console.log(userChat, "userChat");

//   const lastMessage = getLastMessage(userChat.messages);
//   console.log(lastMessage, "Last Message");
//   const userActive = lastMessage.senderId;
//   console.log(userActive, "userActive");

//   console.log(sortedChats2[0].messages, "sorted");

//   const onGoBack = () => {
//     setIsChatOpen(false);
//   };
//   const onOpenChat = () => {
//     setIsChatOpen(true);
//   };

//   return (
//     <Box sx={{ width: "100%" }}>
//       {/* {sortedChats2.length !== 0 ? (
//         <Stack
//           sx={{
//             display: { xs: "flex", md: "none" },
//             flexDirection: { xs: "column" },
//           }}
//         >
//           {isChatOpen && userChat ? (
//             <ChatWithUser user={userChat} onClose={onGoBack} />
//           ) : (
//             <ChatList
//               isMob
//               user={userActive}
//               onOpenChat={onOpenChat}
//               setUserChat={setUserChat}
//             />
//           )}
//           <ChatList
//             isMob
//             user={userActive}
//             onOpenChat={onOpenChat}
//             setUserChat={setUserChat}
//             messages={fetchMessages}
//           />
//         </Stack>
//       ) : (
//         <p> у вас ще немає повідомлень</p>
//       )} */}
//       {sortedChats2.length !== 0 ? (
//         <Stack
//           sx={{
//             display: { xs: "none", md: "flex" },
//             flexDirection: { md: "row" },
//             justifyContent: { md: "center" },
//           }}
//         >
//           <ChatList
//             user={userActive}
//             onOpenChat={onOpenChat}
//             setUserChat={setUserChat}
//             messages={fetchMessages}
//           />
//           {userChat && <ChatWithUser user={userChat} />}
//         </Stack>
//       ) : (
//         <p> у вас ще немає повідомлень</p>
//       )}
//     </Box>
//   );
// };
