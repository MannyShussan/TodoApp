import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Todo } from "../../types/Todo";
import { useAppSelector } from "../../app/store";
import { Link } from "react-router-dom";

type Props = {
  todo: Todo;
};

export const CardTodo: React.FC<Props> = ({ todo }) => {
  const { mode } = useAppSelector((state) => state.theme);
  const color: string = todo.concluido
    ? "bg-cyan-900 text-cyan-200"
    : "bg-orange-900 text-orange-200";

  // Função para formatar a data
  const formatDate = (date?: Date) => {
    if (!date) return "Sem data";
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col h-full">
      {" "}
      {/* Container principal com altura total */}
      <div
        className={`m-5 flex-1 flex flex-col ${
          mode === "light" ? "bg-gray-100" : "bg-gray-900"
        } rounded-lg shadow-md overflow-hidden border-l-4 ${
          todo.concluido ? "border-cyan-500" : "border-orange-500"
        } hover:shadow-lg transition-shadow duration-300 w-full max-w-md`}
      >
        {/* Cabeçalho */}
        <div
          className={`p-4 border-b ${
            mode === "light" ? "border-gray-200" : "border-gray-700"
          } flex justify-between items-start`}
        >
          <div className="flex items-center space-x-3">
            <h3
              className={`text-lg font-semibold ${
                mode === "light" ? "text-gray-800" : "text-white"
              }`}
            >
              {todo.titulo}
            </h3>
          </div>

          <span className={`px-2 py-1 ml-4 text-xs rounded-full ${color}`}>
            {todo.concluido ? "Concluído" : "Pendente"}
          </span>
        </div>

        {/* Corpo (descrição) - Cresce para ocupar espaço disponível */}
        <div className="p-4 flex-1">
          <p
            className={`${
              mode === "light" ? "text-gray-600" : "text-gray-300"
            } mb-4`}
          >
            {todo.descricao}
          </p>
        </div>

        {/* Rodapé - Fica sempre na base */}
        <div
          className={`${
            mode === "light" ? "bg-gray-200" : "bg-gray-700"
          } px-4 py-3 flex justify-between items-center`}
        >
          <div
            className={`text-xs ${
              mode === "light" ? "text-gray-500" : "text-gray-400"
            }`}
          >
            Atualizado em: {formatDate(todo.updatedAt)}
          </div>

          <div className="flex space-x-2">
            <Link
              to={`/editar/${todo.id}`}
              className={`p-2 ${
                mode === "light"
                  ? "text-gray-500 hover:text-cyan-500 hover:bg-gray-300"
                  : "text-gray-200 hover:text-cyan-400 hover:bg-gray-600"
              } transition-colors rounded-full`}
            >
              <PencilIcon className="h-5 w-5" />
            </Link>
            <Link
              to={`/apagar/${todo.id}`}
              className={`p-2 ${
                mode === "light"
                  ? "text-gray-500 hover:text-red-500 hover:bg-gray-300"
                  : "text-gray-200 hover:text-red-400 hover:bg-gray-600"
              } transition-colors rounded-full`}
            >
              <TrashIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
