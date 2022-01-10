import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import Add from './components/Add';
import List from './components/List';
import '@popperjs/core';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';



export default class App extends Component {

  componentDidMount() {
    this.getApiData()
  }

  // Get data from API
  getApiData = () => {
    fetch('http://example.co/api/product')
        .then(response => response.json())
        .then(data => {
          PubSub.publish('apiData',data)
        })
  }

  // create new product
  handleCreate = (obj) => {
    fetch('http://example.co/api/product', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(obj)
    })
    .then(data => this.getApiData())
  }

  // Delete product
  handleDelete = (prodId) => {
    fetch(`http://example.co/api/product/${prodId}`,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json;charset=utf-8"
      }
    })
    .then(data => this.getApiData())
  }

  // Update product
  handleUpdate = (prodId, obj) => {

    // update product table
    fetch(`http://example.co/api/product/${prodId}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json;chartset:utf-8"
      },
      body: JSON.stringify(obj)
    })
    .then(data => this.getApiData())

  }

  render() {
    return (
      <div>
        <Add handleCreate={this.handleCreate}/>
        <List handleUpdate={this.handleUpdate} handleDelete={this.handleDelete}/>
      </div>
    )
  }
}


