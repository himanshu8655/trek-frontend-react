import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import TrekCard from '../../components/trek-card/TrekCard';
import './CustomPagination.css'; // Custom CSS for pagination styling

function Items({ currentItems, onEdit, onDelete }) {
  return (
    <div className="trek-items-container">
      {currentItems &&
        currentItems.map((item) => (
          <div key={item.id} className="trek-card-container">
            <TrekCard
              name={item.name}
              description={item.desc}
              image={item.download_url}
              id={item.id}
              onEdit={() => onEdit(item.id)}
              onDelete={() => onDelete(item.id)}
            />
          </div>
        ))}
    </div>
  );
}

export default function PaginatedItems({ items, onEdit, onDelete }) {
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  const handleFilterChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value, 10);
    setItemsPerPage(newItemsPerPage);
    setItemOffset(0); // Reset offset to 0 when items per page changes
  };

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    setItemOffset(0); // Reset item offset whenever items per page change
  }, [itemsPerPage]);

  return (
    <div className="pagination-container">
      <div className="filter-container">
        <label htmlFor="filter" className="filter-label">Items per Page:</label>
        <select id="filter" value={itemsPerPage} onChange={handleFilterChange} className="filter-select">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <Items currentItems={currentItems} onEdit={onEdit} onDelete={onDelete} />
      <div className="pagination-controls">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          activeClassName="active"
        />
      </div>
    </div>
  );
}
