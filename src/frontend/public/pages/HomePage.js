import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

import "../style/homepage.css";

const HomePage = () => {
  return (
    <div id="homeDiv">
      <MDBContainer id="container">
        <MDBCard>
          <MDBCardBody>
            <p className="h2 text-center mb-4 mt-4">Digital Classroom </p>
            <MDBRow>
              <MDBCol>
                <MDBCard>
                  <MDBCardBody>
                    <Link to="/teacher-login">
                      <MDBBtn className="mt-2" block>
                        Teacher
                      </MDBBtn>
                    </Link>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol>
                <MDBCard id="studentCard">
                  <MDBCardBody>
                    <Link to="/student-login">
                      <MDBBtn className="mt-2" block>
                        Student
                      </MDBBtn>
                    </Link>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
};

export default HomePage;
