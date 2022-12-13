import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate, useLocation } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import Container from "react-bootstrap/esm/Container";
import InputField from "../components/InputField";
import { resetPassword } from "../core/api/auth-api";

const SigninSchema = Yup.object().shape({
  password: Yup.string()
    .min(4, "Le mot de doit être superieur ou egale 4 caractères")
    .required("Le nouveau mot de passe ne doit pas être vide."),
  confirmPassword: Yup.string()
    .min(4, "Le mot de passe doit être superieur ou egale 4 caractères")
    .required("Le mot de passe de confirmation ne doit pas être vide.")
    .oneOf(
      [Yup.ref("password"), null],
      "Les mots de passe doivent correspondre"
    ),
});

export default function ResetPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { search } = useLocation();
  const token = new URLSearchParams(search).get("token");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: SigninSchema,
    onSubmit: (values) => {
      resetPassword(values, token).then((response) => {
        if (!response.error) {
          alert("Votre mot de passe á été modifié");
          navigate(`/login`);
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
          <h1>Réinitialisation de votre mot de passe</h1>
          <div>{error}</div>
          <Form onSubmit={formik.handleSubmit}>
            <InputField
              name="password"
              label="Nouveau Mot de passe"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              error={formik.errors.password}
            />
            <InputField
              name="confirmPassword"
              label="Confirmez votre Mot de passe"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              error={formik.errors.confirmPassword}
            />
            <Button variant="primary" type="submit">
              Changer
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
