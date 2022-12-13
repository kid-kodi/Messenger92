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

export default function ChangePasswordPage() {
  let { profile } = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: SigninSchema,
    onSubmit: (values) => {
      let userData = new FormData();
      values.password && userData.append("password", values.password);
      update(profile._id, userData).then((response) => {
        if (!response.error) {
          alert("Votre mot de passe á été modifié");
          navigate(`/user/${profile._id}`);
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
          <h1>Changer votre mot de passe</h1>
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
