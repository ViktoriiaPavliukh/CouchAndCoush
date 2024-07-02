import React from "react";
import { IconButton } from "@mui/material";
import { FavoriteBorderOutlined as Icon } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { favoriteAdvert } from "@/redux/marketplace/adverts/operations"; // Adjust the path according to your project structure

export function LikeBtn({ advertId }) {
  const dispatch = useDispatch();

  const handleLike = async () => {
    try {
      console.log(
        `advertId before dispatch: ${advertId}, type: ${typeof advertId}`
      );
      await dispatch(favoriteAdvert(String(advertId))).unwrap(); // Ensure advertId is a string
      // Handle success if needed
    } catch (error) {
      console.error("Failed to mark as favorite:", error);
      // Handle error appropriately
    }
  };

  return (
    <IconButton
      color="inherit"
      sx={{
        color: "text.primary",
        width: 32,
        height: 32,
        boxShadow:
          "0px 1px 1px 0px rgba(9, 10, 13, 0.08), 1px 0px 4px 0px rgba(9, 10, 13, 0.12)",
      }}
      onClick={handleLike}
    >
      <Icon sx={{ width: 16, height: 16 }} />
    </IconButton>
  );
}
