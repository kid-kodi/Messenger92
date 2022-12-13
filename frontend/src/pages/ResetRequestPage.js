import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { requestResetPassword } from "../core/api/auth-api";
import Container from "react-bootstrap/esm/Container";
import InputField from "../components/InputField";
import { Link } from "react-router-dom";

const ResetRequestSchema = Yup.object().shape({
  email: Yup.string()
    .email("L'adresse email est invalide")
    .required("L'adresse email ne doit pas être vide."),
});

export default function ResetRequestPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
    },
    validationSchema: ResetRequestSchema,
    onSubmit: (values) => {
      requestResetPassword(values).then((response) => {
        if (!response.error) {
          alert(
            "Vous recevrez un e-mail avec des instructions" +
              "pour réinitialiser votre mot de passe."
          );
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
          <h1>Réinitialiser votre mot de passe</h1>
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
            <Button variant="primary" type="submit">
              Connexion
            </Button>
          </Form>
          <hr />
          <p>
            Pas de compte ? <Link to="/register">Enregistrez-vous</Link>!
          </p>
        </Col>
      </Row>
    </Container>
  );
}
