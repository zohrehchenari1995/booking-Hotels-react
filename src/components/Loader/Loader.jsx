import { LoaderIcon } from "react-hot-toast";

function Loader() {
  return (
    <div className="container-header"
      style={{
        color: "var(--primary-600)",
        display: "flex",
        alignItems: "center",
        justifyContent:"center",
        gap: "1rem",
        margin: "1rem auto",
        fontWeight:"bold",
        fontSize:"1.5rem"
      }}
    >
      <p> Loading Data...</p>
      <LoaderIcon style={{ width: "1.3rem", height: "1.3rem"}} />
    </div>
  );
}

export default Loader;
