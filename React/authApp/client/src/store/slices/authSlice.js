import { createSlice } from "@reduxjs/toolkit";
import { userApi } from "../apis/userApi";

const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null;
  const userInfo = localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')):{};
const authSlice = createSlice({
    name:"auth",
    initialState:{
        userInfo,
        userToken,
        isLogedIn:false
    },
    reducers:{
       
    },
    extraReducers:(builder)=>{
        builder.addMatcher(userApi.endpoints.loginUser.matchFulfilled, (state, action)=>{
            localStorage.setItem("userToken", action.payload.token);
            localStorage.setItem("userInfo", JSON.stringify(action.payload.data));
            state.userInfo = action.payload.data;
            state.userToken = action.payload.token;
            state.isLogedIn = true;
        });
        builder.addMatcher(userApi.endpoints.updateUser.matchFulfilled,(state, action)=>{
            // console.log(action)
            let userInfo = {...state.userInfo, ...action.payload.data}
            localStorage.setItem("userInfo",JSON.stringify(userInfo));
            state.userInfo =userInfo;
            state.isLogedIn = true;
        });

        builder.addMatcher(userApi.endpoints.logoutUser.matchFulfilled,(state, action)=>{
            state.userInfo ={};
            state.userToken= null;
            localStorage.removeItem("userToken");
            localStorage.removeItem("userInfo");
            state.isLogedIn = false;
        });
    }
});

export const {logUser} = authSlice.actions;;
export const authReducer = authSlice.reducer;