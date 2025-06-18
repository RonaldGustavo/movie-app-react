import DataMovie from "../features/movies/components/DataMovie";
import HeaderMovie from "../features/movies/components/Header";

const HomePage = () => {
  return (
    <div className="container-box">
      <div
        className="container"
      >
        <HeaderMovie/>
        <div className="container-fluid min-vh-90">
          <DataMovie />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
