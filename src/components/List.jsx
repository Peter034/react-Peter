import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import Item from './Item';
import './List.css'
import Filter from './Filter'
export default class List extends Component {

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

  componentDidMount(){
    PubSub.subscribe('apiData',(msg,data)=>{
      this.setState({productList:data,filteredList:data})
    })
  }

  // filter product
  handleFilter = () => {
    const { productList } = this.state
    const {categoryId, range, sort, search} = this.state.filter
    this.setState({filteredList:[]})
    console.log(this.state.filteredList)
    // if (productList === []) {
    //   return
    // } else {
      productList.forEach(data => {
      if (categoryId === '0' || data.categoryId.toString() === categoryId) {
          if (data.title.toLowerCase().search(search.toLowerCase()) !== -1) {
            if (range === '-1' ||  range === '400' && data.price > range) {
              this.setState((prevState) => {
                return {
                  filteredList:[...prevState.filteredList,data]
                }
              })
              return
            } else if (data.price >= parseInt(range) && data.price < (100 + parseInt(range))){
              this.setState((prevState) => {
                return {
                  filteredList:[...prevState.filteredList,data]
                }
              })
              return
            } else {}
          }
        }
      })
      this.sortByPrice(sort)
    // }
  }

  sortByPrice = (sort) => {
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
    const {filteredList} = this.state
    const {handleUpdate, handleDelete} = this.props
    return (
      <div>
        <div className="container mt-3">
          <Filter filter={this.state.filter} categoryIdHandler={this.categoryIdHandler} rangeHandler={this.rangeHandler} sortHandler={this.sortHandler} searchHandler={this.searchHandler} searchBtn={this.searchBtn}/>
        </div>
        <div className="container mt-3">
          <div className="row justify-content-center" >
            <table className="table">
              <thead className="thead">
                <tr>
                  <th>ProductId</th>
                  <th>Category</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Created On</th>
                  <th>Updated On</th>
                  <th>Operator</th>
                </tr>
              </thead>
              <tbody>
                {
                  filteredList.map(product => 
                    {
                      return <Item key={product.prodId} {...product} handleUpdate={handleUpdate} handleDelete={handleDelete}/>
                    }
                  )
                }
              </tbody>
            </table>
          </div>
        </div>



      </div>
    )
  }
}
