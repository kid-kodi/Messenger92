import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import Container from "react-bootstrap/esm/Container";
import InputField from "../components/InputField";
import { update } from "../core/api/user.api";
import { API_URL } from "../core/api/auth-api";
import Image from "react-bootstrap/esm/Image";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Le nom doit être superieur ou egal 2 caractères")
    .required("Le nom ne doit pas être vide."),
  lastName: Yup.string()
    .min(2, "Le nom doit être superieur ou egal 2 caractères")
    .required("Le prénom ne doit pas être vide."),
  email: Yup.string()
    .email("L'adresse email est invalide")
    .required("L'adresse email ne doit pas être vide."),
});

export default function UserEditPage() {
  let { profile, token } = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      profilePicture: null,
      firstName: profile.firstName || "",
      lastName: profile.lastName || "",
      email: profile.email || "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      let userData = new FormData();
      values.profilePicture &&
        userData.append("profilePicture", values.profilePicture);

      values.firstName && userData.append("firstName", values.firstName);
      values.lastName && userData.append("lastName", values.lastName);
      values.email && userData.append("email", values.email);
      update(profile._id, userData).then((response) => {
        if (!response.error) {
          localStorage.setItem(
            "user",
            JSON.stringify({ profile: response, token })
          );
          alert("Profile mise à jour");
          navigate("/user/" + profile._id);
        } else {
          setError(`${response.error.message}`);
        }
      });
    },
  });
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={{ span: 4 }}>
          <h1>Modifier mon profile</h1>
          <div>{error}</div>
          <Form onSubmit={formik.handleSubmit}>
            <label htmlFor="profilePicture">
              {profile && !formik.values.profilePicture ? (
                <Image
                  className="br-full"
                  crossOrigin="anonymous"
                  src={`${API_URL}/users/profile-picture/${profile?._id}`}
                  alt=""
                  width="70px"
                  roundedCircle
                />
              ) : (
                formik.values.profilePicture && (
                  <Image
                    crossOrigin="anonymous"
                    src={URL.createObjectURL(formik.values.profilePicture)}
                    alt=""
                    width="70px"
                    roundedCircle
                  />
                )
              )}
              <input
                style={{ display: "none" }}
                id="profilePicture"
                name="profilePicture"
                type="file"
                onChange={(event) => {
                  formik.setFieldValue(
                    "profilePicture",
                    event.currentTarget.files[0]
                  );
                }}
              />
            </label>
            <InputField
              name="firstName"
              label="Nom"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.firstName}
              error={formik.errors.firstName}
            />
            <InputField
              name="lastName"
              label="Prénoms"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.lastName}
              error={formik.errors.lastName}
            />
            <InputField
              name="email"
              label="Adresse email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              error={formik.errors.email}
            />
            <Button variant="primary" type="submit">
              Enregistrer
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
