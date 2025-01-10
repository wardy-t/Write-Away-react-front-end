import './Landing.css';

const Landing = () => {
  return (
    //<main>
      //<h1>Write Away</h1>
      //<h3>
        //Welcome to our ESOL E-mail training tool! Please sign in.
      //</h3>
    //</main>
        <div className="home-container">
        <div className="home-rectangle">
          <div className="home-ellipse"></div>
          <div className="home-frame">
            <button
              className="home-button"
              onClick={() => (window.location.href = "/signin")}
            >
              Log In
            </button>
            <button
              className="home-button"
              onClick={() => (window.location.href = "/signup")}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
  );
};

export default Landing;
