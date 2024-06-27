import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const getPaginationItems = (totalPages, currentPage, handlePageChange) => {
  const items = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            className={`cursor-pointer ${currentPage === i ? "is-active" : ""}`}
            onClick={() => handlePageChange(i)}
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
  } else {
    if (currentPage <= 4) {
      for (let i = 1; i <= 5; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              className={`cursor-pointer ${
                currentPage === i ? "is-active" : ""
              }`}
              onClick={() => handlePageChange(i)}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
      items.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>,
        <PaginationItem key={totalPages}>
          <PaginationLink
            className="cursor-pointer"
            onClick={() => handlePageChange(totalPages)}
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    } else if (currentPage > totalPages - 4) {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            className="cursor-pointer"
            onClick={() => handlePageChange(1)}
            isActive={currentPage === 1}
          >
            1
          </PaginationLink>
        </PaginationItem>,
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis />
        </PaginationItem>
      );
      for (let i = totalPages - 4; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              className={`cursor-pointer ${
                currentPage === i ? "is-active" : ""
              }`}
              onClick={() => handlePageChange(i)}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            className="cursor-pointer"
            onClick={() => handlePageChange(1)}
            isActive={currentPage === 1}
          >
            1
          </PaginationLink>
        </PaginationItem>,
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis />
        </PaginationItem>
      );
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              className={`cursor-pointer ${
                currentPage === i ? "is-active" : ""
              }`}
              onClick={() => handlePageChange(i)}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
      items.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>,
        <PaginationItem key={totalPages}>
          <PaginationLink
            className="cursor-pointer"
            onClick={() => handlePageChange(totalPages)}
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
  }
  return items;
};

const PaginationComponent = ({ handlePageChange, currentPage, totalPages }) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={`cursor-pointer ${
              currentPage === 1 ? "cursor-not-allowed" : ""
            }`}
            onClick={
              currentPage !== 1 ? () => handlePageChange(currentPage - 1) : null
            }
          />
        </PaginationItem>
        {getPaginationItems(totalPages, currentPage, handlePageChange)}
        <PaginationItem>
          <PaginationNext
            className={`cursor-pointer ${
              currentPage === totalPages ? "cursor-not-allowed" : ""
            }`}
            onClick={
              currentPage !== totalPages
                ? () => handlePageChange(currentPage + 1)
                : null
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
