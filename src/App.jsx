import { Container } from "@mui/material";
import "./App.css";
import MainContent from "./components/MainContent";


function App() {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container maxWidth="xl">
           <MainContent/>
        </Container>
      </div>
    </>
  );
}

export default App;
