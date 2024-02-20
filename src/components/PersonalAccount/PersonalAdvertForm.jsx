import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { useIntl } from "react-intl";
import * as Yup from "yup";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import { PersonalImage } from "./PersonalImage";
import IconPlus from "../../assets/icons/IconPlus.jsx";
import countriesCase from "@/helpers/countriesCase";
import {
  advertByIdSelector,
  selectAdvertsIsLoading,
} from "@/redux/marketplace/adverts/advertsSelector";
import { selectCurrentUser } from "@/redux/users/selectors";
import { getAdvertById } from "@/redux/marketplace/adverts/operations";
import { editAdvert } from "@/redux/marketplace/adverts/operations";
import { selectCurrentLanguage } from "@/redux/marketplace/languages/languageSlice";
import countries from "../../defaults/countries/countries.json";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

const validationSchema = Yup.object({
  price: Yup.number().integer().min(0).required("Price is required"),
  // description: Yup.string().required("Description is required"),
  // spokenLanguages: Yup.array().min(1, "Select at least one spoken language"),
  // teachingLanguages: Yup.array().min(
  //   1,
  //   "Select at least one teaching language"
  // ),
  // specializations: Yup.array().required("Specialization is required"),
  // image: Yup.mixed().required("Select image for your advert"),
});

