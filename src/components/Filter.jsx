import React, { Component } from 'react'

export default class Filter extends Component {

  state = {
    categoryId:'0',
    range:'-1',
    sort:'default',
    search:''
  }

  categoryIdHandler = (event) => {
    this.setState({categoryId: event.target.value}, () => {
      this.filterHandler()
    })
  }

  rangeHandler = (event) => {
    this.setState({range: event.target.value}, () => {
      this.filterHandler()
    })
  }

  sortHandler = (event) => {
    this.setState({sort: event.target.value}, () => {
      this.filterHandler()
    })
  }

  searchHandler = (event) => {
    this.setState({search: event.target.value})
  }

  searchBtn = () => {
      this.filterHandler()
      this.setState({search: ''})
  }

  filterHandler = () => {
    const filterObj = this.state
    this.props.handleFilter(filterObj)
  }

  render() {
    const {categoryId, range, sort, search} = this.state
    return (
      <div className="container mt-3">
        <div className="row">
          {/* <!-- Category selection --> */}
          <div className="col-4 d-flex">
            <span>Category:</span>
            <select name="categoryId" value={categoryId} onChange={(event)=>this.categoryIdHandler(event)}>
              <option value="0">All</option>
              <option value="1">BALLOON & FLOWER STANDS</option>
              <option value="2">CARTS</option>
              <option value="3">PARTY HIRE</option>
            </select>
          </div>
        
          {/* <!-- Price range selection --> */}
          <div className="col-2 d-flex">
            <span>Range:</span>
            <select value={range} onChange={(event)=>this.rangeHandler(event)}>
              <option value="-1" id="range-1">All</option>
              <option value="0" id="range0">0 - 100</option>
              <option value="100" id="range100">100 - 200</option>
              <option value="200" id="range200">200 - 300</option>
              <option value="300" id="range300">300 - 400</option>
              <option value="400" id="range400">400 +</option>
            </select>
          </div>

            {/* <!-- do a sort by price ( either from most expansive to least or the other way) --> */}
          <div className="col-3 d-flex">
            <span>Sort by price:</span>
            <select value={sort} onChange={(event)=>this.sortHandler(event)}>
              <option value="default" id="default">Default</option>
              <option value="ascend" id="ascend">from low to high</option>
              <option value="descend" id="descend">from high to low</option>
            </select>
          </div>
        
            {/* <!-- search by title --> */}
          <div className="col-3 d-flex">
            <input type="text" value={search} onChange={(event)=>this.searchHandler(event)} />
            <button onClick={this.searchBtn}>Search</button>
          </div>

        </div>
      </div>
    )
  }
}
