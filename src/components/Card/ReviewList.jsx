import { PropTypes } from "prop-types";
import { Box, Button, List, ListItem, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { addFeedback } from "@/redux/user/operations";

export function ReviewList({ elements, id }) {
  const dispatch = useDispatch();
  const reviewHandleSubmit = (e) => {
    e.preventDefault();
    dispatch(addFeedback(id));
    const feedback = {
      rating: e.target.rating?.value,
      message: e.target.message?.value,
    };
    console.log(feedback, id);
  };
  return (
    <>
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 5,
          marginBottom: "30px",
        }}
      >
        {elements.map((e) => (
          <ListItem key={e.id} sx={{ display: "flex", gap: "24px" }}>
            <img src={e.image} alt={e.name} style={{ width: "85px", height: "85px", borderRadius: "50%" }} />
            <Box>
              <Typography component="p" variant="posterCategory" color="primary.main" sx={{ mb: "8px" }}>
                {e.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  lineHeight: "calc(20 / 14)",
                  color: "grey.600",
                }}
              >
                {e.text}
              </Typography>
            </Box>
          </ListItem>
        ))}
      </List>
      <form
        id="reviewForm"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          width: "100%",
          alignItems: "left",
          padding: "8px 16px",
          marginBottom: "30px",
        }}
        onSubmit={reviewHandleSubmit}
      >
        <Typography
          component="p"
          variant="posterCategory"
          color="primary.main"
          sx={{ mb: "0px", mr: "auto", ml: "auto" }}
        >
          Залиште свій відгук про викладача
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 5,
          }}
        >
          <label>Оцініть від 1 до 5:</label>
          <input
            type="number"
            style={{ height: "30px", borderRadius: "4px", padding: "12px" }}
            name="rating"
            min="1"
            max="5"
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 5,
          }}
        >
          <label>Ваш відгук</label>
          <textarea style={{ height: "200px", borderRadius: "4px", padding: "12px" }} name="message"></textarea>
        </div>
        <Button type="submit" sx={{ alignSelf: "center", p: "10px 18px" }} variant="contained">
          <Typography variant="posterButton">Відправити</Typography>
        </Button>
      </form>
    </>
  );
}

ReviewList.propTypes = {
  elements: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      text: PropTypes.string,
      image: PropTypes.string,
    })
  ),
  id: PropTypes.number,
};
