import React, { Component } from 'react';
import Item from './Item';




export default class List extends Component {

  
  render() {
    const {productList, handleUpdate, handleDelete} = this.props
    return (
      <div>
        <div className="container">
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
                    productList.map(product => 
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
