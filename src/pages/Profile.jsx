import  { useState, useEffect } from "react";
import { Container, Typography, TextField, Button, Alert } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile, fetchProfile } from "../redux/slices/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        password: "", // Don't display the password
      });
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      dispatch(fetchProfile());
    }
  }, [dispatch, user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formData))
      .unwrap()
      .then(() => {
        setSuccessMessage("Profile updated successfully!");
      })
      .catch((error) => {
        console.error("Failed to update profile: ", error);
      });
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
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
          value={formData.password}
          onChange={handleChange}
          margin="normal"
          helperText="Leave blank to keep your current password"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Update Profile
        </Button>
      </form>
    </Container>
  );
};

export default Profile;
