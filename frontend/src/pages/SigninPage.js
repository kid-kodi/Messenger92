import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { login } from "../core/api/auth-api";
import Container from "react-bootstrap/esm/Container";
import InputField from "../components/InputField";
import { Link } from "react-router-dom";

const SigninSchema = Yup.object().shape({
  password: Yup.string()
    .min(4, "Le nom doit être superieur ou egale 4 caractères")
    .required("Le mot de passe ne doit pas être vide."),
  email: Yup.string()
    .email("L'adresse email est invalide")
    .required("L'adresse email ne doit pas être vide."),
});

export default function SigninPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SigninSchema,
    onSubmit: (values) => {
      login(values).then((response) => {
        if (!response.error) {
          localStorage.setItem("user", JSON.stringify(response));
          navigate("/");
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
          <h1>Login</h1>
          <div>{error}</div>
          <Form onSubmit={formik.handleSubmit}>
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
              Connexion
            </Button>
          </Form>
          <hr />
          <p>
            Pas de compte ? <Link to="/register">Enregistrez-vous</Link>!
          </p>
          <p>
            vous avez oublié votre mot de passe ?
            <Link to="/reset-request"> réinitialiser le</Link>.
          </p>
        </Col>
      </Row>
    </Container>
  );
}
