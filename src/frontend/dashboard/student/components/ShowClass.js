import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../shared/context/AuthContext";
import "../styles/showClass.css";

const ShowClass = () => {
  const context = useContext(AuthContext);

  const [teacherName, setTeacherName] = useState();

  const [classType, setClassType] = useState();

  const [classId, setClassId] = useState();

  const [fileArray, setFileArray] = useState([]);

  useEffect(() => {
    if (!context.studentEmail) {
      return;
    }
    const studentEmail = context.studentEmail;

    fetch(`${process.env.REACT_APP_API_URL}/getStudentClass`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentEmail: studentEmail,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setTeacherName(data.teacherName);
          setClassType(data.classType);
          setClassId(data.classId);
          setFileArray(data.fileArray);
        }
      });
  }, [context.studentEmail]);

  const fileUrl = `${process.env.REACT_APP_CLOUD_URL}`;

  return (
    <div>
      <MDBContainer className="mt-4">
        <MDBCard>
          <MDBCardBody>
            <MDBRow>
              <MDBCol>
                {classType ? (
                  <>
                    <p
                      style={{ fontWeight: "bold" }}
                      className="h1 text-center"
                    >
                      {classType}
                    </p>
                    <p className="h4 mt-4 text-center">Class ID: {classId}</p>
                    <p className="h4 mt-4 text-center">
                      Teacher: {teacherName}
                    </p>
                    <MDBRow className="mt-4">
                      <MDBCol>
                        <MDBCard>
                          <MDBCardBody>
                            <MDBRow>
                              <MDBCol>
                                <p className="h2 mt-4 text-center">
                                  Study material
                                </p>
                              </MDBCol>
                            </MDBRow>
                            {fileArray.length !== 0 ? (
                              <MDBRow className="mt-4">
                                {fileArray.map((file, i) => (
                                  <MDBCol key={i}>
                                    <div className="text-center">
                                      <video id="video" controls>
                                        <source
                                          src={`${fileUrl}/${file}.mp4`}
                                        />
                                      </video>
                                    </div>
                                  </MDBCol>
                                ))}
                              </MDBRow>
                            ) : (
                              <p
                                style={{ color: "gray" }}
                                className="h1 mt-4 text-center"
                              >
                                --- No Study material provided yet ! ---
                              </p>
                            )}
                          </MDBCardBody>
                        </MDBCard>
                      </MDBCol>
                    </MDBRow>
                  </>
                ) : (
                  <p className="h2 text-center">--- No Class ---</p>
                )}
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
};

export default ShowClass;
