import { useDispatch } from 'react-redux';
import { doLogin } from '../features/authenticationSlice';

const Login = () => {

  const dispatch = useDispatch();

  const handleClick = e => {
    dispatch(doLogin());
  };

  return (
    <div>
      <button onClick={handleClick}>Click me to login</button>
    </div>
  );
};

export default Login;