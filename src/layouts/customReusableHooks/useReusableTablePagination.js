import { useState } from "react";

const useReusableTablePagination = (items, rowsPerPage = 5) => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const paginatedItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(items.length / rowsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return {
    currentPage,
    totalPages,
    paginatedItems,
    handlePageChange,
  };
};

export default useReusableTablePagination;
