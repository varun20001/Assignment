import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

const CustomDatagrid = ({
  rows,
  columns,
  CustomNoRowsOverlay,
  getRowId,
  height,
  tHeight = "31.25rem",
  checkRequired = false,
  onCellClick,
  hoverColor,
}) => {
  const [isRowsVisible, setIsRowsVisible] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    let timeoutId;

    if (rows && rows.length > 0) {
      setIsRowsVisible(true);
      setShowLoader(false);
    } else {
      timeoutId = setTimeout(() => {
        setIsRowsVisible(false);
        setShowLoader(false);
      }, 2000);
    }

    return () => clearTimeout(timeoutId);
  }, [rows]);

  useEffect(() => {
    setIsRowsVisible(rows && rows.length > 0);
  }, [rows]);

  const dynamicHeight = isRowsVisible ? "auto" : tHeight;

  const modifiedColumns = columns?.map((column) => ({
    ...column,
    sortable: column?.hasOwnProperty("sortable") ? column.sortable : false,
  }));

  return (
    <Box
      sx={{
        minHeight: tHeight,
        marginBottom: "1.5rem",
        transition: "height 0.3s ease-in-out", // Add smooth height transition
        height: dynamicHeight,
        fontFamily: "Inter",
      }}
    >
      <div
        className={`${isRowsVisible ? "" : "table-div"} h-100 mb-3`}
        style={{ height: isRowsVisible ? "100%" : "0" }}
      >
        <DataGrid
          rows={rows}
          columns={modifiedColumns}
          getRowId={getRowId}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 100,
              },
            },
          }}
          loading={showLoader}
          onCellClick={onCellClick}
          checkboxSelection={checkRequired}
          getRowHeight={height}
          disableRowSelectionOnClick
          hideFooterPagination={false}
          hideFooter
          disableColumnMenu
          className="custom-scrollbar"
          sx={{
            "&.MuiDataGrid-root": {
              border: "none",
              marginTop: "0 !important",
              fontFamily: "Inter",
            },
            "&.MuiDataGrid-cellContent": {
              fontFamily: "Inter !important",
              fontWeight: "500 !important",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "500 !important",
              color: "#6F767E !important",
              fontFamily: "Inter",
            },
            "& .MuiDataGrid-columnHeader:focus": {
              outline: "0",
            },
            "& .MuiDataGrid-columnHeader:focus-within" : {
              outline : '0'
            },
            "&. MuiCheckbox-root": {
              color: "#C0C4C9 !important",
            },
            "& .MuiDataGrid-row:hover": {
              background: hoverColor,
            },
            "&. MuiCheckbox-colorPrimary": {
              color: "#C0C4C9 !important",
            },
            "& .MuiDataGrid-virtualScroller::-webkit-scrollbar": {
              width: "0.4em !important",
              height: "0.4em !important",
            },
            "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-track": {
              background: "#f1f1f1 !important",
              height: "2px !important",
            },
            "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb": {
              backgroundColor: "eee!important",
              height: "2x !important",
            },
            "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb:hover": {
              background: "#555 !important",
              height: " 0.125rem !important",
            },
            "& .MuiDataGrid-cell:focus": {
              outline: "0px !important",
            },
            overflowX: "hidden",
          }}
          slots={{
            noRowsOverlay: CustomNoRowsOverlay,
          }}
          disableColumnFilter
        />
      </div>
    </Box>
  );
};

export default CustomDatagrid;
