import React, { Component } from 'react';
import './Update.css'

export default class Update extends Component {

  state = {
    categoryId:'1',
    title:'',
    price:'',
  }

  categoryHandle = (event) => {
    this.setState({categoryId:event.target.value})
  }

  titleHandle = (event) => {
    this.setState({title:event.target.value})
  }

  priceHandle = (event) => {
    this.setState({price:event.target.value})
  }

  updateItem = (event,prodId) => {
    event.preventDefault()
    const updateObj = this.state
    if (updateObj.title === '' || updateObj.price === '') {
      console.log('error')
      alert("please fill in all items")
      this.setState({categoryId:'1',title:'',price:''})
      return
    } else {
    this.props.handleUpdate(prodId,updateObj)
    this.setState({categoryId:'1',title:'',price:''})
    }
  }


  render() {
    const {prodId} = this.props
    const {categoryId,title,price} = this.state
    return (
      <div id="update">
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Update
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Update info</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <form>
                <div className="modal-body">
                  <table>
                    <tbody>
                      <tr>
                        <td>Product Id:</td>
                        <td>{prodId}</td>
                      </tr>
                      <tr>
                        <td>Category:</td>
                        <td>                              
                          <select name="categoryId" id="categoryId" value={categoryId} onChange={event => this.categoryHandle(event)}>
                            <option value="1">BALLOON & FLOWER STANDS</option>
                            <option value="2">CARTS</option>
                            <option value="3">PARTY HIRE</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td>Product Name:</td>
                        <td><input type="text" name="title" value={title} onChange={event => this.titleHandle(event)}/></td>
                      </tr>
                      <tr>
                        <td>Price:</td>
                        <td><input type="text" name="price" value={price} onChange={event => this.priceHandle(event)}/></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </form>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button className="btn btn-primary text-right" data-bs-dismiss="modal" onClick={(event) => this.updateItem(event,prodId)}>Update</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
