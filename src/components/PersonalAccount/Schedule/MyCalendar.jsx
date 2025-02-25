import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useIntl } from "react-intl";
import { lightTheme, darkTheme } from "../../../styles/theme";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/uk";
import "moment/locale/en-gb";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CustomToolbar } from "./CustomToolbar";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import { selectTheme } from "@/redux/theme/selectors";
import { selectCurrentLanguage } from "@/redux/marketplace/languages/languageSlice";
import { selectCurrentUser } from "@/redux/users/selectors";
import {
  fetchBookings,
  fetchTeacherBookings,
  fetchStudentBookings,
  createBooking,
  markBookingInactive,
} from "@/redux/marketplace/bookings/operations";
import {
  selectBookings,
  selectStudentBookings,
} from "@/redux/marketplace/bookings/selectors";
import { getCurrentUser } from "@/redux/users/operations";
import ConfirmModal from "./ConfirmModal";
import ConfirmRemoveSlotModal from "./ConfirmRemoveSlotModal";
import TeacherOnlyModal from "./TeacherOnlyModal";
import momentLocale from "@/helpers/momentLocale";
import CustomEventComponent from "./CustomEventComponent";

let formats = {
  timeGutterFormat: "HH:mm",
};

export const MyCalendar = () => {
  const dispatch = useDispatch();
  const bookings = useSelector(selectBookings);
  const theme = useSelector(selectTheme);
  const language = useSelector(selectCurrentLanguage);
  const currentUser = useSelector(selectCurrentUser);
  const culture = language === "en" ? "en" : "uk";
  const defaultDate = new Date();
  defaultDate.setHours(7, 0, 0);
  const studentBookings = useSelector(selectStudentBookings);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openWarningModal, setOpenWarningModal] = useState(false);
  const [openRemoveSlotModal, setOpenRemoveSlotModal] = useState(false);
  const [teacherSlots, setTeacherSlots] = useState([]);

  const isSmallScreen = useMediaQuery("(max-width:768px)");

  const eventsList = [...bookings, ...studentBookings].map((booking) => ({
    start: new Date(booking.date),
    end: new Date(
      moment(booking.date)
        .add(booking.duration, "minutes")
        .add(1, "hour")
        .toISOString()
    ),
    student: booking.student || booking.teacher,
    bookingId: booking.id,
  }));

  useEffect(() => {
    dispatch(fetchTeacherBookings()).then((action) => {
      if (action.payload) {
        setTeacherSlots(action.payload);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchStudentBookings(currentUser.id));
  }, [dispatch, currentUser.id]);

  useEffect(() => {
    moment.locale(culture);
  }, [culture]);

  const localizer = useMemo(() => momentLocalizer(moment), [culture]);

  useEffect(() => {
    if (!currentUser || Object.keys(currentUser).length === 0) {
      dispatch(getCurrentUser());
    }
  }, [currentUser, dispatch]);

  useEffect(() => {
    momentLocale(language);
    moment.locale(culture);
  }, [language]);

  useEffect(() => {
    const startDate = moment().startOf("week").toISOString();
    const endDate = moment().endOf("week").toISOString();
    dispatch(fetchBookings({ startDate, endDate }));
  }, [dispatch]);

  const handleSlotSelection = ({ start, end }) => {
    const formattedStart = moment(start).toISOString();
    const formattedEnd = moment(end).toISOString();

    const existingSlot = teacherSlots.find(
      (slot) => moment(slot.date).isSame(start) && slot.isActive
    );

    if (existingSlot) {
      setSelectedSlot(existingSlot);
      setOpenRemoveSlotModal(true);
    } else {
      if (!currentUser.advert) {
        setOpenWarningModal(true);
        return;
      }

      setSelectedSlots([{ start: formattedStart, end: formattedEnd }]);
      setOpenConfirmModal(true);
    }
  };

  const handleRemoveSlot = () => {
    if (selectedSlot) {
      dispatch(markBookingInactive(selectedSlot.id))
        .then(() => {
          dispatch(fetchTeacherBookings());
        })
        .catch((error) => {
          console.error("Error removing slot:", error);
        });
      setOpenRemoveSlotModal(false);
      setSelectedSlot(null);
    } else {
      console.error("No selected slot to remove.");
    }
  };

  const handleSelectEvent = (event, e) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    setSelectedEvent(event);
  };

  const handleCreateBooking = () => {
    dispatch(createBooking({ timeslots: selectedSlots })).then(() => {
      dispatch(fetchTeacherBookings()).then((action) => {
        if (action.payload) {
          setTeacherSlots(action.payload);
        }
      });
    });
    setSelectedSlots([]);
  };

  const handleCloseModal = () => {
    setOpenWarningModal(false);
  };

  useEffect(() => {
    document.body.style.overflow = selectedEvent ? "hidden" : "auto";
  }, [selectedEvent]);

  const dayPropGetter = (date) => {
    const today = moment().startOf("day");
    const now = moment();
    const isToday = moment(date).isSame(today, "day");
    const isPast = moment(date).isBefore(now);

    let color = "inherit";

    if (isToday) {
      color = !theme
        ? lightTheme.palette.primary.main
        : darkTheme.palette.primary.main;
    }

    return {
      style: {
        color: isPast ? "#FFF" : color,
        pointerEvents: isPast ? "none" : "auto",
        opacity: isPast ? 0.5 : 1,
        backgroundColor: isPast ? "#aaaaaa" : "transparent",
        cursor: isPast ? "pointer" : "cell",
      },
    };
  };

  const slotPropGetter = (date) => {
    const existingSlot = teacherSlots.find((slot) =>
      moment(slot.date).isSame(date, "minute")
    );

    let backgroundColor = "transparent";

    if (existingSlot) {
      if (existingSlot.isActive && !existingSlot.isBooked) {
        backgroundColor = "#e7f1d3";
      } else if (!existingSlot.isActive) {
        backgroundColor = "#aaaaaa";
      }
    }

    return {
      style: {
        backgroundColor: backgroundColor,
      },
    };
  };
  return (
    <Box>
      {!isSmallScreen ? (
        <Calendar
          localizer={localizer}
          formats={formats}
          culture={culture}
          components={{
            toolbar: (props) => <CustomToolbar {...props} />,
            timeGutterHeader: TimeGutterHeader,
            event: CustomEventComponent,
            week: {
              header: CustomDayComponent,
            },
          }}
          defaultView={Views.WEEK}
          defaultDate={new Date()}
          scrollToTime={defaultDate}
          events={eventsList}
          startAccessor="start"
          endAccessor="end"
          style={{
            width: "100%",
            display: "flex",
            height: "auto",
            color: !theme ? "#6b7280" : "#9ca3af",
          }}
          timeslots={1}
          selectable
          popup={true}
          step={60}
          onSelectSlot={handleSlotSelection}
          onSelectEvent={handleSelectEvent}
          slotPropGetter={slotPropGetter}
          eventPropGetter={eventPropGetter}
          dayPropGetter={dayPropGetter}
          onSelecting={(slotInfo) => handleSlotSelection(slotInfo)}
          min={new Date(0, 0, 0, 7, 0)}
        />
      ) : (
        <Calendar
          localizer={localizer}
          formats={formats}
          culture={culture}
          components={{
            toolbar: (props) => <CustomToolbar {...props} />,
            timeGutterHeader: undefined,
            event: CustomEventComponent,
            week: {
              header: CustomDayComponent,
            },
          }}
          defaultView={Views.DAY}
          defaultDate={new Date()}
          scrollToTime={defaultDate}
          events={eventsList}
          startAccessor="start"
          endAccessor="end"
          style={{
            width: "100%",
            display: "flex",
            height: "auto",
            color: !theme ? "#6b7280" : "#9ca3af",
          }}
          timeslots={1}
          selectable
          popup={true}
          step={60}
          onSelectSlot={handleSlotSelection}
          onSelectEvent={handleSelectEvent}
          slotPropGetter={slotPropGetter}
          eventPropGetter={eventPropGetter}
          dayPropGetter={dayPropGetter}
          onSelecting={(slotInfo) => handleSlotSelection(slotInfo)}
          min={new Date(0, 0, 0, 7, 0)}
        />
      )}
      <ConfirmModal
        open={openConfirmModal}
        onClose={() => setOpenConfirmModal(false)}
        onConfirm={handleCreateBooking}
        slot={selectedSlots[0]}
      />
      <ConfirmRemoveSlotModal
        open={openRemoveSlotModal}
        onClose={() => setOpenRemoveSlotModal(false)}
        onConfirm={handleRemoveSlot}
        slot={selectedSlot}
      />
      <TeacherOnlyModal open={openWarningModal} onClose={handleCloseModal} />
    </Box>
  );
};

const eventPropGetter = (event) => {
  const eventStyle = {
    backgroundColor: event.student ? "#4185f4" : "transparent",
    border: "none",
    borderRadius: "12px",
    color: "#fff",
    height: "50px",
    padding: "10px 10px 60px",
  };

  return {
    style: eventStyle,
  };
};

const TimeGutterHeader = () => {
  const intl = useIntl();
  return (
    <Typography
      sx={(theme) => ({
        ...theme.typography.text,
        display: { xs: "none", md: "flex" },
      })}
    >
      {intl.formatMessage({ id: "schedule.week" })}
    </Typography>
  );
};

const CustomDayComponent = ({ date }) => {
  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "34px",
        gap: "3px",
        marginBottom: "12px",
      }}
    >
      <Box>{moment(date).format("DD")}</Box>
      <Box>{moment(date).format("ddd").toUpperCase()}</Box>
    </Stack>
  );
};
