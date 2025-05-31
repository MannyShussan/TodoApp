// src/pages/DeleteTodoPage.tsx
import { useNavigate, useParams } from "react-router-dom";
import { TrashIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useTodos } from "../../hooks/useTodo";
import { useAppSelector } from "../../app/store";

export const DeletePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { mode } = useAppSelector((state) => state.theme);
  const { todos, deleteTodo } = useTodos();

  // Busca o Todo pelo ID
  const todo = todos.find((t) => t.id === id);

  const handleDelete = () => {
    if (id) {
      deleteTodo(id);
      navigate("/"); // Redireciona para a home após exclusão
    }
  };

  if (!todo) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          mode === "light" ? "bg-gray-50" : "bg-gray-900"
        }`}
      >
        <div
          className={`p-6 rounded-lg shadow-md ${
            mode === "light" ? "bg-white" : "bg-gray-800"
          }`}
        >
          <p className="text-lg">Tarefa não encontrada</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        mode === "light" ? "bg-gray-50" : "bg-gray-900"
      }`}
    >
      <div
        className={`w-full max-w-md p-6 rounded-lg shadow-md ${
          mode === "light" ? "bg-white" : "bg-gray-800"
        }`}
      >
        <div className="flex items-center mb-4">
          <button
            onClick={() => navigate(-1)}
            className={`p-2 rounded-full ${
              mode === "light" ? "hover:bg-gray-200" : "hover:bg-gray-700"
            }`}
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <h2
            className={`text-xl font-semibold ml-2 ${
              mode === "light" ? "text-gray-800" : "text-white"
            }`}
          >
            Confirmar Exclusão
          </h2>
        </div>

        <div className="mb-6">
          <p
            className={`mb-2 ${
              mode === "light" ? "text-gray-600" : "text-gray-300"
            }`}
          >
            Você está prestes a excluir a tarefa:
          </p>
          <p
            className={`font-semibold ${
              mode === "light" ? "text-gray-800" : "text-white"
            }`}
          >
            "{todo.titulo}"
          </p>
          {todo.descricao && (
            <p
              className={`mt-2 ${
                mode === "light" ? "text-gray-500" : "text-gray-400"
              }`}
            >
              {todo.descricao}
            </p>
          )}
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => navigate(-1)}
            className={`px-4 py-2 rounded-md ${
              mode === "light"
                ? "bg-gray-200 hover:bg-gray-300 text-gray-800"
                : "bg-gray-700 hover:bg-gray-600 text-white"
            }`}
          >
            Cancelar
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
          >
            <div className="flex items-center">
              <TrashIcon className="h-5 w-5 mr-2" />
              Confirmar Exclusão
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
