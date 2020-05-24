import React from 'react';
import { connect } from 'react-redux';
import CategoryForm from './categoryForm';
import {editCategoryFun} from '../../../API/category'

const EditCategoryPage = (props) => (  
    <div>
        <CategoryForm 
            category={props.category}
            onSubmit = { category => {
                editCategoryFun(props,category);
            }} 
        />
    </div>
);

const mapStateToProps = (state, props) => {
    return {
        category: state.categoryReducer.find((category) => category.id === props.match.params.id)   
    }
}

export default connect(mapStateToProps)(EditCategoryPage);