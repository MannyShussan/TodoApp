import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/store";
import {
  MoonIcon,
  PlusIcon,
  SunIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import { toggleTheme } from "../../features/theme/themeSlice";
import { useAppDispatch } from "../../app/hooks";

export const NavBar = () => {
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector((state) => state.theme);

  return (
    <nav
      className={`sticky top-0 z-10 ${
        mode === "light" ? "bg-white shadow-sm" : "bg-gray-800 shadow-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo/Link inicial */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              to="/"
              className={`text-xl font-bold ${
                mode === "light" ? "text-gray-900" : "text-white"
              }`}
            >
              TodoApp
            </Link>
          </div>

          {/* Botões de ação */}
          <div className="flex items-center space-x-4">
            {/* Link Home */}
            <Link
              to="/"
              className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                mode === "light"
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-gray-300 hover:bg-gray-700"
              } transition-colors`}
            >
              <HomeIcon className="h-4 w-4 mr-1" />
              Home
            </Link>

            {/* Botão Novo Todo */}
            <Link
              to="/novo"
              className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                mode === "light"
                  ? "bg-cyan-600 text-white hover:bg-cyan-700"
                  : "bg-cyan-500 text-white hover:bg-cyan-600"
              } transition-colors`}
            >
              <PlusIcon className="h-4 w-4 mr-1" />
              Novo Todo
            </Link>

            {/* Botão Alternar Tema */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className={`p-2 rounded-full focus:outline-none ${
                mode === "light"
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-yellow-300 hover:bg-gray-700"
              }`}
              aria-label="Alternar tema"
            >
              {mode === "light" ? (
                <MoonIcon className="h-6 w-6" />
              ) : (
                <SunIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
