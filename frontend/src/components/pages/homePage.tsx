import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, CircularProgress, TextField } from "@mui/material";
import { getAuthSession } from "../../utils/auth";
import { useMutation } from "@tanstack/react-query";
import getInfo from "../../services/fetchData";
import { useEffect, useState } from "react";
import AddJob from "../actions/addJob";
import EditJob from "../actions/editJob";
import DeleteJob from "../actions/deleteJob";

const HomeComponent: React.FC = () => {
  const [localData, setLocalData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const token = getAuthSession();
  console.log("localData: ", localData);
  const mutation = useMutation({
    mutationFn: getInfo,
    onSuccess: (response) => {
      if (response.data) {
        setLocalData(response.data.jobs);
      }
    },
    onError: (error: any) => {
      alert(
        "Login failed: " + (error.response?.data?.message || error.message)
      );
    },
  });

  useEffect(() => {
    mutation.mutate(token);
  }, [token]);

  const handleSearchQuery = (event) => {
    setSearchQuery(event.target.value);
  };

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      width: 450,
    },
    {
      field: "requestedBy",
      headerName: "Requested By",
      width: 350,
    },
    {
      field: "positions",
      headerName: "Positions",
      width: 350,
    },
    {
      field: "status",
      headerName: "Status",
      width: 350,
    },
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => (
        <div>
          <EditJob job={params.row} setLocalData={setLocalData} />
          <DeleteJob setLocalData={setLocalData} id={params.row.id} />
        </div>
      ),
    },
  ];

  const rows = localData.map((item) => ({
    id: item._id || item.id,
    title: item.title,
    requestedBy: item.requestedBy,
    positions: item.positions,
    status: item.status,
  }));
  console.log("rows: ", rows);
  const filteredRows = localData
    .filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.requestedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.status.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .map((item) => ({
      id: item._id || item.id,
      title: item.title,
      requestedBy: item.requestedBy,
      positions: item.positions,
      status: item.status,
    }));

  const paginationModel = { page: 0, pageSize: 25 };

  return (
    <>
      {token && (
        <Box sx={{ mt: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              placeholder="Search..."
              size="small"
              sx={{ m: "1rem" }}
              value={searchQuery}
              onChange={handleSearchQuery}
            ></TextField>
            <AddJob setLocalData={setLocalData} />
          </Box>
          {mutation.isPending ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 300,
              }}
            >
              <CircularProgress sx={{ color: "#fccc55" }} />
            </Box>
          ) : (
            <Box>
              <DataGrid
                rows={searchQuery ? filteredRows : rows}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[25]}
                checkboxSelection={false}
                sx={{
                  height: "80vh",
                  px: "1rem",
                  "& .MuiDataGrid-columnHeaders": {
                    fontSize: 20,
                    fontWeight: "bold",
                    pb: "0.3rem",
                  },
                }}
              />
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default HomeComponent;
