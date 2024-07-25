import  { useState } from "react";
import { TextField, Button, Container, Typography, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/slices/authSlice";
import { Navigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          fullWidth
          required
          value={formData.name}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          required
          value={formData.email}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          required
          value={formData.password}
          onChange={handleChange}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </form>
    </Container>
  );
};

export default Register;
