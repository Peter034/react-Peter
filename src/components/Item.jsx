import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';

export default class List extends Component {
  updateItem(prodId) {
    this.props.handleUpdate(prodId)
  }

  deleteItem(prodId) {
    this.props.handleDelete(prodId)
  }

  render() {
    const {prodId, title, price, created_at, updated_at} = this.props
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
            <NavLink className="list-group-item" to={{pathname:'/update', state:{prodId,categoryName,title,price}}}>
              <button onClick={()=>{this.updateItem(prodId)}}>
                Update
              </button>
            </NavLink>
            <button onClick={()=>{this.deleteItem(prodId)}}>Delete</button>
          </td>
        </tr>
      </>
    )
  }
}
