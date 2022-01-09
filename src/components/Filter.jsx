import React, { Component } from 'react'

export default class Filter extends Component {

  render() {
    const {categoryIdHandler, rangeHandler, sortHandler, searchHandler, searchBtn} = this.props
    const {categoryId, range, sort, search} = this.props.filter
    console.log(categoryId)
    return (
      <div className="container mt-3">
        <div className="row">
          {/* <!-- Category selection --> */}
          <div className="col-4 d-flex">
            <span>Category:</span>
            <select name="categoryId" value={categoryId} onChange={(event)=>categoryIdHandler(event)}>
              <option value="0">All</option>
              <option value="1">BALLOON & FLOWER STANDS</option>
              <option value="2">CARTS</option>
              <option value="3">PARTY HIRE</option>
            </select>
          </div>
        
          {/* <!-- Price range selection --> */}
          <div className="col-2 d-flex">
            <span>Range:</span>
            <select value={range} onChange={(event)=>rangeHandler(event)}>
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
            <select value={sort} onChange={(event)=>sortHandler(event)}>
              <option value="default" id="default">Default</option>
              <option value="ascend" id="ascend">from low to high</option>
              <option value="descend" id="descend">from high to low</option>
            </select>
          </div>
        
            {/* <!-- search by title --> */}
          <div className="col-3 d-flex">
            <input type="text" value={search} onChange={(event)=>searchHandler(event)} />
            <button onClick={searchBtn}>Search</button>
          </div>
        </div>
      </div>
    )
  }
}
