import { toast } from "react-toastify";
import Form from "../Form";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const fields = [
    {
      name: 'fName',
      label: 'First name',
      classes: 'mb-4',
      placeholder:'Enter first name',
      rules: { required: 'Name is required' }
    },
    {
      name: 'lName',
      label: 'Last name',
      placeholder:'Enter last name',
      classes: 'mb-4',
      rules: { required: 'Name is required' }
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder:'Enter email address',
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
    {
      label: 'Confirm Password',
      name: 'confirm_password',
      type: 'password',
      placeholder: 'Enter a confirm password',
      rules: {
        required: 'Confirm password is required',
      },
      classes: 'mb-4',
    }
  ]
const navigate = useNavigate();
  const notify = (message) => toast(message);
  const handelRegister = (data) =>{
    let userList = localStorage.getItem('users'); 
    if(userList) {
      let usersList = JSON.parse(userList);
      const userExists = usersList.findIndex((u) => u.email.toLowerCase() == data.email.toLowerCase());
      console.log(userExists);
      if(userExists == -1){
        console.log('usersList',usersList);
        usersList.push(data);
        localStorage.setItem('users',JSON.stringify(usersList));
        notify("User created successfully");
        navigate('/login')
      }else{
        notify("User already exist");
      }
    }
    console.log(data);
  }
  return (
    <div>
      <h1 className="text-center text-3xl font-bold">Register</h1>
      <Form
      onSubmit={handelRegister}
        fields={fields}
      />
    </div>
  );
};

export default Register;
