import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status:false,
  userData: null
}
const authSlice = createSlice({
  name:'auth',
  initialState,
  reducers :{
      login: (state, action) => {
        state.status = true;
        localStorage.setItem('token', JSON.stringify(true));
        if(action.payload && action.payload.data){
          localStorage.setItem('userInfo', JSON.stringify(action.payload.data));
          state.userData = action.payload.data;
        }
      },
      logout: (state) => {
        localStorage.removeItem('token');
        state.status = false;
        state.userData = null;
      },
      checkLogin: (state)=>{
        state.status=JSON.parse(localStorage.getItem("token"));
        let userInfo = localStorage.getItem("userInfo");
        if(userInfo !== null){
          state.userData = JSON.parse(userInfo);
        }
      }
  }
})

export const { login, logout, checkLogin } = authSlice.actions;
export default authSlice.reducer;