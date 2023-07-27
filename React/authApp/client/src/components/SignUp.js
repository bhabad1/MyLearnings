import { useForm } from "react-hook-form";
import { useAddUserMutation, useUpdateUserMutation } from "../store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const SignUp = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    
    formState: { errors },

  } = useForm();

  const [addUser, results] = useAddUserMutation();
  const [updateUser, updateResults] = useUpdateUserMutation();
  // console.log(results);
  const navigate = useNavigate();

  useEffect(()=>{
    if(results.isSuccess ){
      navigate('/login')
    }
  }, [navigate, results])

  const {userInfo, userToken,isLogedIn }= useSelector(state=>state.auth);

  useEffect(()=>{
    if(userInfo){
      ["name", "username","mobile","email","password","address" ].map(field=>{
        setValue(field, userInfo[field]);
      });

    }
  },[userInfo]);

  useEffect(()=>{
    if(updateResults.isSuccess && updateResults.data){
    
      navigate('/profile')
    }
  },[updateResults,navigate]);


  const handleSignUpSubmit = (data) => {
    if(userToken){
      updateUser(data)
    }else{
      addUser(data);

    }

  };

  return (
    <div className="columns is-vcentered">
      <div className="column is-one-quarter"></div>
      <div className="column is-half is-primary">
        <div className="message is-info is-medium">
        <div className="message-header">
          <p>User Registration Form</p>
          </div>
          <div className="message-body">
            <form onSubmit={handleSubmit(handleSignUpSubmit)}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <br />
                <input
                  type="text"
                  className="form-input"
                  {...register("name", { required: true })}
                />
                {errors.name && <p>Name is required.</p>}
              </div>{" "}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <br />
                <input
                  type="email"
                  className="form-input"
                  {...register("email", { required: true })}
                />
                {errors.email && <p>Email is required.</p>}
              </div>
              <div className="form-group">
                <label htmlFor="mobile">Mobile</label>
                <br />
                <input
                  type="text"
                  className="form-input"
                  {...register("mobile", { required: true })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <br />
                <input
                  type="text"
                  className="form-input"
                  {...register("address")}
                />
              </div>
             <div className="form-group">
                <label htmlFor="username">Username</label>
                <br />
                <input 
                  type="text"
                  className="form-input"
                  {...register("username", { required: true,disabled:isLogedIn})}
                />
              </div>
               <div className="form-group">
                <label htmlFor="password">Password</label>
                <br />
                <input
                  type="password"
                  
                  className="form-input"
                  {...register("password", { required: true ,disabled :isLogedIn})}
                />
              </div> 
              <div className="form-group">
              <br />
              <button
                type="submit"
                className="button"
                disabled={results.isLoading}
              >
                {results.isLoading ? "Saving User Data" : (userToken ? "Update Profile":"Sign Up")}
              </button>
              </div>
           
              {(results.isError ||updateResults.isError) && (
                <div className="has-text-danger-dark	">
                 {userToken?"Error in profile updation" :"Error in user creation"}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
      <div className="column is-one-quarter"></div>
    </div>
  );
};

export default SignUp;
