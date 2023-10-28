import './SignUp.css';
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="SignUp">
        <div className="SignUp-Title">Create an account</div>
        <div className="SignUp-FormBackground">
            <form className="SignUp-Form">
                <label for="email">Email</label>
                <input type="text" id="email" name="email"></input>
                <label for="username">Username</label>
                <input type="text" id="username" name="username"></input>
                <label for="password">Password</label>
                <input type="text" id="password" name="password"></input>
                <input type="button" value="Sign up"></input>
                <p>You already have an account? <Link to="/">Log in</Link></p>
            </form>

        </div>

    </div>
  );
}

export default SignUp;
