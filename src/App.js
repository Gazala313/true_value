import "./styles.css";
import axios from "axios";
import ReactPaginate from "react-paginate";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  LInk,
  Link
} from "react-router-dom";

import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBBtn,
  MDBBtnGroup,
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink
} from "mdb-react-ui-kit";
import { useEffect, useMemo, useState } from "react";

import Detail from "./Detail";
import Pagination from "./Pagination";

let PageSize = 10;

export default function App() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  useEffect(() => {
    loadDataHandle();
  }, []);

  const loadDataHandle = () => {
    fetch(
      "https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json?_page=1&_limit=10"
    )
      .then((res) => res.json())
      .then((response) => {
        setData(response);
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  // const handleSearch=async(e)=>{
  //   e.preventDefault();
  //   return axios.get(`https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/user.json?q=${value}`)
  //   .then((response)=>{
  //     setData(response);
  //     setValue("");
  // })
  //   .catch((err)=>console.log(err));
  // }

  // const handleSearch =(e)=>{
  //   e.preventDefault();
  //   fetch(`https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json/`+value)
  //   .then((res)=>res.json())
  //   .then((response)=>{
  //     setData(response);
  //     setValue("");
  //   })
  // }

  const handleSearch = (searchValue) => {
    setValue(searchValue);

    const filteredData = data.filter(function (item) {
      const itemData = item.user_code.toLowerCase();
      const textData = value.toLowerCase();
      return itemData.indexOf(textData) > -1;
    });
    // .sort((a, b) => a.answerStatus - b.answerStatus);
    setData(filteredData);
  };
  return (
    <div className="App">
      <div className="App">
        <MDBContainer>
          <form
            style={{
              margin: "auto",
              padding: "15px",
              maxWidth: "400px",
              alignContent: "center"
            }}
            className="d-flex input-group w-auto"
            onSubmit={handleSearch}
          >
            <input
              typr="text"
              className="form-control"
              placeholder="Search by First and Last Name"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
            <MDBBtn color="dark">Search</MDBBtn>
          </form>
          <div sytle={{ marginTop: "100px" }}>
            <MDBRow>
              <MDBCol size="12">
                <MDBTable>
                  <MDBTableHead dark>
                    <tr>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Age</th>
                      <th scope="col">Email</th>
                      <th scope="col">Website</th>
                    </tr>
                  </MDBTableHead>
                  {data.length === 0 ? (
                    <MDBTableBody className="align-center mb-0">
                      <tr>
                        {/* <td colSpan={8} className="text-center mb-0">No Data Found</td> */}
                      </tr>
                    </MDBTableBody>
                  ) : (
                    data.map((item, index) => (
                      <MDBTableBody key={index}>
                        <tr>
                          <td>
                            {" "}
                            <button
                              style={{ border: "0px", background: "white" }}
                              onClick={() => {
                                setData("");
                                <Detail
                                  item={item}
                                  key={index}
                                  setData={setData}
                                />;
                              }}
                            >
                              {item.first_name}
                            </button>
                          </td>
                          <td>{item.last_name}</td>
                          <td>{item.age}</td>
                          <td>{item.email}</td>
                          <td>
                            <a href={item.web} target="_blank">
                              {" "}
                              {item.web}
                            </a>
                          </td>
                        </tr>
                      </MDBTableBody>
                    ))
                  )}
                </MDBTable>
              </MDBCol>
            </MDBRow>
          </div>
        </MDBContainer>

        {/* <ReactPaginate
      previousLabel={"<"}
      nextLabel={">"}
      breakLabel={"..."}
      pageCount={24}
      marginPagesDisplayed={3}
      pageRangeDisplayed={3}
      containerClassName={"pagination justify-content-center"}
      pageClassName={"page-item "}
      pageLinkClassName={"page-link"}
      previousClassName={"page-item"}
      previousLinkClassName={"page-link"}
      nextClassName={"page-item"}
      nextLinkClassName={"page-link"}
      breakClassName={"page-item"}
      breakLinkClassName={"page-link"}
      activeClassName={"active"}/> */}
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={data.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}
