import * as yup from "yup";
//Sign Up form validation schema
export const signUpSchema = yup.object().shape({
  displayname: yup.string().required("Enter display name"),
  email: yup.string().required("Enter email").email("Invalid email format"),
  phone: yup.string().required("Phone number is required"),
  renNumber: yup.string(),
  password: yup
    .string()
    .required("Enter password")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .required("Please same password again")
    .oneOf([yup.ref("password")], "Passwords do not match"),
  remember: yup.boolean(),
});
//Sign in form validation schema
export const signInSchema = yup.object().shape({
  email: yup.string().required("Enter email"),
  password: yup
    .string()
    .required("Enter password")
    .min(6, "Password must be at least 6 characters"),
});

//Forgot form validation schema
export const forgotSchema = yup.object().shape({
  email: yup.string().required("Enter email"),
});

//Verify form validation schema
export const verifySchema = yup.object().shape({
  emailOtp: yup.string().required("Enter email OTP"),
});

//Add listing basic form validation schema
export const basicSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  price: yup
    .string()
    .required("Price is required")
    .matches(/^[0-9]+$/, "Only numbers are allowed")
    .test(
      "not-zero",
      "Price must be greater than 0",
      (value) => Number(value) > 0,
    ),
});

export const propertySchema = yup.object({
  listingType: yup.string().required("Listing type is required"),
  propertyName: yup.string().required("Property name is required"),
  propertyType: yup.string().required("Property type is required"),
  tenure: yup.string().required("Tenureis required"),
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  location: yup.string().required("Property location is required"),
  latitude: yup.number().optional(),
  longitude: yup.number().optional(),
  streetName: yup.string().required("Street name is required"),
  cityName: yup.string().required("City name is required"),
  stateName: yup.string().required("State is required"),
  countryName: yup.string().required("Country is required"),
  pinCode: yup
    .string()
    .required("Pin Code is required")
    .matches(/^[0-9]+$/, "Only numbers are allowed")
    .test(
      "not-zero",
      "Pin Code must be greater than 4 digits",
      (value) => Number(value) > 4,
    ),
  landmark: yup.string().required("Land mark is required"),
  price: yup
    .string()
    .required("Price is required")
    .matches(/^[0-9]+$/, "Only numbers are allowed")
    .test(
      "not-zero",
      "Price must be greater than 0",
      (value) => Number(value) > 0,
    ),
  builtUpArea: yup
    .string()
    .required("Built Up Area is required")
    .matches(/^[0-9]+$/, "Only numbers are allowed")
    .test(
      "not-zero",
      "Built Up Area must be greater than 0",
      (value) => Number(value) > 0,
    ),
  furnishing: yup.string().required("Furnishing type is required"),
  bedRooms: yup.string().required("Bed rooms are required"),
  bathRooms: yup.string().required("Bath rooms are required"),
  availability: yup.string().required("Availability is required"),
  negotiable: yup.string().required("Negotiable is required"),
  floorLevel: yup.string().required("Floor Number is required"),
  propertyAge: yup
    .number()
    .typeError("Year of build must be a number")
    .positive("Year of build must be greater than zero")
    .required("Year of build is required"),
  amenities: yup
    .array()
    .of(yup.string())
    .min(1, "Please select at least one amenity.")
    .required("Please select at least one amenity."),
});

export type PropertyFormData = yup.InferType<typeof propertySchema>;

//Blog comment form validation schema
export const blogCommentSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  number: yup
    .string()
    .required("Phone number is required")
    .matches(/^\d+$/, "Phone number must be numeric"),
  message: yup.string().required("Message is required"),
});

//Contact form validation schema
export const contactSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  number: yup.string().required("Phone number is required"),
  subject: yup.string().required("Subject is required"),
  message: yup.string().required("Message is required"),
});

//Contact form validation schema
export const contactTwoSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  phone: yup.string().required("Phone number is required"),
  caseDetails: yup.string().required("Message is required"),
});

//Property Review validation schema
export const propertyReviewSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  number: yup
    .string()
    .required("Phone number is required")
    .matches(/^\d+$/, "Phone number must be numeric"),
  message: yup.string().required("Message is required"),
});

//Profile information validation schema
export const profileSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  aboutYou: yup.string(),
  companyName: yup.string(),
  icPassport: yup.string(),
  designation: yup.string(),
  experience: yup
    .number()
    .typeError("Must be a number")
    .min(0, "Must be 0 or more"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]{10,12}$/, "Phone number must be between 10 and 12 digits"),
  email: yup.string().email("Invalid email format"),
});

//Change password validation schema
export const changePasswordSchema = yup.object().shape({
  oldPassword: yup.string().required("Old password is required"),
  newPassword: yup
    .string()
    .required("New password is required")
    .min(6, "At least 6 characters"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("newPassword")], "Passwords do not match"),
});

//leave message validation schema
export const leaveMessageSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  phone: yup.string().required("Phone number is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  message: yup.string().required("Message is required"),
});
