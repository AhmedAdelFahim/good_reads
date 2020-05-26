import React, {useState ,useEffect} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import '../../home/Home.css';
import Header from '../../Header';
import Pagination from '../../home/Pagination';

export default (props) => {
    const [books,setBooks]=useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(8);

    useEffect( () => {
        
        axios.get(`http://localhost:5000/categories/${props.computedMatch.params.id}`, {withCredentials: true}).then(response => {
            setBooks(response.data);
          }).catch(error => {
            console.log(error);
          });
    }, []);

    const indexOfLastPost = currentPage * booksPerPage;
    const indexOfFirstPost = indexOfLastPost - booksPerPage;
    const currentBooks = books.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
        <>
            <Header />     
            <div className="right-div category-books">
                {
                    currentBooks.map(book => {
                        return ( 
                            <div className="card CardDiv catBookDiv" length="300px">
                                <img  src={`${process.env.REACT_APP_BACKEND_URL}${book.image}`} alt="book image"  className="card-img-top"  width="100%" height="140" />
                                <Link to="#"><h4 className="card-title">{book.name}</h4></Link><br />
                                <hr/>
                                <Link to="#"><small>By: {book.author.name}</small></Link>
                            </div> 
                        )
                    })
                }
              
            </div>
            <Pagination
                booksPerPage={booksPerPage}
                totalBooks={books.length}
                currentPage={currentPage}
                paginate={paginate}
            />
        </>
    )
}
