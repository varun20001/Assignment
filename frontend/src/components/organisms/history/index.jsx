import React, { useState, useCallback } from "react";
import Pagination from "../../atoms/Pagination/index";
import CustomDatagrid from "../../atoms/CustomDatagrid/index";
import PageCard from "../../atoms/PageCard/index";
const InventoryTable = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const columns = [
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      sortable: true,
    },
    {
      field: "newInventory",
      headerName: "New Inventory",
      flex: 1,
      sortable: true,
    },
    {
      field: "newTotalMsrp",
      headerName: "New Total MSRP",
      flex: 1,
      sortable: true,
    },
    {
      field: "newAvgMsrp",
      headerName: "New Average MSRP",
      flex: 1,
      sortable: true,
    },
    {
      field: "usedInventory",
      headerName: "Used Inventory",
      flex: 1,
      sortable: true,
    },
    {
      field: "usedTotalMsrp",
      headerName: "Used Total MSRP",
      flex: 1,
      sortable: true,
    },
    {
      field: "usedAvgMsrp",
      headerName: "Used Average MSRP",
      flex: 1,
      sortable: true,
    },
  ];

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const handleItemsPerPageChange = useCallback((perPage) => {
    setCurrentPage(1);
    setItemsPerPage(perPage);
  }, []);

  // Transform data to match the columns
  const tableData = Object.keys(data).map((date) => ({
    id: date, // Assuming date is unique for row id
    date: new Date(date).toLocaleDateString(),
    newInventory: data[date].new.count,
    newTotalMsrp: data[date].new.totalMsrp.toFixed(2),
    newAvgMsrp: data[date].new.avgMsrp.toFixed(2),
    usedInventory: data[date].used.count,
    usedTotalMsrp: data[date].used.totalMsrp.toFixed(2),
    usedAvgMsrp: data[date].used.avgMsrp.toFixed(2),
  }));

  // Calculate paginated data
  const paginatedData = tableData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <PageCard>
        <CustomDatagrid
          getRowId={(row) => row.id}
          rows={paginatedData}
          columns={columns}
        />
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={tableData.length}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </PageCard>
    </>
  );
};

export default InventoryTable;
