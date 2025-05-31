import { useEffect, useState } from "react";
import { CheckIcon } from "@heroicons/react/24/solid";
import { useAppSelector } from "../../app/store";
import { useParams, useNavigate } from "react-router-dom"; // Adicionei useNavigate
import { useTodos } from "../../hooks/useTodo";
import { Todo } from "../../types/Todo";

export const FormTodo = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate(); // Hook para navegação
  const { mode } = useAppSelector((state) => state.theme);
  const { todos, addTodo, updateTodo } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false); // Estado para validar o formulário

  const themeClass = (mode: "light" | "dark") => {
    return mode === "light"
      ? `bg-white text-gray-800`
      : `bg-gray-900 text-gray-100`;
  };

  const [task, setTask] = useState<Todo>({
    id: "",
    titulo: "",
    descricao: "",
    concluido: false,
  });

  // Valida o formulário sempre que os campos mudam
  useEffect(() => {
    setIsFormValid(task.titulo.trim() !== "" && task.descricao?.trim() !== "");
  }, [task.titulo, task.descricao]);

  // Preenche o form se estiver editando
  useEffect(() => {
    if (id) {
      const todoToEdit = todos.find((todo) => todo.id === id);
      if (todoToEdit) {
        setTask(todoToEdit);
        setIsEditing(true);
        // Se estiver editando, o formulário começa válido
        setIsFormValid(true);
      }
    }
  }, [id, todos]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing) {
      updateTodo(task.id, {
        titulo: task.titulo,
        descricao: task.descricao,
        concluido: task.concluido,
        updatedAt: new Date(),
      });
    } else {
      addTodo({
        titulo: task.titulo,
        descricao: task.descricao,
      });
    }

    // Redireciona para a página inicial após submit
    navigate("/");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`max-w-md mx-auto p-6 rounded-lg p-4 mb-4 rounded-md shadow-md ${themeClass(
        mode
      )}`}
    >
      <h2 className={`text-xl font-semibold mb-4 ${themeClass(mode)}`}>
        {isEditing ? "Editar Tarefa" : "Adicionar Nova Tarefa"}
      </h2>

      <div className="mb-4">
        <label htmlFor="titulo" className="block text-sm font-medium mb-1">
          Título*
        </label>
        <input
          type="text"
          id="titulo"
          value={task.titulo}
          onChange={(e) => setTask({ ...task, titulo: e.target.value })}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            mode === "light"
              ? `bg-white text-gray-800 border-gray-300`
              : `bg-gray-800 text-gray-100 border-gray-700`
          }`}
          placeholder="Digite o título da tarefa"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="descricao" className="block text-sm font-medium mb-1">
          Descrição*
        </label>
        <textarea
          id="descricao"
          value={task.descricao}
          onChange={(e) => setTask({ ...task, descricao: e.target.value })}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            mode === "light"
              ? `bg-white text-gray-800 border-gray-300`
              : `bg-gray-800 text-gray-100 border-gray-700`
          }`}
          placeholder="Detalhes da tarefa"
          rows={3}
          required
        />
      </div>

      {isEditing && (
        <div className="flex items-center mb-6">
          <div className="relative">
            <input
              type="checkbox"
              id="concluido"
              checked={task.concluido}
              onChange={(e) =>
                setTask({ ...task, concluido: e.target.checked })
              }
              className="opacity-0 absolute h-5 w-5"
            />
            <div
              className={`flex items-center justify-center h-5 w-5 border rounded ${
                task.concluido
                  ? "bg-cyan-500 border-cyan-500"
                  : mode === "light"
                  ? "border-gray-300"
                  : "border-gray-700"
              }`}
            >
              {task.concluido && <CheckIcon className="h-4 w-4 text-white" />}
            </div>
          </div>
          <label htmlFor="concluido" className="ml-2 text-sm font-medium">
            Tarefa concluída
          </label>
        </div>
      )}

      <div className="flex space-x-4">
        <button
          type="submit"
          disabled={!isFormValid} // Desabilita se o formulário não for válido
          className={`w-full ${
            isFormValid
              ? "bg-cyan-600 hover:bg-cyan-700"
              : "bg-cyan-400 cursor-not-allowed"
          } text-white font-medium py-2 px-4 rounded-md transition duration-200`}
        >
          {isEditing ? "Atualizar Tarefa" : "Adicionar Tarefa"}
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)} // Volta para a página anterior
          className="w-full bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition duration-200"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};
