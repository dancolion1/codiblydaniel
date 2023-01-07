import React, { Component } from 'react'  

import BootstrapTable from 'react-bootstrap-table-next';  

import axios from 'axios';  

import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';  

import paginationFactory from 'react-bootstrap-table2-paginator';  

export class Bootstraptab1 extends Component {  

        state = {  

                products: [],  

                columns: [{  

                  dataField: 'Id',  

                  text: 'Id'  

                },  

                {  

                  dataField: 'Name',  

                  text: 'Name',  

                  filter: textFilter()  

                }, {  

                  dataField: 'Year',  

                  text: 'Year',  

                  sort: true  

                } 

              
                ]  

              }  

              componentDidMount() {    

                axios.get('https//reqres.in/api/products').then(response => {    

                  console.log(response.data);    

                  this.setState({    

                        products: response.data    

                  });    

                });    

              }   

        render() {  

                const options = {  

                        page: 2,   

                        sizePerPageList: [ {  

                          text: '5', value: 5  

                        }, {  

                          text: '10', value: 10  

                        }, {  

                          text: 'All', value: this.state.products.length  

                        } ],   

                        sizePerPage: 5,   

                        pageStartIndex: 0,   

                        paginationSize: 3,    

                        prePage: 'Prev',   

                        nextPage: 'Next',   

                        firstPage: 'First',   

                        lastPage: 'Last',   

                        paginationPosition: 'top'    

                      };  

                return (  

                        <div className="container">  

                        <div class="row" className="hdr">    

                        <div class="col-sm-12 btn btn-info">    

                        React   

                         </div>    

                          </div>   

                        <div className="container" style={{ marginTop: 50 }}>  

                        <BootstrapTable   

                        striped  

                        hover  

                        keyField='id'   

                        data={ this.state.products }   

                        columns={ this.state.columns }   

                        filter={ filterFactory() }   

                        pagination={ paginationFactory(options) }/>  

                      </div>  

                      </div>  

                )  

        }  

}  

  

export default Bootstraptab1 