import { toast } from "react-toastify";
import Form from "../Form";
import { useDispatch } from "react-redux";
import { login } from "../Store/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const fields = [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter email address',
      classes: 'mb-4',
      pattern: "[a-z]+",
      rules: {
        required: 'Email is required',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          message: 'Invalid email address',
        },
      },
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
      placeholder: 'Enter a password',
      rules: {
        required: 'Password is required',
        minLength: {
          value: 8,
          message: "Password must have at least 8 characters"
        },
        pattern: {
          value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          message: 'Password must contain at least 8 characters, one uppercase letter, one digit, and one special character'
        }
      },
      classes: 'mb-4',
    },
  ]
  const notify = (message) => toast(message);
const dispatch = useDispatch();
const navigate = useNavigate()
  const handelLogin = (data) => {
    let userList = JSON.parse(localStorage.getItem('users'));
    let userData =  userList.find(f => f.email.toLowerCase() === data.email.toLowerCase());
    if(userData){
      if(userData.password == data.password){
        dispatch(login({data:userData}))
        console.log('userData -->',{data: userData});
        navigate('/')
      }else{
        notify('Wrong password')
      }
    }else{
      notify('User not found')
    }
    console.log(data);
  }
  return (
    <div>
      <h1 className="text-center text-3xl font-bold">Login</h1>
      <Form
        onSubmit={handelLogin}
        fields={fields}
      /></div>
  )
}
