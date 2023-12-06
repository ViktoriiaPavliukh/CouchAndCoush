import { PropTypes } from "prop-types";
import { useIntl } from "react-intl";
import { Button, Typography } from "@mui/material";

export function MessageBtn({ sx }) {
  const intl = useIntl();
  return (
    <Button
      sx={{ marginLeft: "auto", marginRight: " 20px", p: "10px 18px" }}
      variant="contained"
    >
      <Typography variant="posterButton">
        {intl.formatMessage({ id: "message" })}
      </Typography>
    </Button>
  );
}
MessageBtn.propTypes = {
  sx: PropTypes.objectOf(PropTypes.any),
};
