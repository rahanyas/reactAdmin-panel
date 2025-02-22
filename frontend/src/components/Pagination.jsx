/* eslint-disable react/prop-types */
import ReactPaginate from 'react-paginate';

function PaginatedItems ({pageCount, onPageChange}){
  return (
      <ReactPaginate 
      previousLabel={"< Previous"}
      nextLabel ={"Next >"}
      pageCount={pageCount}
      onPageChange={onPageChange}
      containerClassName={'pagination'}
      previousLinkClassName={'page-link'}
      nextLinkClassName={'page-link'}
      disabledClassName={'disabled'}
      activeClassName={'active'}
      pageRangeDisplayed={2}
      marginPagesDisplayed={1}
      />
  )
};


export default PaginatedItems