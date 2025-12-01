import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
interface DeleteJobProps {
  id: string;
  setLocalData: React.Dispatch<React.SetStateAction<any[]>>;
}

const DeleteJob: React.FC<DeleteJobProps> = ({ id, setLocalData }) => {
  const handleClick = () => {
    setLocalData((prevData) => prevData.filter((item) => item.id !== id));
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
