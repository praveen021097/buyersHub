import React from 'react'
import "./pagination.css"
import Pagination from "react-js-pagination";
const PaginationProducts = ({ currentPage, resultPerPage, productsCount, setCurrentPage }) => {
  
  const setCurrentPageNo = (e) => {
    setCurrentPage(e)
  }
  return (
    <div className={"paginationBox"}>
      <Pagination
        activePage={currentPage}
        itemsCountPerPage={resultPerPage}
        totalItemsCount={productsCount}
        onChange={setCurrentPageNo}
        nextPageText={"Next"}
        prevPageText={"Prev"}
        firstPageText={"1st"}
        lastPageText={"Last"}
        itemClass='page-item'
        linkClass='page-link'
        activeClass='pageItemActive'
        activeLinkClass='pageLinkActive'
      />
    </div>
  )
}

export default PaginationProducts
