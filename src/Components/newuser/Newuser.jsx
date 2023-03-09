import { useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import api from "../../customApi"
function Newuser () {
  const url = api.defaults.baseURL
  // const [file, setFile] = useState("");
  const [newUser, setNewuser] = useState([]);

  const Navigate = useNavigate();
  const options = [
    {
      id: 1,
      label: "إختر",
      value: "إختر",
    },
    {
      id: 2,
      label: "العالمية",
      value: "العالمية",
    },
    {
      id: 3,
      label: "الحرمين",
      value: "الحرمين",
    },
    {
      id: 4,
      label: "إيواء",
      value: "إيواء",
    },
  ];
  const options1 = [
    {
      id: 1,
      label: "إختر",
      value: "إختر",
    },
    {
      id: 2,
      label: "أدمن",
      value: "أدمن",
    },
    {
      id: 3,
      label: "مستخدم",
      value: "مستخدم",
    },
  ];
  const validationSchema = yup.object().shape({
    emp_no: yup.number().required("أدخل الرقم الوظيفي"),
    house: yup.string().required("أدخل الإسم "),
    username: yup.string().required("أدخل الإسم "),
    email: yup.string().required("أدخل الإيميل "),
    password: yup.string().required("أدخل كلمة المرور "),
    roles: yup.string().required("إختر نوع الصلاحية"),
  });

  const initalValues = {
    emp_no: "",
    house: "",
    username: "",
    email: "",
    password: "",
    roles: "",
  };

  const onSubmit = (data, onSubmitProps) => {
    axios
      .post(
        `${url}/users/new`,
        data
      )
      .then((response) => {
        setNewuser(response.data);
        onSubmitProps.resetForm();
        Swal.fire({
          position: "center",
          icon: "success",
          customClass: "swal-wide",
          title: "تم إنشاء مستخدم بنجاح",
          showConfirmButton: false,
          timer: 1700,
        });
        Navigate("/dashboard/users");
        Window.location.reload();
      })
      .catch((error) => {
        if (error.response.status === 409) {
          Swal.fire({
            position: "center",
            icon: "error",
            customClass: "swal-wide",
            title: "إسم المستخدم مسجل بالفعل يرجي أختيار إسم أخر",
            showConfirmButton: true,
            timer: 2700,
          });
          console.log(error.response.data);
          console.log(error.response.status);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
  };

  return (
    <>
    <div className="new" style={{marginTop:"0"}}>
      <div className="newContainer">
        <div className="top">
          <h1>بيانات المستخدم</h1>
        </div>
        <Formik
          initialValues={initalValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <div style={{display:"flex"}}>
              <div className="left">
                <div className="formInput" style={{width:"100%"}}>
                  <label htmlFor="emp_no">الرقم الوظيفي</label>
                  <ErrorMessage name="emp_no" component="span" />
                  <Field
                    className="formInput"
                    type="number"
                    id="emp_no"
                    name="emp_no"
                    placeholder=""
                  />
                </div>
                <div className="formInput"style={{width:"100%"}}>
                  <label htmlFor="house">السكن :</label>
                  <ErrorMessage name="house" component="span" />
                  <Field as="select" id="house" name="house">
                    <option disabled value="إختر"></option>
                    {options.map((option) => (
                      <option key={option.id} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field>
                </div>
                <div className="formInput"style={{width:"100%"}}>
                  <label htmlFor="username">الإسم</label>
                  <ErrorMessage name="username" component="span" />
                  <Field
                    autoComplete="off"
                    className="formInput"
                    type="text"
                    id="username"
                    name="username"
                    placeholder=""
                    />
                </div>
                </div>
                <div className="left">
                <div className="formInput"style={{width:"100%"}}>
                  <label htmlFor="email">إيميل </label>
                  <ErrorMessage name="email" component="span" />
                  <Field
                    className="formInput"
                    type="email"
                    id="email"
                    name="email"
                    placeholder=""
                    />
                </div>
                <div className="formInput"style={{width:"100%"}}>
                  <label htmlFor="password">كلمة المرور </label>
                  <ErrorMessage name="password" component="span" />
                  <Field
                    autoComplete="off"
                    className="formInput"
                    type="password"
                    id="password"
                    name="password"
                    placeholder=""
                    />
                </div>
                <div className="formInput"style={{width:"100%"}}>
                  <label htmlFor="roles">الصلاحية</label>
                  <ErrorMessage name="roles" component="span" />
                  <Field as="select" id="roles" name="roles">
                    <option disabled value="إختر"></option>
                    {options1.map((option) => (
                      <option key={option.id} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field>
                </div>
                
              </div>
              </div>
              <div className="btn">
                <button
                  type="submit"
                  className="btn btn-danger"
                  style={{ marginTop: "20px"}}
                  >
                  إنشاء
                </button>
              </div>
          </Form>
        </Formik>
      </div>
        </div>
      
        </>
  );
};

export default Newuser;
