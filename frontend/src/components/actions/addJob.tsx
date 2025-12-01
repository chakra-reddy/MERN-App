import React, { useState } from "react";
import { Button, Drawer, TextField } from "@mui/material";

interface AddJobProps {
  setLocalData: React.Dispatch<React.SetStateAction<any[]>>;
}

const AddJob: React.FC<AddJobProps> = ({ setLocalData }) => {
  const [state, setState] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    requestedBy: "",
    positions: "",
    status: "",
  });
  const toggleDrawer = (open: boolean) => {
    setState(open);
  };

  const handleSubmit = () => {
    if (
      formData.title &&
      formData.requestedBy &&
      formData.positions &&
      formData.status
    ) {
      setLocalData((prevData) => [
        ...prevData,
        {
          id: Date.now().toString(),
          title: formData.title,
          requestedBy: formData.requestedBy,
          positions: formData.positions,
          status: formData.status,
        },
      ]);
      setFormData({
        id: "",
        title: "",
        requestedBy: "",
        positions: "",
        status: "",
      });
      setState(false);
    } else {
      alert("All fields are required!");
    }
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
