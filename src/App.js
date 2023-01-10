import axios from "axios";
import { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import cellEditFactory from "react-bootstrap-table2-editor";
import filterFactory, { numberFilter } from "react-bootstrap-table2-filter";
import styled from "styled-components";
function App() {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false)
  const [shouldshow, setShouldshow] = useState(false);
 
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {

 
    try {
      axios("https://reqres.in/api/products").then((res) => {
      console.log(res.data.data);
      setData(res.data.data);
      setLoaded(true)
    });
    }  catch (e) {
      console.log(e.message)
      setLoaded(false)
      
  }

 
  
  }; 
  
  
 
  

  const selectRow = {
    mode: "checkbox",
    clickToSelect: true,
    selected: [1, 3],
    clickToEdit: true,
  };
  const columns = [
    { 
      dataField: "id",
      text: "Product ID",
      filter: numberFilter({
        placeholder: "Enter Product Id",
        delay:500,
        withoutEmptyComparatorOption: true,
        withoutEmptyNumberOption: true,
        comparatorStyle: {
          display: "none"
        },
   
        
      }),

      sort: true,
      validator: (newValue, row, column) => {
        if (isNaN(newValue)) {
          return {
            valid: false,
            message: "Please enter numeric value",
          };
        }
        return true;
      },
    },
   
    {
      dataField: "name",
      text: "Name",
      sort: true,
      editable: false,
    },
    {
      dataField: "year",
      text: "Year",
      sort: true,
      editable: false,
    }
    
  ];

  const options = {
    page: 1,
    sizePerPage: 5,
    nextPageText: '>',
    prePageText: '<',
    showTotal: true
  };


  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      setShouldshow(true)
    }
  };

  const rowStyle = (row, rowIndex) => {
    return { 
      backgroundColor: loaded ? data[0].color : "white",
      
  };
  };

  return (
    <>


{ shouldshow && (
        <ModalBackground onClick={() => setShouldshow(false)}>
            <ModalBody onClick={(e) => e.stopPropagation()}>
                
            <WhiteFlexColumnRoot> 
      <FlexColumns>
      <RoyalPurpleText onClick={() => setShouldshow(false)}>X</RoyalPurpleText>
      <div style={{overflowX: "auto"}} > 
<table  style={{width:"100%"}} >    
     <tr style={{height:"25px", backgroundColor: "#e5e5e5"}}>
         {/* <th style={{width:"4%"}}></th>  */}
         <th style={{width:"11.8%"}}> Id</th>
         <th style={{width:"18%"}}>Name</th> 
         <th style={{width:"17%"}}>Year</th>
         <th style={{width:"14%"}}>Color</th>
         <th style={{width:"21%"}}>Pantone value</th>
         
     </tr> 


     {  loaded ? data.map((modaldata) => {
        return (
     <tr key={modaldata.id} style={{height:"45px"}}> 
        
        
         <td><Text3>{modaldata.id}</Text3></td>
         <td><Text3>{modaldata.name}</Text3></td>
         <td><Text3>{modaldata.year}</Text3></td>
         <td><Text3>{modaldata.color}</Text3></td>  
         <td><Text3>{modaldata.pantone_value}</Text3></td>  
     </tr>
    
    );})   :  ( <div className="pos-center" >
    <div className="loader"></div> 
   </div>
) 
    }   
  
  
     
 </table>
</div>

      </FlexColumns>
    </WhiteFlexColumnRoot>

    
            </ModalBody>
        </ModalBackground>
      )}

    {loaded ? (
     <p style={{ color: "blue", display: "flex", justifyContent: "center"}}>Data Retrieved Successfully </p>
     ):<p style={{ color: "red", display: "flex", justifyContent: "center"}}> Error retrieving Data from server </p>
    }

    <div className="App" style={{ marginLeft: "20px", marginRight: "20px" }} >
    
      <BootstrapTable 
     
        keyField="id"
        data={data}
        columns={columns}
        rowEvents={ rowEvents }
        rowStyle={ rowStyle }
        hover
        
        condensed
        pagination={paginationFactory(options)}
        cellEdit={cellEditFactory({
          mode: "dbclick",
          blurToSave: true,
          nonEditableRows: () => [1, 2, 3],
        })}
        selectRow={selectRow}
        filter={filterFactory()}
      />
    </div>
    </>
  );
}





const sizes = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
};
export const devices = {
  mobileS: `(min-width: ${sizes.mobileS})`,
  mobileM: `(min-width: ${sizes.mobileM})`,
  mobileL: `(max-width: ${sizes.mobileL})`,
  tablet: `(max-width: ${sizes.tablet})`,
  laptop: `(min-width: ${sizes.laptop})`,
  laptopL: `(min-width: ${sizes.laptopL})`,
  desktop: `(min-width: ${sizes.desktop})`,
};




const ModalBackground = styled.div`
   position:fixed;
   z-index: 1;
   left: 0;
   top: 0;
   width: 100%;
   height: 100%;
   overflow: auto;
   background-color: rgba(0,0,0,0.5);
`

const ModalBody = styled.div`
   background-color: white;
   margin: 10% auto;
   padding: 20px; 
   width: 50%;
   @media ${devices.tablet} {
      width: 100%;   
    } 
    @media ${devices.mobileL} { 
      width: 100%;
    } 
`
const WhiteFlexColumnRoot = styled.div`
height: 390px;
background-color: #ffffff;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
border-radius: 6px;
padding: 0px 40px 0px 43px;
`;
const FlexColumns = styled.div`
height: 273px;
display: flex;
flex-direction: column;
]
`;



const Text3 = styled.div`
  mix-blend-mode: normal;
  font-size: 17px;
  font-family: Roboto;
  line-height: 21px;
  color: #787878;
  text-align: left;
 
`;

const RoyalPurpleText = styled.div`
  display: flex;
  font-size: 14px;
  font-family: Roboto;
  line-height: 21px;
  color: #ffffff;
  width: 50px;
  height: 45px;
  background-color: #2d0353;
  flex-direction: row;
  justify-content: center;
  border-radius: 6px;
  padding: 4px 0px 4px 0px;
  cursor: pointer;
`;

export default App;

