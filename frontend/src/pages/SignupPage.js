import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { register } from "../core/api/auth-api";
import Container from "react-bootstrap/esm/Container";
import InputField from "../components/InputField";
import { Link } from "react-router-dom";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Le nom doit être superieur ou egal 2 caractères")
    .required("Le nom ne doit pas être vide."),
  lastName: Yup.string()
    .min(2, "Le nom doit être superieur ou egal 2 caractères")
    .required("Le prénom ne doit pas être vide."),
  password: Yup.string()
    .min(4, "Le nom doit être superieur ou egale 4 caractères")
    .required("Le mot de passe ne doit pas être vide."),
  email: Yup.string()
    .email("L'adresse email est invalide")
    .required("L'adresse email ne doit pas être vide."),
});

export default function SignupPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      register(values).then((response) => {
        if (!response.error) {
          alert("New account created");
          navigate("/login");
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
          <h1>Register</h1>
          <div>{error}</div>
          <Form onSubmit={formik.handleSubmit}>
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
            <InputField
              name="password"
              label="Mot de passe"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              error={formik.errors.password}
            />
            <Button variant="primary" type="submit">
              Enregistrer
            </Button>
          </Form>
          <hr />
          <p>
            Déjà un compte ? <Link to="/login">Connectez-vous</Link>!
          </p>
        </Col>
      </Row>
    </Container>
  );
}
