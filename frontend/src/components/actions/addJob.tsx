import React, { useState } from "react";
import { Button, Drawer, TextField } from "@mui/material";
import { formData } from "../pages/homePage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createJob } from "../../services/apiHelper";
import { useSnackbar } from "notistack";

const AddJob: React.FC = () => {
  const [state, setState] = useState(false);
  const [formData, setFormData] = useState<formData>({
    title: "",
    requestedBy: "",
    positions: "",
    status: "",
  });
  const toggleDrawer = (open: boolean) => {
    setState(open);
  };

  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createJob,
    onSuccess: () => {
      enqueueSnackbar("Job created successfully", {
        variant: "success",
        autoHideDuration: 3000,
      });
      toggleDrawer(false);
      queryClient.invalidateQueries({ queryKey: ["getJobs"] });
    },
    onError: (error: any) => {
      console.log(
        "Creation failed: " + (error.response?.data?.message || error.message)
      );
      enqueueSnackbar(
        "Creation failed: " + (error.response?.data?.message || error.message),
        {
          variant: "error",
          autoHideDuration: 3000,
        }
      );
    },
  });
  const handleSubmit = async () => {
    if (formData) mutation.mutate({ formData });
  };
  const list = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
      }}
    >
      <TextField
        placeholder="Title"
        name="title"
        value={formData.title}
        required
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        sx={{ m: 2, width: "350px" }}
      ></TextField>
      <TextField
        placeholder="Requested By"
        name="displayName"
        required
        value={formData.requestedBy}
        onChange={(e) =>
          setFormData({ ...formData, requestedBy: e.target.value })
        }
        sx={{ m: 2, width: "350px" }}
      ></TextField>
      <TextField
        placeholder="Positions"
        name="numberOfPositions"
        required
        value={formData.positions}
        onChange={(e) =>
          setFormData({ ...formData, positions: e.target.value })
        }
        sx={{ m: 2, width: "350px" }}
      ></TextField>
      <TextField
        placeholder="Status"
        name="status"
        required
        value={formData.status}
        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        sx={{ m: 2, width: "350px" }}
      ></TextField>
      <Button
        variant="contained"
        sx={{
          m: 2,
          width: "350px",
          backgroundColor: "#fccc55",
        }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  );
  return (
    <div>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#fccc55",
          margin: "1rem",
        }}
        onClick={() => toggleDrawer(true)}
      >
        +Add Job
      </Button>
      <Drawer anchor="right" open={state} onClose={() => toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
};

export default AddJob;
