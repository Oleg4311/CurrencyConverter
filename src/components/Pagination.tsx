import React from 'react';
import { StyledPagination } from '../assets/styles/PaginationStyled';

interface PaginationProps {
    pages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ pages, currentPage, onPageChange }) => {
    const handlePageChange = (page: number) => {
        if (page > 0 && page <= pages) {
            onPageChange(page);
        }
    };

    return (
        <StyledPagination>
            {[...Array(pages)].map((_, index) => (
                <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    style={{ fontWeight: currentPage === index + 1 ? 'bold' : 'normal' }}
                >
                    {index + 1}
                </button>
            ))}
        </StyledPagination>
    );
}

export default Pagination;