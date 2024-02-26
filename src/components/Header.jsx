import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { logout } from "./Store/authSlice";


export default function Header() {

  const navigate = useNavigate();
  const location = useLocation();
  const authState = useSelector((state) => {
    return state.auth.status
  })
  const userData = useSelector((state)=>{
    console.log(state.auth.userData)
    return state.auth.userData
  })
  const dispatch = useDispatch();
  const goTo = (val) => {
    navigate(val)
    console.log(val);
  }

  const logoutCall = () =>{
    dispatch(logout())
    goTo('/login')
  }
  return (
    <div className="flex min-h-20 bg-slate-50 justify-between items-center px-2">
      <h1 className="font-bold text-xl text-indigo-600">{userData?.fName ? `${userData.fName} ${userData.lName}` : 'Header'}</h1>

      {authState &&  <div className="">
        <NavLink to={'/'} className="p-2 lg:px-4 md:mx-2 link rounded [&.active]:bg-indigo-600 [&.active]:text-white" >Home</NavLink>
        <NavLink to={'/products'} className="p-2 lg:px-4 md:mx-2 rounded [&.active]:bg-indigo-600 [&.active]:text-white">Products</NavLink>
      </div>}
      <div>
      {authState ?
        <Button className={`mr-3 bg-red-600 text-white`} onClick={() => logoutCall()}>Logout</Button>
      : 
       <>
        <Button className={`mx-3 ${(location && location.pathname === '/login') ? 'bg-blue-600 text-white' : 'bg-transparent text-blue-600'}`} onClick={() => goTo('/login')}>Login</Button>
        <Button className={`mr-3 ${(location && location.pathname === '/register') ? 'bg-blue-600 text-white' : 'bg-transparent text-blue-600'}`} onClick={() => goTo('/register')}>Register</Button>
      </>
      }
      </div>
    </div>
  )
}
