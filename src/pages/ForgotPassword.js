import React, { Fragment, useState, useEffect } from 'react';

import MetaData from '../components/layout/MetaData';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, clearErrors } from '../actions/userActions';


const ForgotPassword = () => {

  const [email, setEmail] = useState('');

  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, message, loading } = useSelector(state => state.forgotPassword);

  useEffect(() => {
    
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);
    }

  }, [dispatch, alert, error, message, loading]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('email', email);

    dispatch(forgotPassword(formData));
  }

  return (
    <Fragment>

      <div className="container container-fluid">
      <div className="row wrapper justify-content-center">
        <div className="col-10 col-lg-5 my-5">
          <form className="shadow-lg py-4 px-5" onSubmit={handleSubmit}>
            <h1 className="mb-3 h4">Forgot Password</h1>
            <p className="text-danger">Enter your login email for us to send your password token</p>
            <div className="form-group mt-3 mb-4">
              <label htmlFor="email_field">Enter Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              id="forgot_password_button"
              type="submit"
              className="btn btn-block btn-danger"
              disabled={ loading ? true : false }
            >
              Send Email
            </button>
          </form>
        </div>
      </div>
      </div>
    </Fragment>
  )
}

export default ForgotPassword
