import React, { Component } from 'react';
import './Update.css';
import PubSub from 'pubsub-js';

export default class Update extends Component {

  state = {
    categoryId:'1',
    title:'',
    price:'',
    url:''
  }

  componentDidMount(){
    this.token = PubSub.subscribe('productInfo',(msg,data)=>{
      this.setState({
        categoryId:data.categoryId
      })
    })
  }

  componentWillUnmount(){
    PubSub.unsubscribe(this.token)
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

  urlHandle = (event) => {
    this.setState({url:event.target.value})
  }

  updateItem = (prodId) => {
    const urlArr = this.state.url === '' ? '' : this.state.url.replace("\n").split(";")
    const updateObj = {
      ...this.state,
      url:urlArr
    }
    if (updateObj.title === '' || updateObj.price === '') {
      alert("please fill in all items")
      this.setState({categoryId:'1',title:'',price:'',url:''})
      return
    } else {
    this.props.handleUpdate(prodId,updateObj)
    this.setState({categoryId:'1',title:'',price:''})
    }
  }


  render() {
    const {prodId,product_media} = this.props
    const {categoryId, title, price, url} = this.state
    return (
      <div id="update">
        <div className="modal fade" id={`infoModal${prodId}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                        <td>Product Id</td>
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
                      <tr>
                        <td>Add image URL: </td>
                        <td>
                          <textarea id="urlContainer" name="price" value={url} onChange={event => this.urlHandle(event)} placeholder="spilt by ';'">
                          </textarea>
                        </td>
                      </tr>
                      <tr>
                        <td id="imgContainer">
                          { 
                            product_media[0] ? <img src={`https://storage.googleapis.com/luxe_media/wwwroot/${product_media[0].url}`} alt="" /> : ''
                          }
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </form>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button className="btn btn-primary text-right" data-bs-dismiss="modal" onClick={() => this.updateItem(prodId)}>Update</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
