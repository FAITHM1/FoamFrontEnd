import Index from "../pages/Index";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
function Main(props) {
  //state
  const [foaming, setFoaming] = useState();
  //api url
  const URL = "http://127.0.0.1:4000/foam/";

  const getFoam = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setFoaming(data);
    // console.log();
  };

  const updateFoaming = async (foam, id) => {
    await fetch(URL + id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(foam),
    });
    getFoam();
  };

  useEffect(() => {
    getFoam();
  }, []);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<Index foaming={foaming} updateFoaming={updateFoaming} />}
        />
      </Routes>
    </div>
  );
}

export default Main;
