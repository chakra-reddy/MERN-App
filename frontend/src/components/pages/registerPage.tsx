import { useState } from "react";
import { FormValues, validationSchema } from "./loginPage";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import {
  Button,
  Grid2,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import registerUser from "../../services/registerUser";

const RegisterPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const initialValues: FormValues = { email: "", password: "" };
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (response) => {
      if (response.data) {
        navigate("/login");
      }
    },
    onError: (error: any) => {
      alert(
        "Registration failed: " +
          (error.response?.data?.message || error.message)
      );
    },
  });

  const handleSubmit = (values: FormValues) => {
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
              Register
            </Typography>

            <Formik<FormValues>
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
                      Register
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
export default RegisterPage;
