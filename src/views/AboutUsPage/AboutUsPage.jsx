import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { Link, useLocation } from "react-router-dom";
import {
  Container,
  Typography,
  Stack,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { AboutUsImage } from "./AboutUsImage";

export function AboutUsPage() {
  const intl = useIntl();
  const [pathname, setPathname] = useState("");
  const path = useLocation().pathname;
  useEffect(() => {
    setPathname(path);
  }, [path]);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <Container
      sx={{ display: "flex", flexDirection: "row", flexWrap: "nowrap" }}
    >
      <Stack
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "49%",
            gap: "40px",
          }}
        >
          <Typography variant="title">Coach&Couch -</Typography>
          <Typography variant="text">
            {intl.formatMessage({ id: "aboutText1" })}
          </Typography>
          <Box>
            <Typography variant="text">
              {intl.formatMessage({ id: "aboutText2" })}
            </Typography>
            <List>
              <ListItem sx={{ display: "flex", gap: "12px" }}>
                <CheckCircleIcon fontSize="large" sx={{ color: "green" }} />
                <ListItemText
                  primary={intl.formatMessage({ id: "aboutList1" })}
                />
              </ListItem>
              <ListItem sx={{ display: "flex", gap: "12px" }}>
                <CheckCircleIcon fontSize="large" sx={{ color: "green" }} />
                <ListItemText
                  primary={intl.formatMessage({ id: "aboutList2" })}
                />
              </ListItem>
              <ListItem sx={{ display: "flex", gap: "12px" }}>
                <CheckCircleIcon fontSize="large" sx={{ color: "green" }} />
                <ListItemText
                  primary={intl.formatMessage({ id: "aboutList3" })}
                />
              </ListItem>
            </List>
          </Box>
          <Typography variant="text">
            {intl.formatMessage({ id: "aboutText3" })}
          </Typography>
        </Box>
        <AboutUsImage />
      </Stack>
      {/* <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "45px",
          paddingTop: "187px",
        }}
      >
        <Typography variant="bigTitle">
          {intl.formatMessage({ id: "header.aboutUs" })}
        </Typography>
        <Stack
          sx={{
            display: "flex",
            gap: "58px",
            flexDirection: "column",
            alignSelf: "end",
            maxWidth: "771px",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="text"
              sx={{ paddingBottom: "9px", borderBottom: "3px solid #146817" }}
            >
              Coach&Couch{" "}
            </Typography>
            <Typography
              variant="text"
              sx={{
                display: "flex",
                alignSelf: "end",
                textAlign: "right",
                maxWidth: "413px",
              }}
            >
              {intl.formatMessage({ id: "aboutSubtitle" })}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="text">
              {intl.formatMessage({ id: "aboutText1" })}
            </Typography>
            <Typography variant="text">
              {intl.formatMessage({ id: "aboutText2" })}
            </Typography>
            <Typography variant="text">
              {intl.formatMessage({ id: "aboutText3" })}
            </Typography>
          </Box>
          <Typography variant="textUppercase" sx={{ maxWidth: "473px" }}>
            {intl.formatMessage({ id: "aboutUpper" })}
          </Typography>
          {!isLoggedIn && (
            <Box>
              <Button
                component={Link}
                to="/login"
                sx={{
                  px: "12px",
                  transition: "color 0.3s",
                  borderRadius: "6px",
                  backgroundColor: (theme) =>
                    pathname === "/login" ? theme.palette.primary.accent : null,
                  "&:hover": {
                    backgroundColor: (theme) => theme.palette.primary.accent,
                    color: "white",
                  },
                }}
              >
                {" "}
                <Typography>
                  {intl.formatMessage({ id: "header.login" })}
                </Typography>
              </Button>
              <Button
                component={Link}
                to="/registration"
                sx={{
                  px: "12px",
                  transition: "color 0.3s",
                  borderRadius: "6px",
                  backgroundColor: (theme) =>
                    pathname === "/registration"
                      ? theme.palette.primary.accent
                      : null,
                  "&:hover": {
                    backgroundColor: (theme) => theme.palette.primary.accent,
                    color: "white",
                  },
                }}
              >
                {" "}
                <Typography>
                  {intl.formatMessage({ id: "header.registration" })}
                </Typography>
              </Button>
            </Box>
          )}
        </Stack>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "45px",
          paddingTop: "187px",
        }}
      ></Box> */}
    </Container>
  );
}
