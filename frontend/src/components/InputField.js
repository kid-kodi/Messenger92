import Form from "react-bootstrap/Form";

export default function InputField({
  name,
  label,
  type,
  placeholder,
  error,
  value,
  onChange,
}) {
  return (
    <Form.Group controlId={name} className="InputField">
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        type={type || "text"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <Form.Text className="text-danger">{error}</Form.Text>
    </Form.Group>
  );
}