export const PersonalAdvertForm = ({
  currentUser,
  countriesList,
  languages,
  specializations,
  advertId,
  teacher,
  dataChanged,
}) => {
  const intl = useIntl();
  const en = useSelector(selectCurrentLanguage);
  const [image, setImage] = useState(currentUser.advert.imagePath);
  const [editMode, setEditMode] = useState(false);
  const [teacherData, setTeacherData] = useState(teacher);
  const [formData, setFormData] = useState({
    image: currentUser?.advert?.imagePath || "",
    firstName: currentUser?.firstName || "",
    lastName: currentUser?.lastName || "",
    email: currentUser?.email || "",
    birthday: currentUser?.birthday
      ? format(new Date(currentUser.birthday), "dd.MM.yyyy")
      : "",
    sex: currentUser?.sex || "",
    country: currentUser?.country?.alpha2
      ? countriesCase(
          en === "en"
            ? countries.find((el) => el.alpha2 === currentUser?.country?.alpha2)
                ?.nameEng || ""
            : countries.find((el) => el.alpha2 === currentUser?.country?.alpha2)
                ?.nameShort || ""
        )
      : "",
    registeredAt: currentUser?.registeredAt
      ? format(new Date(currentUser.registeredAt), "dd.MM.yyyy HH:mm")
      : "",
    description: currentUser?.advert?.description || "",
    price: currentUser?.advert?.price || "",
    specializations: currentUser?.advert?.specializations || [],
    spokenLanguages: currentUser?.advert?.spokenLanguages || [],
    teachingLanguages: currentUser?.advert?.teachingLanguages || [],
  });
  const dispatch = useDispatch();

  const handleTeacherProfileSubmit = (e) => {
    e.preventDefault();
    setEditMode(false);
  };

  const formik = useFormik({
    initialValues: formData,
    validationSchema,
    onSubmit: handleTeacherProfileSubmit,
  });

  const handleSaveButtonClick = async () => {
    let formData;
    try {
      await formik.validateForm();

      if (Object.keys(formik.errors).length > 0) {
        console.error("Validation errors:", formik.errors);
        return;
      }

      formData = new FormData();

      formData.append("image", formik.values.image);
      setFormData((prevData) => ({
        ...prevData,
        image: formik.values.image,
      }));

      // // Specializations
      // formik.values.specializations.forEach((spec) => {
      //   formData.append("specializations[]", spec.id);
      // });

      // // Spoken Languages
      // formik.values.spokenLanguages.forEach((lang) => {
      //   formData.append("spokenLanguages[]", lang.id);
      // });

      const teachingLanguagesIds = formik.values.teachingLanguages.map(
        (lang) => lang.id
      );
      formData.append(
        "teachingLanguages",
        JSON.stringify(teachingLanguagesIds)
      );

      // formData.append("description", formik.values.description);

      // Dispatch the editAdvert action
      await dispatch(editAdvert({ advertId, formData }));

      // If successful, set edit mode to false
      setEditMode(false);

      console.log("FormData:", formData);
    } catch (error) {
      console.error("Error editing advert:", error);
      // Handle error
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("Input changed:", name, value);
    formik.setFieldValue(name, value);
    console.log("Price value after change:", formik.values.price);
  };

  // Effect to refetch advert data when dataChanged state changes
  // useEffect(() => {
  //   if (dataChanged) {
  //     // Dispatch getAdvertById to fetch the updated advert data
  //     dispatch(getAdvertById(advertId))
  //       .then((data) => {
  //         // Update the teacher state with the fetched data
  //         setTeacherData(data.payload);
  //       })
  //       .catch((error) =>
  //         console.error("Error fetching updated advert data: ", error)
  //       );
  //   }
  // }, [dispatch, advertId, dataChanged]);

  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", lg: "72%", xl: "80%" },
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          gap: "24px",
          alignItems: { xs: "center", md: "flex-start" },
          paddingLeft: { sm: "18px", md: "60px", lg: "14px", xl: "36px" },
          paddingRight: { sm: "18px", md: "60px", lg: "0" },
          paddingY: { xs: "66px", md: "40px" },
        }}
      >
        <Box
          style={{
            border: "1px solid #D1D5DB",
            borderRadius: "16px",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          {image && (
            <img
              src={image ? image : currentUser.advert.imagePath}
              alt="user's advert"
              style={{
                minHeidth: "100%",
                objectFit: "cover",
                display: "flex",
                width: "263px",
                height: "205px",
                alignSelf: "stretch",
              }}
            />
          )}

          <label
            htmlFor="image"
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              cursor: "pointer",
              position: "absolute",
            }}
          >
            <TextField
              disabled={!editMode}
              style={{
                display: "none",
              }}
              fullWidth
              type="file"
              id="image"
              name="image"
              variant="outlined"
              accept="image/*"
              placeholder=""
              onChange={(event) => {
                formik.setFieldValue("image", event.target.files[0]);
                setImage(URL.createObjectURL(event.target.files[0]));
              }}
              onBlur={formik.handleBlur}
              error={formik.touched.image && Boolean(formik.errors.image)}
              helperText={formik.touched.image && formik.errors.image}
            />
          </label>
          {Boolean(!image) && (
            <>
              <label
                disabled={!editMode}
                htmlFor="photoPath"
                style={{
                  cursor: "pointer",
                  padding: "8px 12px",
                  border: "1px solid #D1D5DB",
                  borderRadius: "6px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  gap: "12px",
                }}
              >
                <IconPlus />
                {intl.formatMessage({ id: "newPhoto" })}
              </label>
            </>
          )}
        </Box>
        <Typography
          variant="posterItem"
          sx={{ color: (theme) => theme.palette.textColor.remarks }}
        >
          {intl.formatMessage({ id: "imgAdvise" })}
        </Typography>
        <Typography
          variant="posterItem"
          sx={{ color: (theme) => theme.palette.textColor.remarks }}
        >
          {intl.formatMessage({ id: "saveAdvise" })}
        </Typography>
        <TextField
          fullWidth
          // focused
          id="firstName"
          name="firstName"
          type="text"
          label={intl.formatMessage({ id: "name" })}
          disabled={true}
          defaultValue={currentUser?.firstName}
          variant="outlined"
          onChange={handleInputChange}
          onBlur={formik.handleBlur}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
        <TextField
          fullWidth
          id="lastName"
          name="lastName"
          type="text"
          label={intl.formatMessage({ id: "lastName" })}
          defaultValue={currentUser?.lastName || ""}
          variant="outlined"
          disabled={true}
          onChange={handleInputChange}
          onBlur={formik.handleBlur}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
        <TextField
          label="Email"
          name="email"
          defaultValue={currentUser?.email}
          sx={{ width: { xs: "100%" } }}
          variant="outlined"
          disabled={true}
          onChange={handleInputChange}
          error={Boolean(formik.errors.email)}
          helperText={formik.errors.email}
        />
        <Stack
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "24px 24px",
            justifyContent: "space-between",
          }}
        >
          <TextField
            type="date"
            label={intl.formatMessage({ id: "birthday" })}
            sx={{
              flex: "1 1 auto",
              width: { xs: "100%", lg: "auto" },
              // width: { xs: "100%", lg: "31%", xl: "32%" },
              // marginBottom: { xs: "24px", lg: "0" },
            }}
            id="userBirthday"
            name="birthday"
            disabled={true}
            defaultValue={
              currentUser.birthday
                ? format(new Date(currentUser.birthday), "yyyy-MM-dd")
                : ""
            }
            onChange={handleInputChange}
            onBlur={formik.handleBlur}
            error={formik.touched.birthday && Boolean(formik.errors.birthday)}
            helperText={formik.touched.birthday && formik.errors.birthday}
          />

          <FormControl
            variant="outlined"
            sx={{
              flex: "1 1 auto",
              // width: { xs: "100%", md: "48%", lg: "31%", xl: "31%" },
              // marginBottom: { xs: "24px", md: "0" },
            }}
          >
            <InputLabel> {intl.formatMessage({ id: "sex" })}</InputLabel>
            <Select
              id="sex"
              name="sex"
              label={intl.formatMessage({ id: "sex" })}
              disabled={true}
              defaultValue={
                currentUser.sex === "male"
                  ? "male"
                  : currentUser.sex === "female"
                  ? "female"
                  : "other"
              }
              onChange={handleInputChange}
              onBlur={formik.handleBlur}
              error={formik.touched.sex && Boolean(formik.errors.sex)}
            >
              <MenuItem value="male">
                {intl.formatMessage({ id: "male" })}
              </MenuItem>
              <MenuItem value="female">
                {intl.formatMessage({ id: "female" })}
              </MenuItem>
              <MenuItem value="other">
                {intl.formatMessage({ id: "other" })}
              </MenuItem>
            </Select>
          </FormControl>
          <TextField
            sx={{
              "&::placeholder": {
                color: "red",
              },
              // width: { xs: "100%", md: "49%", lg: "31%", xl: "32%" },
              flex: "1 1 auto",
            }}
            id="price"
            disabled={!editMode}
            name="price"
            label={intl.formatMessage({ id: "pricePerHour" })}
            variant="outlined"
            type="number"
            defaultValue={formData.price}
            onChange={handleInputChange}
            onBlur={formik.handleBlur}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
            InputLabelProps={{ shrink: true }}
            InputProps={{ placeholder: "" }}
          />
        </Stack>
        <TextField
          fullWidth
          id="country"
          name="country"
          label={intl.formatMessage({ id: "country" })}
          variant="outlined"
          disabled={true}
          value={
            currentUser?.country && en === "en"
              ? countriesCase(
                  countries.find(
                    (el) => el.alpha2 === currentUser.country?.alpha2
                  ).nameEng
                ).split(",")
              : countriesCase(
                  countries.find(
                    (el) => el.alpha2 === currentUser.country?.alpha2
                  ).nameShort
                ).split(",")
          }
          onChange={handleInputChange}
          onBlur={formik.handleBlur}
          error={formik.touched.country && Boolean(formik.errors.country)}
          helperText={formik.touched.country && formik.errors.country}
        />
        <FormControl fullWidth variant="outlined">
          <InputLabel>
            {intl.formatMessage({ id: "languagesSpoken" })}
          </InputLabel>
          <Select
            id="spokenLanguages"
            name="spokenLanguages"
            disabled={!editMode}
            multiple
            label="languagesSpoken"
            value={teacher?.spokenLanguages || []}
            onChange={handleInputChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.spokenLanguages &&
              Boolean(formik.errors.spokenLanguages)
            }
            renderValue={(selected) =>
              selected
                .map((language) =>
                  en === "en" ? language.languageEn : language.languageUa
                )
                .join(", ")
            }
          >
            {languages &&
              languages.map((language) => (
                <MenuItem key={language.id} value={language}>
                  {language.languageUa}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl fullWidth variant="outlined">
          <InputLabel>
            {intl.formatMessage({ id: "languagesTeaching" })}
          </InputLabel>
          <Select
            id="teachingLanguages"
            name="teachingLanguages"
            multiple
            label={intl.formatMessage({ id: "languagesTeaching" })}
            disabled={!editMode}
            defaultValue={teacher?.teachingLanguages || []}
            onChange={handleInputChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.teachingLanguages &&
              Boolean(formik.errors.teachingLanguages)
            }
            renderValue={(selected) =>
              selected
                .map((language) =>
                  en === "en" ? language.languageEn : language.languageUa
                )
                .join(", ")
            }
          >
            {languages &&
              languages.map((language) => (
                <MenuItem key={language.id} value={language}>
                  {language.languageUa}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl fullWidth variant="outlined">
          <InputLabel>
            {intl.formatMessage({ id: "specialization" })}
          </InputLabel>
          <Select
            id="specializations"
            name="specializations"
            disabled={!editMode}
            multiple
            label={intl.formatMessage({ id: "specialization" })}
            value={teacher?.specializations || []}
            onChange={handleInputChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.specializations &&
              Boolean(formik.errors.specializations)
            }
            renderValue={(selected) =>
              selected
                .map((specialization) =>
                  en === "en"
                    ? specialization.specializationEn
                    : specialization.specializationUa
                )
                .join(", ")
            }
          >
            {specializations &&
              specializations.map((specialization) => (
                <MenuItem key={specialization.id} value={specialization}>
                  {specialization.specializationUa}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          id="description"
          name="description"
          label={intl.formatMessage({ id: "description" })}
          variant="outlined"
          disabled={!editMode}
          multiline
          defaultValue={currentUser?.advert?.description}
          InputLabelProps={{ shrink: true }}
          InputProps={{ placeholder: "" }}
          onChange={handleInputChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />
        <TextField
          label={intl.formatMessage({ id: "registrationDate" })}
          variant="outlined"
          name="registeredAt"
          style={{
            width: "100%",
          }}
          disabled={true}
          defaultValue={
            currentUser.registeredAt
              ? format(new Date(currentUser.registeredAt), "dd.MM.yyyy")
              : ""
          }
        />
        {editMode ? (
          <Button
            type="button"
            variant="contained"
            onClick={handleSaveButtonClick}
            sx={{
              display: "flex",
              justifyItems: "end",
              alignSelf: "end",
              width: { xs: "100%", md: "220px" },
              borderRadius: "6px",
              transition: "background-color 0.3s",
              backgroundColor: (theme) => theme.palette.buttonColor.greenYellow,
              "&:hover": {
                backgroundColor: (theme) =>
                  theme.palette.buttonColor.greenYellowHover,
              },
            }}
          >
            <Typography
              variant="posterButton"
              sx={{ color: (theme) => theme.palette.buttonColor.fontColor }}
            >
              {intl.formatMessage({ id: "saveBtn" })}
            </Typography>
          </Button>
        ) : (
          <Button
            type="button"
            variant="contained"
            onClick={() => setEditMode(!editMode)}
            sx={{
              display: "flex",
              justifyItems: "end",
              alignSelf: "end",
              width: { xs: "100%", md: "220px" },
              borderRadius: "6px",
              transition: "background-color 0.3s",
              backgroundColor: (theme) => theme.palette.buttonColor.greenYellow,
              "&:hover": {
                backgroundColor: (theme) =>
                  theme.palette.buttonColor.greenYellowHover,
              },
            }}
          >
            <Typography
              variant="posterButton"
              sx={{ color: (theme) => theme.palette.buttonColor.fontColor }}
            >
              {intl.formatMessage({ id: "editBtn" })}
            </Typography>
          </Button>
        )}
      </Box>
    </form>
  );
};
