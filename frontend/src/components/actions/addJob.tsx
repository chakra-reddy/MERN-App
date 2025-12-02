import React, { useState } from "react";
import { Button, Drawer, TextField } from "@mui/material";
import { formData } from "../pages/homePage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addJob } from "../../services/fetchData";

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

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addJob,
    onSuccess: (response) => {
      alert("Job added successfully");
      toggleDrawer(false);
      queryClient.invalidateQueries({ queryKey: ["getJobs"] });
    },
  });
  const handleSubmit = async () => {
    const token = localStorage.getItem("authToken") || "";
    if (formData) mutation.mutate({ token, formData });
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
