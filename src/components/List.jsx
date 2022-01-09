import React, { Component } from 'react';
import Item from './Item';
import './List.css'

export default class List extends Component {


  
  render() {
    const {filteredList, handleUpdate, handleDelete} = this.props
    return (
      <div>
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
