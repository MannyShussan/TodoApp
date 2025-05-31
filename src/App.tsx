import "./App.css";
import { useAppSelector } from "./app/store";
import { NavBar } from "./components/NavBar/NavBar";
import { Root } from "./Root";

function App() {
  const { mode } = useAppSelector((state) => state.theme);

  return (
    <>
      <NavBar />
      <div
        className={`min-h-screen ${
          mode === "light"
            ? `bg-white text-gray-800`
            : `bg-gray-800 text-gray-100`
        }`}
      >
        <Root />
      </div>
    </>
  );
}

export default App;
