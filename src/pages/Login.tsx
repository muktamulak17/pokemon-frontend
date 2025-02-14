import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Container, TextField, Typography, Box } from "@mui/material";
import { loginUser, AppDispatch, RootState, clearError } from "../store/store";
import { Toast } from "../components/Toast";

export const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { error, username } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

  const handleClose = () => {
    dispatch(clearError());
  };

  //Redirect to home page after successfull login
  useEffect(() => {
    if (username) navigate("/");
  }, [username, navigate]);

  return (
    <Container maxWidth="xs">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 5 }}>
        <Typography variant="h6">Login</Typography>
        <TextField
          label="Email"
          name="username"
          type="email"
          required
          value={form.username}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          required
          value={form.password}
          onChange={handleChange}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Login
        </Button>
        <Toast
          message={error}
          severity={"error"}
          open={!!error}
          onClose={handleClose}
        />
      </Box>
    </Container>
  );
};
