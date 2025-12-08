import React, { useState } from "react";
import { Button, Drawer, TextField, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateJob } from "../../services/apiHelper";
import { useSnackbar } from "notistack";

interface EditJobProps {
  job: {
    id: string;
    title: string;
    requestedBy: string;
    positions: string;
    status: string;
  };
}
const EditJob: React.FC<EditJobProps> = ({ job }) => {
  const [state, setState] = useState(false);
  const [formData, setFormData] = useState({
    title: job.title,
    requestedBy: job.requestedBy,
    positions: job.positions,
    status: job.status,
  });
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateJob,
    onSuccess: () => {
      enqueueSnackbar("Job updated successfully", {
        variant: "success",
        autoHideDuration: 3000,
      });
      toggleDrawer(false);
      queryClient.invalidateQueries({ queryKey: ["getJobs"] });
    },
    onError: (error: any) => {
      console.log(
        "Update failed: " + (error.response?.data?.message || error.message)
      );
      enqueueSnackbar(
        "Update failed: " + (error.response?.data?.message || error.message),
        {
          variant: "error",
          autoHideDuration: 3000,
        }
      );
    },
  });

  const toggleDrawer = (open: boolean) => {
    setState(open);
  };
  const handleSubmit = () => {
    const { title, requestedBy, positions, status } = formData;
    if (title && requestedBy && positions && status) {
      mutation.mutate({
        job: {
          _id: job.id,
          title: title,
          requestedBy: requestedBy,
          positions: positions,
          status: status,
        },
      });
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
        value={formData.requestedBy}
        onChange={(e) =>
          setFormData({
            ...formData,
            requestedBy: e.target.value,
          })
        }
        sx={{ m: 2, width: "350px" }}
      />
      <TextField
        placeholder="Positions"
        value={formData.positions}
        onChange={(e) =>
          setFormData({ ...formData, positions: e.target.value })
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
