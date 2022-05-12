import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBSpinner,
} from "mdb-react-ui-kit";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../../shared/context/AuthContext";

const ShowClass = () => {
  const [classId, setClassId] = useState();

  const [classType, setClassType] = useState();

  const [file, setFile] = useState();

  const [studentsNames, setStudentsNames] = useState([]);

  const context = useContext(AuthContext);

  const teacherId = context.teacherId;

  const [fileUploaded, setFileUploaded] = useState();

  const [fileString, setFileString] = useState();

  useEffect(() => {
    if (!teacherId) {
      return;
    }

    //get class

    fetch(`${process.env.REACT_APP_API_URL}/getClass`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ teacherId: teacherId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setClassId(data.recentClassId);
          setClassType(data.recentClassType);
        }
      });

    //get students

    fetch(`${process.env.REACT_APP_API_URL}/getStudent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ classId: classId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.studentsNames.length !== 0) {
          setStudentsNames(data.studentsNames);
        }
      });
  }, [teacherId, classId]);

  const [loading, setLoading] = useState();

  const deleteClass = () => {
    //delete class

    fetch(`${process.env.REACT_APP_API_URL}/deleteClass`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ classId: classId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.classDeleted) {
          window.location.reload();
        }
      });
  };

  const onFileChange = (e) => {
    if (!e.target.files[0]) {
      return;
    }
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();

    fileReader.onload = () => {
      const fileUrl = fileReader.result;

      setFileString(fileUrl);
    };

    fileReader.readAsDataURL(file);
  }, [file]);

  const filePickHandler = (e) => {
    e.preventDefault();
    if (!fileString) {
      return;
    }

    setLoading(true);

    fetch(`${process.env.REACT_APP_API_URL}/uploadFile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fileString: fileString, classId: classId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.uploaded) {
          setLoading(false);
          setFileUploaded(true);
        } else {
          setFileUploaded(false);
        }
      });
  };

  return (
    <div>
      <MDBContainer className="mt-4">
        <MDBCard>
          <MDBCardBody>
            <MDBRow>
              <MDBCol>
                <p style={{ fontWeight: "bolder" }} className="h1 text-center">
                  {classType && `${classType}`}
                </p>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol>
                <p className="h5 mt-4 text-center">
                  {classId && `Class ID: ${classId}`}
                </p>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol>
                {classType ? (
                  <>
                    <MDBBtn
                      onClick={deleteClass}
                      className="mt-4"
                      style={{
                        backgroundColor: "#EC6226",
                        margin: "auto",
                        display: "flex",
                      }}
                    >
                      End class
                    </MDBBtn>

                    <MDBRow>
                      <MDBCol>
                        <MDBCard className="mt-4">
                          <MDBCardBody style={{ display: "grid" }}>
                            {studentsNames.length !== 0 ? (
                              <p
                                className="h3 text-center"
                                style={{ fontWeight: "bold" }}
                              >
                                {`Students joined: ${studentsNames.length}`}
                              </p>
                            ) : (
                              <div
                                className="h3 text-center"
                                style={{ fontWeight: "bold" }}
                              >
                                {`Students joined: 0`}
                                <React.Fragment>
                                  <p className="h1 text-center mt-4">
                                    --- No student ---
                                  </p>
                                </React.Fragment>
                              </div>
                            )}
                            {studentsNames.map((student, i) => (
                              <React.Fragment key={i}>
                                <p className="h4 mt-4">{student}</p>
                              </React.Fragment>
                            ))}
                          </MDBCardBody>
                        </MDBCard>
                      </MDBCol>
                      <MDBCol>
                        <MDBCard className="mt-4">
                          <MDBCardBody>
                            <p className="h3 text-center">
                              Upload study material
                            </p>
                            <form onSubmit={filePickHandler}>
                              <MDBRow className="mt-4">
                                <MDBCol>
                                  <MDBInput
                                    accept="video/mp4,video/mov,video/mkv,application/pdf"
                                    onChange={onFileChange}
                                    required
                                    type="file"
                                  />
                                </MDBCol>
                              </MDBRow>
                              {fileUploaded && (
                                <p
                                  style={{ color: "green" }}
                                  className="h6 mt-4 text-center"
                                >
                                  Uploaded !
                                </p>
                              )}
                              {loading && (
                                <div className="mt-4 text-center">
                                  <MDBSpinner />
                                </div>
                              )}

                              <MDBRow>
                                <MDBCol>
                                  <MDBBtn type="submit" block className="mt-4">
                                    Upload
                                  </MDBBtn>
                                </MDBCol>
                              </MDBRow>
                            </form>
                          </MDBCardBody>
                        </MDBCard>
                      </MDBCol>
                    </MDBRow>
                  </>
                ) : (
                  <p className="h1 text-center mb-4">
                    --- No ongoing class ---
                  </p>
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
