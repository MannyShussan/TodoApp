import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/home";
import { EditPage } from "./pages/edit";
import { DeletePage } from "./pages/delete/DeletePage";

export const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/novo" element={<EditPage />} />
      <Route path="/editar/:id" element={<EditPage />} />
      <Route path="/apagar/:id" element={<DeletePage />} />
    </Routes>
  );
};
