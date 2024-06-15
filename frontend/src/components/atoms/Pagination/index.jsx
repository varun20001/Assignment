import { useState } from "react";
import { ReactComponent as ArrowDown } from "../../icons/ArrowDown.svg";
import { ReactComponent as ArrowLeft } from "../../icons/ArrowLeft.svg";
import { ReactComponent as ArrowRigth } from "../../icons/ArrowRigth.svg";
import "./pagination.scss";

const Pagination = ({
  totalItems,
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  isShowResult = true,
  totalCountData,
}) => {
  const pageNumbers = [];
  const itemsPerPageOptions = [5, 10, 50, 100, 200];
  const maxPageDisplay = 5; // Adjust this value based on your preference

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const getDisplayedPageNumbers = () => {
    const start = Math.max(1, currentPage - Math.floor(maxPageDisplay / 2));
    const end = Math.min(totalPages, start + maxPageDisplay - 1);

    return pageNumbers?.slice(start - 1, end);
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem =
    currentPage === totalPages ? totalItems : currentPage * itemsPerPage;

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (option) => {
    onItemsPerPageChange(option);
    setIsOpen(false); // Close the dropdown after selecting an option
  };

  return (
    <div
      className={
        isShowResult ? "pagination-component" : "pagination-component-not"
      }
    >
      {isShowResult && (
        <div className="show-results">
          <span className="result">Show Result</span>

          <div className="dropdown">
            <div
              className="dropdown-box"
              type="button"
              onClick={toggleDropdown}
              aria-expanded={isOpen ? "true" : "false"}
            >
              {itemsPerPage}
              <i className="ms-1 d-flex">
                <ArrowDown />
              </i>
            </div>
            {isOpen && (
              <ul className="dropdown-menu">
                {itemsPerPageOptions?.map((option) => (
                  <li key={option}>
                    <button
                      className="dropdown-item"
                      onClick={() => handleItemClick(option)}
                    >
                      <span>{option}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      <div className="items-showing">
        <span className="result">
          Showing <span className="text-bold-dark">{startItem}</span> to{" "}
          <span className="text-bold-dark">{endItem}</span> of{" "}
          <span className="text-bold-dark">{totalItems}</span> entries
        </span>
      </div>

      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link circular-button side"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <i className="d-flex mt-0">
              <ArrowLeft />
            </i>
          </button>
        </li>

        {isShowResult && (
          <>
            {getDisplayedPageNumbers()?.map((number) => (
              <li
                key={number}
                className={`page-item ${
                  number === currentPage ? "active" : ""
                }`}
              >
                <button
                  onClick={() => onPageChange(number)}
                  className="page-link circular-button"
                >
                  {number}
                </button>
              </li>
            ))}
          </>
        )}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            className="page-link circular-button side"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <i className="d-flex mt-0">
              <ArrowRigth />
            </i>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
