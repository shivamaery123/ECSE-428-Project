import './SignUp.css';

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

            </form>
                <input type="button" value="Sign up"></input>
                <p>You already have an account? <a href="random">Log in</a></p>
        </div>

    </div>
  );
}

export default SignUp;
