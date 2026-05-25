import DataMovie from '../features/movies/components/DataMovie';
import HeaderMovie from '../features/movies/components/Header';

const HomePage = () => {
  return (
    <div className="container-box">
      <HeaderMovie />
      <div className="container-fluid px-3 px-md-4 px-lg-5">
        <DataMovie />
      </div>
    </div>
  );
};

export default HomePage;
