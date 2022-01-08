import React, { Component } from 'react';
import Update from './Update';
import './Item.css';
export default class Item extends Component {

  deleteItem = (prodId) => {
    this.props.handleDelete(prodId)
  }

  render() {
    const {prodId, title, price, created_at, updated_at,handleUpdate} = this.props
    const {categoryName} = this.props.category

    return (
      <>
        <tr>
          <td>{prodId}</td>
          <td>{categoryName}</td>
          <td>{title}</td>
          <td>{price}</td>
          <td>{created_at}</td>
          <td>{updated_at}</td>
          <td>
            <Update handleUpdate={handleUpdate} prodId={prodId} title={title} price={price}/>
            &nbsp;
            <button className="btn btn-primary" onClick={()=>{this.deleteItem(prodId)}}>Delete</button>
          </td>
        </tr>
      </>
    )
  }
}
