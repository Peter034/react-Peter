import React, { Component } from 'react';
import Add from './components/Add';
import List from './components/List';
import '@popperjs/core';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Filter from './components/Filter'


export default class App extends Component {
  state = {
    productList:[],
    filteredList:[],
    filter:{
      categoryId:'0',
      range:'-1',
      sort:'default',
      search:''
    }
  }

  componentDidMount() {
    this.getApiData()
  }

  // Get data from API
  getApiData = () => {
    fetch('http://example.co/api/product')
        .then(response => response.json())
        .then(data => {
          this.setState({productList:data})
          this.setState({filteredList:data})
        })
  }

  // create new product
  handleCreate = (event) => {
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
    .then(data => this.getApiData())
    event.target[0].value = ''
    event.target[1].value = ''
    event.target[2].value = '1'
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

    fetch(`http://example.co/api/product/${prodId}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json;chartset:utf-8"
      },
      body: JSON.stringify(obj)
    })
    .then(data => this.getApiData())
  }

  // filter product
  handleFilter = () => {
    const { productList, filteredList } = this.state
    const {categoryId, range, sort, search} = this.state.filter
    this.setState({filteredList:[]})

    productList.forEach(data => {
    if (categoryId === '0' || data.categoryId.toString() === categoryId) {
        if (data.title.toLowerCase().search(search.toLowerCase()) !== -1) {
          if (range === '-1' ||  range === '400' && data.price > range) {
            this.setState((prevState) => {
              return {
                filteredList:[...prevState.filteredList,JSON.parse(JSON.stringify(data))]
              }
            })
            return
          } else if (data.price >= parseInt(range) && data.price < (100 + parseInt(range))){
            this.setState((prevState) => {
              return {
                filteredList:[...prevState.filteredList,JSON.parse(JSON.stringify(data))]
              }
            })
            return
          } else {}
        }
      }
    })
    this.sortByPrice(sort)
  }

  sortByPrice = (sort) => {
    const {filteredList} = this.state
    switch (sort) {
      case 'default':
        break;
  
      case 'ascend':
        this.setState((prevState) => {
          return {
            filteredList:[...prevState.filteredList.sort(function(a,b){return a.price-b.price})]
          }
        })
        break;
      
      case 'descend':
        this.setState((prevState) => {
          return {
            filteredList:[...prevState.filteredList.sort(function(a,b){return b.price-a.price})]
          }
        })
    }
  }

  categoryIdHandler = (event) => {
    this.setState((prevState) => {
      return {
        filter: {...prevState.filter, categoryId:event.target.value}
      }
    }, () => {
      this.handleFilter()
    })
  }

  rangeHandler = (event) => {
    this.setState((prevState) => {
      return {
        filter: {...prevState.filter, range:event.target.value}
      }
    }, () => {
      this.handleFilter()
    })
  }

  sortHandler = (event) => {
    this.setState((prevState) => {
      return {
        filter: {...prevState.filter, sort:event.target.value}
      }
    }, () => {
      this.handleFilter()
    })
  }

  searchHandler = (event) => {
    this.setState((prevState) => {
      return {
        filter: {...prevState.filter, search:event.target.value}
      }
    }, () => {
      this.handleFilter()
    })
  }

  searchBtn = () => {
    this.setState((prevState) => {
      return {
        filter: {...prevState.filter, search:''}
      }
    }, () => {
      this.handleFilter()
    })
  }


  render() {
    return (
      <div>
        <Add handleCreate={this.handleCreate}/>
        <Filter categoryIdHandler={this.categoryIdHandler} rangeHandler={this.rangeHandler} sortHandler={this.sortHandler} searchHandler={this.searchHandler} searchBtn={this.searchBtn} filter={this.state.filter}/>
        <List filteredList={this.state.filteredList} handleUpdate={this.handleUpdate} handleDelete={this.handleDelete}/>
      </div>
    )
  }
}


