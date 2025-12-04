import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { getAuthSession } from "../../utils/auth";
import { useQuery } from "@tanstack/react-query";
import { getJobs } from "../../services/apiHelper";
import { useEffect, useMemo, useState } from "react";
import AddJob from "../actions/addJob";
import EditJob from "../actions/editJob";
import DeleteJob from "../actions/deleteJob";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
import { useSnackbar } from "notistack";

export interface formData {
  _id?: string;
  title: string;
  requestedBy: string;
  positions: string;
  status: string;
}
const HomeComponent: React.FC = () => {
  const [localData, setLocalData] = useState<formData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const token = useMemo(() => getAuthSession(), []);
  const { enqueueSnackbar } = useSnackbar();
  const getJobsQuery = useQuery({
    queryKey: ["getJobs"],
    queryFn: () => getJobs(),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (getJobsQuery.isError) {
      enqueueSnackbar(
        "Error fetching jobs: " +
          (getJobsQuery.error as any).response?.data?.message ||
          (getJobsQuery.error as any).message,
        {
          variant: "error",
          autoHideDuration: 3000,
        }
      );
    }
    if (getJobsQuery.data?.data) {
      setLocalData(getJobsQuery.data.data.jobs);
    }
  }, [
    getJobsQuery.data,
    getJobsQuery.isError,
    getJobsQuery.error,
    enqueueSnackbar,
  ]);

  const handleSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const columns: GridColDef[] = useMemo(
    () => [
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
            <EditJob job={params.row} />
            <DeleteJob id={params.row.id} />
          </div>
        ),
      },
    ],
    []
  );

  const rows = useMemo(
    () =>
      localData.map((item) => ({
        id: item._id,
        title: item.title,
        requestedBy: item.requestedBy,
        positions: item.positions,
        status: item.status,
        _search: (
          item.title +
          " " +
          item.requestedBy +
          " " +
          item.status
        ).toLowerCase(),
      })),
    [localData]
  );
  console.log("rows: ", rows);
  const debouncedSearchQuery: string = useDebounce(searchQuery, 300);

  const filterRows = useMemo((): formData[] => {
    if (!debouncedSearchQuery) return rows;
    const query = debouncedSearchQuery.toLowerCase();
    return rows.filter((row) => row._search.includes(query));
  }, [debouncedSearchQuery, rows]);

  const paginationModel = { page: 0, pageSize: 25 };

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <>
      {token && (
        <Box sx={{ mt: 4 }}>
          <div style={{ textAlign: "right", marginRight: "1rem" }}>
            <Button variant="contained" color="error" onClick={handleLogout}>
              Logout
            </Button>
          </div>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              placeholder="Search..."
              size="small"
              sx={{ m: "1rem" }}
              value={searchQuery}
              onChange={handleSearchQuery}
            ></TextField>
            <AddJob />
          </Box>
          {getJobsQuery.isLoading ? (
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
                rows={searchQuery ? filterRows : rows}
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
