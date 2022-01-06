import React, { Component } from 'react';
import { NavLink, Route, Redirect } from 'react-router-dom';
import Add from './components/Add';
import List from './components/List';
import Update from './components/Update'



export default class App extends Component {
  state = {
    productList:[]
  }

  componentDidMount() {
    this.getApiData()
  }

  // Get data from API
  getApiData = () => {
    fetch('http://example.co/api/product')
        .then(response => response.json())
        .then(data => this.setState({productList:data},()=>{
          console.log(this.state.productList)
        }))
  }


  handleUpdate = (prodId) => {
    console.log('updateProduct')
  }

  handleDelete = (prodId) => {
    fetch(`http://example.co/api/product/${prodId}`,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json;charset=utf-8"
      }
    })
    .then(data => this.getApiData())
  }

  // create new product
  handleSubmit = (event) => {
    event.preventDefault()
    const user = {
      title: event.target[0].value,
      price: event.target[1].value,
      categoryId: event.target[2].value
    }
    fetch('http://example.co/api/product', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(user)
    })
    .then(setTimeout(()=>{this.getApiData()},150))
    event.target[0].value = ''
    event.target[1].value = ''
    event.target[2].value = '1'
  }

  render() {
    return (
      <div>
        <Add handleSubmit={this.handleSubmit}/>
        <List productList={this.state.productList} handleUpdate={this.handleUpdate} handleDelete={this.handleDelete}/>
        <Route path="/" component=''></Route>
        <Route path="/update" component={Update}/>
      </div>
    )
  }
}


