import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [userLogin, results] = useLoginUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

const handleSignUp = ()=>{
  navigate('/signup')
}
  useEffect(() => {
    if (results.isSuccess && results.data && results.data.token) {
      navigate("/profile");
    }
  }, [results, navigate]);

  const submitLogInForm = async (data) => {
    await userLogin(data);
  };

  return (
    <div className="columns is-vcentered">
      <div className="column is-one-quarter"></div>

      <div className="column  is-half is-primary">
        <div className="message is-info is-medium">
          <div className="message-header">
            <p>User Login</p>
          </div>
          <div className="message-body">
            <form onSubmit={handleSubmit(submitLogInForm)}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <br />
                <input
                  type="text"
                  className="form-input"
                  {...register("username", { required: true })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <br />
                <input
                  type="password"
                  className="form-input"
                  {...register("password", { required: true })}
                />
              </div>
              <div className="form-group">
                <br />
                <button
                  type="submit"
                  className="button is-info "
                  disabled={results.isLoading}
                >
                  {results.isLoading ? "Trying to Log in" : "Login"}
                </button>
              </div>
            </form>
            {results && (results.data || results.isError) && (
              <div className="has-text-danger-dark">{results.data.message}</div>
            )}
            <div>
              <br/>
            <button className="button is-primary" onClick={handleSignUp} >Create New Account</button>

            </div>
          </div>
          
        </div>
      </div>
      <div className="column is-one-quarter"></div>
    </div>
  );
};

export default Login;
