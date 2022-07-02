import { MDBTable } from "mdb-react-ui-kit";

function Detail(props) {
  return (
    <div>
      <h1>
        Details: {props.item.first_name} {props.item.last_name}
      </h1>
      <div>
        <MDBTable>
          <div>First Name: {props.item.first_name}</div>
          <div>Last Name: {props.item.last_name}</div>
          <div>Comapny_Name: {props.item.company_name}</div>
          <div>City: {props.item.city}</div>
          <div>State: {props.item.state}</div>
          <div>Zip: {props.item.zip}</div>
          <div>Email: {props.item.email}</div>
          <div>Web: {props.item.web}</div>
          <div>{props.item.Age}</div>
        </MDBTable>
      </div>
    </div>
  );
}

export default Detail;
