import { useState } from "react";
import { Button, Container, TextField, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { register } from "../axios";
import { Toast } from "../components/Toast";

interface ToastData {
  severity: "success" | "info" | "warning" | "error" | undefined;
  message: string | null;
}

export const Register = () => {
  const [form, setForm] = useState({ name: "", username: "", password: "" });
  const [open, setOpen] = useState<boolean>(false);
  const [toastData, setToastData] = useState<ToastData>({
    severity: undefined,
    message: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resp = await register(form);
    if (!resp.data) {
      setOpen(true);
      setToastData({
        severity: "error",
        message: resp.message,
      });
    } else {
      setOpen(true);
      setToastData({
        severity: "success",
        message: `${resp.data?.user?.name}, your registration successful, kindly proceed for the Login`,
      });
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 5 }}>
        <Typography variant="h6">Register</Typography>
        <TextField
          label="Name"
          name="name"
          type="text"
          required
          value={form.name}
          onChange={handleChange}
          fullWidth
        />
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
          Register
        </Button>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
        <Toast
          message={toastData.message}
          severity={toastData.severity}
          open={open}
          onClose={() => setOpen(false)}
        />
      </Box>
    </Container>
  );
};
