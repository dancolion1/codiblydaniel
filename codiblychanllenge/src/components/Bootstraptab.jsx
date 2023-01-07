import React, { Component } from 'react'  

import BootstrapTable from 'react-bootstrap-table-next';  

import axios from 'axios';  

import paginationFactory from 'react-bootstrap-table2-paginator';  

export class Bootstraptab extends Component {  

        state = {  

                products: [],  

                columns: [{  

                  dataField: 'Id',  

                  text: 'Id'  

                },  

                {  
                  dataField: 'Name',  

                  text: 'Name',  

                  

                }, {  

                  dataField: 'year',  

                  text: 'year',  

                  sort: true  

                } 

                
                      ]  

              }  

              componentDidMount() {    

                axios.get('http://reqres.in/api/products').then(response => {    

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
                       

                      };  

                return (  

                        <div className="container">  

                        <div class="row" className="hdr">    

                        <div class="col-sm-12 btn btn-info">    

                          

                         </div>    

                          </div>    

                        <div  style={{ marginTop: 20 }}>  

                        <BootstrapTable   

                        striped  

                        hover  

                        keyField='id'   

                        data={ this.state.products }   

                        columns={ this.state.columns }  

                        pagination={ paginationFactory(options) } />  

                      </div>  

                      </div>  

                )  

        }  

}  

  

export default Bootstraptab 