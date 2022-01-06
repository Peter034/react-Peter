import React, { Component } from 'react'

export default class Add extends Component {


  render() {
    const {handleSubmit} = this.props

    return (
        <div className="container">
          <div className="row justify-content-center" >
            <form  onSubmit={handleSubmit}>
              <table align="center">
                <tbody>
                  <tr>
                    <th>ProductName</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Operator</th>
                  </tr>
                  <tr>
                    <td><input type="text" name="title" /><br /></td>
                    <td><input type="text" name='price' /></td>
                    <td>
                      <select name="categoryId">
                        <option value="1">BALLOON & FLOWER STANDS</option>
                        <option value="2">CARTS</option>
                        <option value="3">PARTY HIRE</option>
                      </select>
                    </td>
                    <td><button>Submit</button></td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        </div>
    )
  }
}



