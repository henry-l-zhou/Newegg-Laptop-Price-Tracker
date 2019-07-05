import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

const propTypes = {
    items: PropTypes.array.isRequired,
    onChangePage: PropTypes.func.isRequired,
    initialPage: PropTypes.number,
    pageSize: PropTypes.number
}

const defaultProps = {
    initialPage: 1,
    pageSize: 24
}

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        //this.state = { pager: {} };
    }

    componentWillMount() {
        // set page if items array isn't empty
        if (this.props.items && this.props.items.length) {
            this.setPage(this.props.initialPage);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // reset page if items array has changed
        
        if (this.props.items !== prevProps.items) {
            this.setPage(this.props.initialPage);
        }
    }

    setPage(page) {
        
        
        var { items, pageSize } = this.props;
        //var pager = this.state.pager;
        var pager = this.props.pager
        
        if (page > pager.totalPages && pager.totalPages !== 0) {
            return;
        }
        if (pager.currentPage !== page){
            window.scrollTo(0, 0)
        }
        
        // get new pager object for specified page
        pager = this.getPager(items.length, page, pageSize);
        
        // get new page of items from items array
        var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
        
        // update state
        //this.setState({ pager: pager });
        this.props.updatePage(pager)
        // call change page function in parent component
        this.props.onChangePage(pageOfItems);
    }

    getPager(totalItems, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || 1;

        // default page size is 10
        pageSize = pageSize || 10;

        // calculate total pages
        var totalPages = Math.ceil(totalItems / pageSize);

        var startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    render() {
        var pager = this.props.pager;

        if (!pager.pages || pager.pages.length <= 1) {
            // don't display pager if there is only 1 page
            return null;
        }

        return (
            <div  className="d-flex justify-content-center">
                {/* <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                    <button type="button" className="btn btn-outline-dark" onClick={() => this.setPage(1)}>First</button>
                </li> */}
                <div className={pager.currentPage === 1 ? 'disabled' : ''}>
                    <button type="button" className="btn btn-outline-dark" onClick={() => this.setPage(pager.currentPage - 1)}>
                        <FontAwesomeIcon icon = {faAngleLeft}></FontAwesomeIcon>
                    </button>
                </div>
                {/* {pager.pages.map((page, index) =>
                    <li key={index} className={pager.currentPage === page ? 'active' : ''}>
                        <button type="button" className="btn btn-outline-dark" onClick={() => this.setPage(page)}>{page}</button>
                    </li>
                )} */}
                <div className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                    <button type="button" className="btn btn-outline-dark" onClick={() => this.setPage(pager.currentPage + 1)}>
                        <FontAwesomeIcon icon = {faAngleRight}></FontAwesomeIcon>
                    </button>
                </div>
                {/* <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                    <button type="button" className="btn btn-outline-dark" onClick={() => this.setPage(pager.totalPages)}>Last</button>
                </li> */}
            </div>
        );
    }
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;
export default Pagination;