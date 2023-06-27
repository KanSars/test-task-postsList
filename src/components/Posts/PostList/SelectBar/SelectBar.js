import 'bootstrap/dist/css/bootstrap.min.css';
import './SelectBar.css'

const SelectBar = ({currentPage, totalPages, handlePrevPage, handleNextPage}) => {
    return (
        <div className="pagination-buttons">
            <button className="btn btn-primary" onClick={handlePrevPage} disabled={currentPage === 1} >
                Предыдущая страница
            </button>
            <span className="mx-2">
                Страница {currentPage} из {totalPages}
            </span>
            <button className="btn btn-primary" onClick={handleNextPage} disabled={currentPage === totalPages} >
                Следующая страница
            </button>
        </div>
    )
}

export default SelectBar;