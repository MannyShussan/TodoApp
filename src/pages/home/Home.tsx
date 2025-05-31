import { CardTodo } from "../../components/Card";
import { useTodos } from "../../hooks/useTodo";

export const HomePage = () => {
  const { todos } = useTodos();

  return (
    <div className="container mx-auto px-4 py-8">
      {todos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500 dark:text-gray-400">
            Nenhuma tarefa cadastrada ainda.
          </p>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Clique em "Novo Todo" para começar!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {todos.map((todo) => (
            <CardTodo key={todo.id} todo={todo} />
          ))}
        </div>
      )}
    </div>
  );
};
