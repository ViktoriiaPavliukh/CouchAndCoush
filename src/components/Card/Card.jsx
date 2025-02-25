import { useIntl } from "react-intl";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  advertByIdSelector,
  selectAdvertsIsLoading,
} from "@/redux/marketplace/adverts/advertsSelector";
import { getCurrentUser } from "@/redux/users/operations";
import { selectCurrentUser } from "@/redux/users/selectors";
import { useParams } from "react-router-dom";
import { Modal } from "../Modal/Modal";
import { Box, Button, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { MainImage } from "./MainImage";
import { LikeBtn } from "./LikeBtn";
import { MessageBtn } from "./MessageBtn";
import { CategoryList } from "./CategoryList";
import { ReviewList } from "./ReviewList";
import countriesCase from "@/helpers/countriesCase";
import countries from "../../defaults/countries/countries.json";
import { selectCurrentLanguage } from "@/redux/marketplace/languages/languageSlice";
import { getAdvertById } from "@/redux/marketplace/adverts/operations";
import Loader from "../Loader/Loader";
import { roundRating } from "@/helpers/roundRating";
import { Stack } from "@mui/system";
import useStatus from "@/hooks/useStatus";
import {
  favoriteAdvert,
  getAdverts,
} from "@/redux/marketplace/adverts/operations";
import { fetchStudentBookings } from "@/redux/marketplace/bookings/operations";
import {
  selectTeacherBookings,
  selectStudentBookings,
} from "@/redux/marketplace/bookings/selectors";
import { fetchTeacherSlots } from "@/redux/marketplace/bookings/operations";

export function Card() {
  const intl = useIntl();
  const location = useLocation();
  const en = useSelector(selectCurrentLanguage);
  const { id } = useParams();
  const dispatch = useDispatch();
  const teacher = useSelector(advertByIdSelector);
  const [showModal, setShowModal] = useState(false);
  const [modalContentType, setModalContentType] = useState(null);
  const [isFirstTimeBooking, setIsFirstTimeBooking] = useState(true);
  const currentUser = useSelector(selectCurrentUser);
  const isLoading = useSelector(selectAdvertsIsLoading);
  const teacherBookings = useSelector(selectTeacherBookings);
  const studentBookings = useSelector(selectStudentBookings);
  const isCurrentTeacher = currentUser?.advert?.id === Number(id);
  const lastVisit = teacher?.user?.lastVisit;
  const userLike = teacher?.likes?.some(
    (like) => like?.user?.id === currentUser.id
  );
  const status = useStatus(lastVisit);

  useEffect(() => {
    dispatch(getAdvertById(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getCurrentUser());
    if (teacher) {
      dispatch(getAdvertById(id));
      dispatch(fetchTeacherSlots(id));
    }
  }, [dispatch]);

  useEffect(() => {
    if (currentUser?.id) {
      dispatch(fetchStudentBookings(currentUser.id));
    }
  }, [dispatch, currentUser?.id]);

  useEffect(() => {
    if (studentBookings.length > 0 && id) {
      const hasBookedBefore = studentBookings.some(
        (booking) => booking.advert.id.toString() === id
      );
      setIsFirstTimeBooking(!hasBookedBefore);
    }
  }, [studentBookings, id, currentUser]);

  useEffect(() => {
    if (location.state?.showModal) {
      setModalContentType(location.state.modalContentType);
      setShowModal(true);
    }
  }, [location]);

  if (!teacher) return <Loader />;

  const handleFavoriteAdd = async (id) => {
    try {
      await dispatch(favoriteAdvert(id));
      await dispatch(getAdvertById(id));
    } catch (error) {
      console.error("Failed to update favorite and fetch adverts:", error);
    }
  };

  const onShowModalClick = (contentType) => {
    setModalContentType(contentType);
    setShowModal(true);
  };

  const onBackdropClose = () => {
    setShowModal(false);
    setModalContentType(null);
  };

  return (
    <Box
      component="div"
      sx={{
        width: "100%",
        py: "40px",
        px: { xs: "16px", md: "60px" },
      }}
    >
      {isLoading || Object.keys(teacher).length === 0 ? (
        <Loader />
      ) : (
        <Box
          sx={{
            display: "flex",
            gap: "56px",
            mb: "57px",
            flexDirection: { xs: "column", lg: "row" },
          }}
        >
          <MainImage src={teacher.imagePath} />
          <Box
            sx={{
              display: "flex",
              width: { xs: "100%", lg: "60%" },
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: { xs: "100%", lg: "463px" },
                mb: "20px",
                justifyContent: "space-between",
                alignItems: "center",
                p: 0,
                gap: "24px",
              }}
            >
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                <Typography variant="fontHeader">
                  {teacher.user?.firstName}
                </Typography>
                <Typography variant="fontHeader">
                  {teacher.user?.lastName}
                </Typography>
              </Stack>
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <LikeBtn
                  isLiked={userLike}
                  onClick={(event) => {
                    event.stopPropagation();
                    handleFavoriteAdd(id);
                  }}
                />
                <Typography variant="posterDescription">
                  {teacher?.likes?.length || 0}
                </Typography>
              </Stack>
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <CircleIcon
                  fontSize="12px"
                  sx={{
                    color:
                      status === intl.formatMessage({ id: "online" })
                        ? (theme) => theme.palette.buttonColor.listItem
                        : (theme) => theme.palette.textColor.grey,
                  }}
                />
                <Typography
                  variant="posterDescription"
                  sx={{ textWrap: "nowrap" }}
                >
                  {status}
                </Typography>
              </Stack>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: "20px",
                gap: "12px",
                width: { xs: "100%", lg: "463px" },
              }}
            >
              <Stack
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  py: "16px",
                  backgroundColor: (theme) =>
                    theme.palette.buttonColor.listItem,
                  color: (theme) => theme.palette.textColor.black,
                  borderRadius: "8px",
                  gap: "10px",
                  width: "100%",
                }}
              >
                <Typography variant="posterDescription">
                  {intl.formatMessage({ id: "rate" })}
                </Typography>
                <Typography variant="fontHeader">
                  {teacher ? roundRating(teacher?.user?.rating) : null}
                </Typography>
              </Stack>
              <Stack
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  py: "16px",
                  backgroundColor: (theme) =>
                    theme.palette.buttonColor.listItem,
                  color: (theme) => theme.palette.textColor.black,
                  borderRadius: "8px",
                  gap: "10px",
                  width: "100%",
                }}
              >
                <Typography variant="posterDescription">
                  {intl.formatMessage({ id: "priceOfLesson" })}
                </Typography>
                <Typography variant="fontHeader">
                  {Math.ceil(teacher.price)}$
                </Typography>
              </Stack>
            </Box>
            <Typography variant="text">
              {intl.formatMessage({ id: "country" })}
            </Typography>
            <CategoryList
              elements={
                teacher.user?.country
                  ? en === "en"
                    ? countriesCase(
                        countries.find(
                          (el) => el.alpha2 === teacher.user.country?.alpha2
                        )?.nameEng || ""
                      ).split(",")
                    : countriesCase(
                        countries.find(
                          (el) => el.alpha2 === teacher.user.country?.alpha2
                        )?.nameShort || ""
                      ).split(",")
                  : null
              }
            />

            <Typography variant="text">
              {intl.formatMessage({ id: "languagesTeaching" })}
            </Typography>
            <CategoryList
              elements={
                teacher.teachingLanguages &&
                teacher.teachingLanguages.map((el) =>
                  en == "en" ? el.languageEn : el.languageUa
                )
              }
            />
            <Typography variant="text">
              {intl.formatMessage({ id: "specialization" })}
            </Typography>
            <CategoryList
              elements={
                teacher.specializations &&
                teacher.specializations.map((el) =>
                  en == "en" ? el.specializationEn : el.specializationUa
                )
              }
            />
            {isCurrentTeacher ? null : (
              <Box
                sx={{
                  width: { xs: "100%", lg: "57%", xl: "41%" },
                  display: "flex",
                  flexDirection: "row",
                  gap: "24px",
                  mt: "20px",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  onClick={() => onShowModalClick("trialLesson")}
                  type="button"
                  variant="contained"
                  sx={{
                    p: "12px 24px",
                    borderRadius: "6px",
                    flexGrow: 1,
                  }}
                >
                  <Typography variant="posterButton">
                    {isFirstTimeBooking
                      ? intl.formatMessage({ id: "trialLessonBtn" })
                      : intl.formatMessage({ id: "bookLesson" })}
                  </Typography>
                </Button>
                <MessageBtn
                  onShowModalClick={() => onShowModalClick("sendMessage")}
                />
              </Box>
            )}
          </Box>
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          gap: "56px",
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        {" "}
        <Stack
          sx={{
            width: { xs: "100%", lg: "54%", xl: "49%" },
          }}
        >
          <Typography variant="fontHeader" component="p" mb="20px">
            {intl.formatMessage({ id: "aboutMe" })}
          </Typography>
          <Typography variant="text" sx={{ mb: "40px", textAlign: "justify" }}>
            {teacher.description}
          </Typography>
        </Stack>
        <Box
          sx={{
            display: "flex",
            width: { xs: "100%" },
            flexDirection: "column",
          }}
        >
          <ReviewList
            feedback={teacher ? teacher?.user?.feedbacksToMe?.length : null}
            id={teacher ? teacher?.user?.id : null}
            advertId={teacher ? teacher.id : null}
          />
        </Box>
        {showModal && (
          <Modal
            currentUser={currentUser}
            user={teacher.user.id}
            id={teacher.id}
            onBackdropClose={onBackdropClose}
            contentType={modalContentType}
            teacherBookings={teacherBookings}
            isFirstTimeBooking={isFirstTimeBooking}
          />
        )}
      </Box>
    </Box>
  );
}

