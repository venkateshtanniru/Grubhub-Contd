import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import logo from '../../images/login-page.jpg'
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import rootUrl from '../config/settings';
import { loginuser } from '../../actions'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address format")
        .required("Email is required"),
    password: Yup.string()
        .required("Password is required")
});

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            authFlag: 'false'
        };

        // this.submitLogin = this.submitLogin.bind(this);
    }
    componentDidMount () {
        this.setState({
          authFlag: false,
          authFailed: false
        })
    }

    onsubmit = (formValues) => {
        console.log('OnSubmit' + formValues)
        let data = {
            userEmail: formValues.email,
            userPassword: formValues.password
        }
        axios.defaults.withCredentials = true
        this.props.loginuser(data, res => {
          if (res.status === 200) {
            console.log('Inside response',res.data);
            this.setState({
              authFlag:true
            })
            localStorage.setItem("accountType", res.data.accountType)
            localStorage.setItem("userName", res.data.userName)
            localStorage.setItem("userEmail", res.data.userEmail)
          } else {
            alert('Please enter valid credentials')
          }
        })
      }

    render() {
        // console.log("test cookie",cookie.load('username-localhost-8888'))
        let redirectVar = null;
        if (localStorage.getItem("accountType")!=null) {
            // if(this.state.authFlag===true){

            if (localStorage.getItem("accountType") === "2") {
                redirectVar = <Redirect to="/ownerhome" />
            }
            else if (localStorage.getItem("accountType") === "1") {
                console.log('user logged in')
                redirectVar = <Redirect to="/userhome" />
            }
        }
        return (
            <div className="container-fluid">
                {redirectVar}
                <div className="row align-items-center h-100 ">
                    <div className="col-md-6-fluid">
                        <img src={logo} alt="" className="img-responsive fit-image" />
                    </div>
                    <div className="col-md-4 mx-auto">
                        <div className="card shadow p-3 mb-5 rounded">
                            <div className="card-body text-left" >
                                <h4 className="text-black text-left font-weight-bold">Sign in with your Grubhub <br />account</h4>
                                <br />
                                
                                <Formik
                                    initialValues={this.state}
                                    validationSchema={LoginSchema}
                                    onSubmit={(values, actions) => {
                                        this.onsubmit(values)
                                        actions.setSubmitting(false);
                                    }}
                                >
                                    {/* <form
                                    className='ui form error'
                                    onSubmit={this.props.handleSubmit(this.onSubmit)}

                                > */}
                                    {({ touched, errors, isSubmitting }) => (
                                        <Form>
                                            <div className="form-group text-left">
                                                <label htmlFor="email">Email</label>
                                                <Field
                                                    type="email"
                                                    name="email"
                                                    // autofocus="true"
                                                    className={`form-control ${
                                                        touched.email && errors.email ? "is-invalid" : ""
                                                        }`}
                                                />
                                                <ErrorMessage
                                                    component="div"
                                                    name="email"
                                                    align="text-left"
                                                    className="invalid-feedback"
                                                />
                                            </div>

                                            <div className="form-group text-left">
                                                <label htmlFor="password">Password</label>
                                                <Field
                                                    type="password"
                                                    name="password"
                                                    className={`form-control ${
                                                        touched.password && errors.password ? "is-invalid" : ""
                                                        }`}
                                                />
                                                <ErrorMessage
                                                    component="div"
                                                    name="password"
                                                    className="invalid-feedback"
                                                />
                                            </div>
                                            <br />
                                            <button
                                                type="submit"
                                                // id="signin"
                                                className="btn btn-danger btn-block text-white font-weight-bold"
                                            // disabled={!isSubmitting}
                                            >
                                                {/* {isSubmitting ? "Please wait..." : "Sign in"} */}
                                                Sign in
                                                </button>
                                        </Form>
                                    )}
                                   {/* </form> */}

                                </Formik>
                                <br />
                                Don't have an account?&nbsp;&nbsp;<Link to="/customersignup">Create your customer account!</Link>
                                <br />
                                Want to partner with us?&nbsp;<Link to="/ownersignup">Create your owner account!</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


const validate = formValues => {
    const error = {}
    if (!formValues.email) {
      error.email = 'Enter a valid email'
    }
    if (!formValues.password) {
      error.password = 'Enter a valid Password'
    }
    return error
  }
  // export Login Component
  // const formWrapped= reduxForm({
  //   form: 'streamLogin',
  //   validate: validate
  // })(Login)
  
  // export default connect(null,{loginuser:loginuser})(formWrapped)
  const mapStateToProps = state => {
    return { user: state.user }
  }
  
  export default connect(
    mapStateToProps,
    { loginuser }
  )(
    reduxForm({
      form: 'streamLogin',
      validate: validate
    })(LoginForm)
  )