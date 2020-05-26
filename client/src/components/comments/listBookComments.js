import React, {useState ,useEffect} from 'react';
import axios from 'axios';
import '../../styles/reviews.scss';

export default (props) => {
    const [comments,setComments]=useState([]);
    console.log(props);
    
    useEffect( () => {       
        axios.get(`http://localhost:5000/comments/${props.computedMatch.params.bookId}`, {withCredentials: true}).then(response => {
            console.log(response.data);
            setComments(response.data);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    return ( 
        <div>
            {
                comments.map(comment => {
                    return ( 
                        <div >
                            <div className="user-div">
                                <img src="../../../img/user_avatar.jpg" alt="By:" className="user-photo"/>
                                <h4> {comment.user.username} </h4>
                            </div>
                            <p>{comment.content}</p>
                            <small>Created At: {comment.createdAt} </small>
                            <hr />
                        </div> 
                    )
                })
            }   
        </div>
    )
}