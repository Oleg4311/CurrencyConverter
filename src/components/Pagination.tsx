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

    const goBack = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const goForward = () => {
        if (currentPage < pages) {
            onPageChange(currentPage + 1);
        }
    };

    const goToFirstPage = () => {
        onPageChange(1);
    };

    const goToLastPage = () => {
        onPageChange(pages);
    };

    return (
        <StyledPagination>
            <button onClick={goToFirstPage} disabled={currentPage === 1}>
                &lt;&lt;
            </button>
            <button onClick={goBack} disabled={currentPage === 1}>
                &lt;
            </button>
            {[...Array(pages)].map((_, index) => (
                <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    style={{ fontWeight: currentPage === index + 1 ? 'bold' : 'normal' }}
                >
                    {index + 1}
                </button>
            ))}
            <button onClick={goForward} disabled={currentPage === pages}>
                &gt;
            </button>
            <button onClick={goToLastPage} disabled={currentPage === pages}>
                &gt;&gt;
            </button>
        </StyledPagination>
    );
}

export default Pagination;
