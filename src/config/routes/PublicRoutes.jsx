import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../../pages/HomePage";

const PublicRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* redirect random routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default PublicRoutes;
