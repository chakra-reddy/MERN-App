import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteJob } from "../../services/apiHelper";
import { useSnackbar } from "notistack";
interface DeleteJobProps {
  id: string;
}

const DeleteJob: React.FC<DeleteJobProps> = ({ id }) => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteJob,
    onSuccess: () => {
      enqueueSnackbar("Job deleted successfully", {
        variant: "success",
        autoHideDuration: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ["getJobs"] });
    },
    onError: (error: any) => {
      console.log(
        "Deletion failed: " + (error.response?.data?.message || error.message)
      );
      enqueueSnackbar(
        "Deletion failed: " + (error.response?.data?.message || error.message),
        {
          variant: "error",
          autoHideDuration: 3000,
        }
      );
    },
  });
  const handleClick = () => {
    mutation.mutate({ id });
  };
  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={{
          color: "#fccc55",
        }}
      >
        <DeleteIcon />
      </IconButton>
    </>
  );
};

export default DeleteJob;
