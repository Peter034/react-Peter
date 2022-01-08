import React, { Component } from 'react';
import Item from './Item';
import Filter from './Filter'

export default class List extends Component {

  state = {
    filteredList : []
  }

  handleFilter = (obj) => {
    let {filteredList} = this.state
    const {productList} = this.props
    const {categoryId, range, sort, search} = obj
    this.setState({filteredList:[]})

    productList.forEach(data => {
    if (categoryId == 0 || data.categoryId == categoryId) {
        if (data.title.toLowerCase().search(search.toLowerCase()) !== -1) {
          if (range == '-1' ||  range == '400' && data.price > range) {
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
          } else {

          }
        }
      }
    })
    this.sortByPrice(sort, filteredList)
  }

  sortByPrice = (sort, filteredList) => {
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
  
  render() {
    const {filteredList} = this.state
    const {productList, handleUpdate, handleDelete} = this.props
    return (
      <div>
        <Filter handleFilter={this.handleFilter}/>
        <div className="container mt-3">
          <div className="row justify-content-center" >
            <table align="center">
              <tbody>
                <tr>
                  <th>ProductId</th>
                  <th>Category</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Created On</th>
                  <th>Updated On</th>
                  <th>Operator</th>
                </tr>
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
