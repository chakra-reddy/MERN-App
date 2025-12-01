import React, { useState } from "react";
import { Button, Drawer, TextField, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

interface EditJobProps {
  job: any;
  setLocalData: React.Dispatch<React.SetStateAction<any[]>>;
}
const EditJob: React.FC<EditJobProps> = ({ job, setLocalData }) => {
  const [state, setState] = useState(false);
  const [formData, setFormData] = useState({
    title: job.title,
    createdBy: { displayName: job.requestedBy },
    numberOfPositions: job.positions,
    status: job.status,
  });

  const toggleDrawer = (open: boolean) => {
    setState(open);
  };

  const handleSubmit = () => {
    if (
      formData.title &&
      formData.createdBy.displayName &&
      formData.numberOfPositions &&
      formData.status
    ) {
      setLocalData((prevData) =>
        prevData.map((item) =>
          item.id === job.id ? { ...item, ...formData } : item
        )
      );
      setState(false);
    }
  };

  const list = () => (
    <div style={{ display: "flex", flexDirection: "column", padding: "1rem" }}>
      <TextField
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        sx={{ m: 2, width: "350px" }}
      />
      <TextField
        placeholder="Requested By"
        value={formData.createdBy.displayName}
        onChange={(e) =>
          setFormData({
            ...formData,
            createdBy: { ...formData.createdBy, displayName: e.target.value },
          })
        }
        sx={{ m: 2, width: "350px" }}
      />
      <TextField
        placeholder="Positions"
        value={formData.numberOfPositions}
        onChange={(e) =>
          setFormData({ ...formData, numberOfPositions: e.target.value })
        }
        sx={{ m: 2, width: "350px" }}
      />
      <TextField
        placeholder="Status"
        value={formData.status}
        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        sx={{ m: 2, width: "350px" }}
      />
      <Button
        variant="contained"
        sx={{ m: 2, width: "350px", backgroundColor: "#fccc55" }}
        onClick={handleSubmit}
      >
        Update
      </Button>
    </div>
  );

  return (
    <>
      <IconButton sx={{ color: "#fccc55" }} onClick={() => toggleDrawer(true)}>
        <EditIcon />
      </IconButton>
      <Drawer anchor="right" open={state} onClose={() => toggleDrawer(false)}>
        {list()}
      </Drawer>
    </>
  );
};

export default EditJob;
