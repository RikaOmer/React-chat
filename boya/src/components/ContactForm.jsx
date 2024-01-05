import { Form, Button, Col, Row } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import avatar from "../images/avatars/male_avatar.png";
import { useNavigate } from "react-router-dom";
import addUser from "../App";
import { Link } from "react-router-dom";

const schema = Yup.object().shape({
  name: Yup.string().required("Please enter your name"),

  username: Yup.string().required("Please enter your username"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Please enter a password"),

  password2: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

const ContactForm = ({ addUser }) => {
  const navigate = useNavigate();

  var name, username, password, password2, pic;
  function checkPassword(password0) {
    var regularExpression =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!regularExpression.test(password0)) {
      alert(
        "password should contain atleast one number, one special character, capital letter, small letter and 8 characters"
      );
      return false;
    }
    return true;
  }

  async function add(e) {
    e.preventDefault();
    name = e.target.name.value;
    username = e.target.username.value;
    password = e.target.password.value;
    password2 = e.target.password2.value;
    pic = defPic;
    if (password === password2) {
      if (checkPassword(password)) {
        if ((await addUser(username, password, name, pic)) === 1) {
          navigate("/");
        }
      }
    } else {
      alert("password does not match the confirm password");
    }
  }

  const [defPic, setDefPic] = useState(avatar);
  function addPhoto(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function () {
      setDefPic(reader.result);
    };
    reader.readAsDataURL(file);
  }
  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values) => {
        console.log(values);
      }}
      initialValues={{
        name: "",
        username: "",
        password: "",
        password2: "",
      }}
    >
      {({ handleChange, handleBlur, values, touched, isValid, errors }) => (
        <Form noValidate onSubmit={add}>
          <div className="row mb-2">
            <Form.Group as={Col} me="2" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                className="form-control col me-2"
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleBlur}
                isInvalid={touched.name && !!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} me="2" controlId="username">
              <Form.Label>username</Form.Label>
              <Form.Control
                className="form-control col me-2"
                type="username"
                name="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleBlur}
                isInvalid={touched.username && !!errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="row mb-2">
            <Form.Group as={Col} me="2" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                className="form-control col me-2"
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleBlur}
                isInvalid={touched.password && !!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} me="2" controlId="password2">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                className="form-control col me-2"
                type="password"
                name="password2"
                value={values.password2}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleBlur}
                isInvalid={touched.password2 && !!errors.password2}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password2}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="row mb-2">
            <label
              className="form-label text-white m-1 bg-primary rounded-pill text-center pt-2 pb-2"
              htmlFor="files"
            >
              Upload Profile Picture
            </label>
            <input
              name="pic"
              type="file"
              className="form-control d-none"
              id="files"
              onChange={addPhoto}
              required
            />
          </div>

          <div className="row mb-2">
            <div className="col"></div>
            <img
              id="defaultImg"
              className="img col-sm-6 col-md-3 col-xl-3 col-xxl-2 rounded-circle mb-2"
              src={defPic}
              alt="userImg"
            />
            <div className="col"></div>
          </div>
          <div className="row">
            <label className="form-label col text-center">
              Already registered? <Link to="/"> Click Here </Link> to login
            </label>
          </div>
          <div className="row mb-4 pb-2">
            <button className="btn bg-success rounded-2" type="submit">
              Sign Up
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
