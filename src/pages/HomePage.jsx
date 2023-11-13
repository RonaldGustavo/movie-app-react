import DataMovie from "../features/movies/components/DataMovie";
import HeaderMovie from "../features/movies/components/Header";

const HomePage = () => {
  return (
    <div className="container-box">
      <div
        className="container"
        style={{
          padding: "0px",
          background: "linear-gradient(to bottom right, #5079b8, #051d3e)",
          boxShadow: "2px 4px 4px 0px rgba(0, 0, 0, 0.3)",
        }}
      >
        <HeaderMovie />
        <div className="container-fluid" style={{ minHeight: "100vh" }}>
          <br />
          <br />
          <br />
          <DataMovie />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
