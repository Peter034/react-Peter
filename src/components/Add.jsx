import React, { Component } from 'react';
import './Add.css'

export default class Add extends Component {

  state = {
    categoryId:'1',
    title:'',
    price:''
  }

  categoryHandler = (event) => {
    this.setState({categoryId:event.target.value})
  }

  titleHandler = (event) => {
    this.setState({title:event.target.value})
  }

  priceHandler = (event) => {
    this.setState({price:event.target.value})
  }


  createItem = () => {
    const createObj = {...this.state}
    if (createObj.title === '' || createObj.price === '') {
      alert("please fill in the first two items at least")
      this.setState({categoryId:'1',title:'',price:''})
      return
    } else {
    this.props.handleCreate(createObj)
    this.setState({categoryId:'1',title:'',price:''})
    }
  }


  render() {
    const {handleCreate} = this.props
    const {categoryId,title,price,url} = this.state
    return (
        <div className="container mt-3">
          <div className="row">
            <div className="d-flex justify-content-center">
              <table id="addForm">
                <tbody>
                  <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Operator</th>
                  </tr>
                  <tr>
                    <td><input type="text" name="title" value={title} onChange={event => this.titleHandler(event)}/><br /></td>
                    <td><input type="text" name="price" value={price} onChange={event => this.priceHandler(event)}/></td>
                    <td>
                      <select name="categoryId" value={categoryId} onChange={event => this.categoryHandler(event)}>
                        <option value="1">BALLOON & FLOWER STANDS</option>
                        <option value="2">CARTS</option>
                        <option value="3">PARTY HIRE</option>
                      </select>
                    </td>
                    <td>
                      <button onClick={this.createItem}>Submit</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
    )
  }
}



