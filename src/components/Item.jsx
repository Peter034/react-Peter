import React, { Component } from 'react';
import Update from './Update';
import './Item.css';
import PubSub from 'pubsub-js';
export default class Item extends Component {

  category() {
    const data = this.props.product
    PubSub.publish('productInfo', data)
  }

  deleteItem = (prodId) => {
    this.props.handleDelete(prodId)
  }

  render() {
    const {handleUpdate} = this.props
    const {prodId, title, price, created_at, updated_at,product_media} = this.props.product
    const {categoryName} = this.props.product.category
 
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
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#infoModal${prodId}`} onClick={() => this.category()}>
              Update
            </button>
            <Update prodId={prodId} handleUpdate={handleUpdate} product_media={product_media}/>
            &nbsp;
            <button className="btn btn-primary" onClick={()=>{this.deleteItem(prodId)}}>
              Delete
            </button>
          </td>
        </tr>
      </>
    )
  }
}
