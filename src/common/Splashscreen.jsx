import logo from '../assets/images/icon_logo.png';

const SplashScreen = () => {
  return (
    <div className='container-splashscreen'>
      <img src={logo} alt="Logo Movie App" className='logo-splashscreen'/>
      <h1 className='title-splashscreen'>Ronald Movie App</h1>
      <p className='tagline-splashscreen'>Discover your next favorite film 🎬</p>
    </div>
  );
};

export default SplashScreen;
