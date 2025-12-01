import { useState } from "react";
import {
  TextField,
  Paper,
  Button,
  Grid2,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import postLogin from "../../services/authService";
import { setAuthSession } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Invalid Password")
    .required("Password is required"),
});
interface FormValues {
  email: string;
  password: string;
}

const LoginComponent: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const initialValues: FormValues = { email: "", password: "" };
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: postLogin,
    onSuccess: (response) => {
      if (response.data.token) {
        setAuthSession(response.data.token);
        navigate("/home");
        console.log("Login successful:", response.data);
      }
    },
    onError: (error: any) => {
      alert(
        "Login failed: " + (error.response?.data?.message || error.message)
      );
    },
  });

  const handleSubmit = (values: FormValues) => {
    console.log(values);
    mutation.mutate(values);
  };

  return (
    <>
      <Grid2
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid2 size={{ xs: 10, sm: 8, md: 6, lg: 4 }}>
          <Paper elevation={3} style={{ padding: 24 }}>
            <Typography
              variant="h5"
              align="center"
              style={{ marginBottom: "1.5rem" }}
            >
              Login to CalsoftOne
            </Typography>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ touched, errors, values }) => (
                <Form>
                  <div>
                    <Field
                      as={TextField}
                      label="Email"
                      name="email"
                      variant="outlined"
                      size="small"
                      fullWidth
                      margin="normal"
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    ></Field>
                  </div>
                  <div>
                    <Field
                      as={TextField}
                      label="Password"
                      name="password"
                      variant="outlined"
                      size="small"
                      fullWidth
                      margin="normal"
                      type={showPassword ? "text" : "password"}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword((prev) => !prev)}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                  <div>
                    <Button
                      variant="contained"
                      fullWidth
                      type="submit"
                      style={{
                        backgroundColor: "#fccc55",
                        marginTop: "1.5rem",
                      }}
                    >
                      Log In
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Paper>
        </Grid2>
      </Grid2>
    </>
  );
};

export default LoginComponent;
