import {useState, useEffect} from 'react';
import '../App.css'

//react-icons-kit
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'

const DynamicForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [errors, setErrors] = useState({});
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const isFormComplete = () => {
          return (
            formData.name.trim() !== '' &&
            formData.email.trim() !== '' &&
            formData.password.trim() !== '' &&
            formData.confirmPassword.trim() !== ''
          );
        };
        setIsFormValid(isFormComplete());
      }, [formData]);

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setFormData({
            ...formData, [name] : value
        })
    }

    const handleToggle = () => {
        if (type==='password'){
           setIcon(eye);
           setType('text')
        } else {
           setIcon(eyeOff)
           setType('password')
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        const validateForm = {}
        if (!formData.name.trim()){
            validateForm.name = "Your name is required, at least 3 characters";
        }
        if (!formData.email.trim()) {
            validateForm.email = "Your email is required";
          } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            validateForm.email = "Your email must be at least 8 characters long, contain at least one digit, and be in a valid email format";
          }
        if (!formData.password.trim()){
            validateForm.password = "Your password is required";
        }else if(formData.password.length < 8 || !/^(?=.*[0-9])/.test(formData.password)){
            validateForm.password = "Your password must contain at least 8 characters and a number"
        }
        if (formData.confirmPassword !== formData.password) {
            validateForm.confirmPassword = "Passwords must match"
        }
        setErrors(validateForm)
        if (Object.keys(validateForm).length  === 0) {
            alert("Form submitted succesfully")
        }
    }
  return (
    <div> 

        <form className="form"  onSubmit={handleSubmit}>
            <div>
                <h2>Create Account</h2>
            </div>
        <div className="formDiv">
        <label htmlFor="name">Name</label>
        <input 
            type="text" 
            name="name" 
            id="name" 
            placeholder="Your name" 
            onChange={handleChange} 
            autoComplete='username'
        />
        {errors.name && <span>{errors.name}</span>}
        </div>
        <div className="formDiv">
        <label htmlFor="email">Email</label>
        <input 
            type="email" 
            name="email" 
            id="email"  
            placeholder="example@email.com"
            onChange={handleChange}
            autoComplete='username'
        />
        {errors.email && <span>{errors.email}</span>}
        </div>
        <div className="formDiv">
        <label htmlFor="password">Password</label>
        <input 
            type={type} 
            name="password" 
            id="password" 
            placeholder="********"
            onChange={handleChange}
            autoComplete="new-password"
        />
        <span className="icon_span" onClick={handleToggle}>
            <Icon  className="eyeIcon" icon={icon} size={25}/>    
        </span>
        {errors.password && <span>{errors.password}</span>}
        </div>
        <div className="formDiv">
        <label htmlFor="password">Confirm Password</label>
        <input 
            type="password" 
            name="confirmPassword" 
            id="confirmPassword" 
            placeholder="********"
            onChange={handleChange}
            autoComplete="new-password"
        />
        {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
        </div>
        <div className="btn">
            <button type="submit" className="btn" disabled={!isFormValid}>Submit</button>
        </div>
    </form>
  </div>
  )
}

export default DynamicForm