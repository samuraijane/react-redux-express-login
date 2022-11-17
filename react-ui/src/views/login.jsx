import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { verifyAuthentication } from '../features/authenticationSlice';

const Login = () => {
  const [creds, setCreds] = useState({});

  const dispatch = useDispatch();

  const handleChange = e => {
    const key = e.target.name;
    const value = e.target.value;
    const _creds = {...creds, [key]: value};
    setCreds(_creds);
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(verifyAuthentication(creds));
    setCreds({});
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input name='username' onChange={handleChange} placeholder='username' value={creds.username ?? ''} />
          <input name='password' onChange={handleChange} placeholder='password' type='password' value={creds.password ?? ''} />
        </div>
        <button>Click me to login</button>
      </form>
    </div>
  );
};

export default Login;