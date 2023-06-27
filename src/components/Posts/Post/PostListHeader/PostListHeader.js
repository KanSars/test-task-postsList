import SelectBar from "../../PostList/SelectBar/SelectBar";

import 'bootstrap/dist/css/bootstrap.min.css';
import './PostListHeader.css'

const PostListHeader = ({ loading, posts, totalPages, setCurrentPage, currentPage, handlePerPageChange, perPage }) => {

    const selectBar = loading ? null : <SelectBar currentPage={currentPage} totalPages={totalPages} handlePrevPage={handlePrevPage} handleNextPage={handleNextPage} />

    function handlePrevPage() {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    function handleNextPage() {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    return (
        <div className="post-list-header mb-3">
            <div className='page-selection'>
                <label htmlFor="perPageSelect" className="form-label">
                    Количество постов на странице:
                </label>
                <select id="perPageSelect" className="form-select" value={perPage} onChange={handlePerPageChange} >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                    <option value={posts.length}>Все</option>
                </select>
            </div>
            {selectBar}
        </div>
    )
}

export default PostListHeader;