import React, { Component } from 'react'
import {NavLink} from 'react-router-dom';
import './Update.css'

export default class Update extends Component {
  updateItem = () => {

  }
  
  render() {
    const {prodId,categoryName,title,price} = this.props.location.state
    // const {productList, handleUpdate, handleDelete} = this.props
    return (
      <>
      <h3>Update Information</h3>
      <form>
        <table align="center">
          <tbody>
            <tr>
              <th></th>
              <th>Product Id</th>
              <th>Category</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Operator</th>
            </tr>
            <tr>
              <td>Old:</td>
              <td>{prodId}</td>
              <td>{categoryName}</td>
              <td>{title}</td>
              <td>{price}</td>
            </tr>
            <tr>
              <td>New:</td>
              <td>{prodId}</td>
              <td>{categoryName}</td>
              <td><input type="text" name="title" /><br /></td>
              <td><input type="text" name='price' /></td>
              <td>
                <NavLink className="list-group-item" to="/">
                  <button>Update Confirm</button>
                </NavLink>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      </>
    )
  }
}
