import { Helmet } from "react-helmet";
import { BlackScreen, GlobalStyle, theme } from "./styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import { Header } from "./components";
import data from "./data.json";
import Board from "./pages/Board";
import { ContextProps, Platform, Task } from "./vite-env";
import Add from "./pages/Add";

export const MyContext = createContext<ContextProps | null>(null);

const COLORS = [
  "#49C4E5",
  "#8471F2",
  "#67E2AE",
  "#FF8C00",
  "#4B0082",
  "#FF1493",
  "#DAA520",
  "#00FA9A",
  "#FF6347",
  "#00BFFF",
  "#8B0000",
  "#6A5ACD",
  "#2E8B57",
  "#FFD700",
  "#F08080",
  "#778899",
  "#B22222",
  "#008080",
  "#FFA07A",
  "#FF00FF",
];

export { COLORS };

function App() {
  //global states
  const [boards, setBoards] = useState<Platform[]>(data.boards);

  const [platform, setPlatform] = useState<string | undefined>();

  const [boardMenu, setBoardMenu] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(true);
  const [isTaskDetails, setIsTaskDetails] = useState<boolean>(false);
  const [taskDetails, setTaskDetails] = useState<Task | undefined>();
  const [isAddTask, setIsAddTask] = useState<Boolean>(false);
  const [isEditTask, setIsEditTask] = useState<Boolean>(false);
  const [isTaskDelete, setIsTaskDelete] = useState<Boolean>(false);
  const [isBoardDelete, setIsBoardDelete] = useState<Boolean>(false);
  const [isNewBoard, setIsNewBoard] = useState<Boolean>(false);
  const [isEditBoard, setIsEditBoard] = useState<Boolean>(false);

  useEffect(() => {
    if (platform) {
      localStorage.setItem("platform", platform);
    } else {
      localStorage.setItem("platform", "");
    }
  }, [platform]);

  return (
    <MyContext.Provider
      value={{
        boards,
        setBoards,
        theme,
        platform,
        setPlatform,
        boardMenu,
        setBoardMenu,
        isDark,
        setIsDark,
        isTaskDetails,
        setIsTaskDetails,
        taskDetails,
        setTaskDetails,
        isAddTask,
        setIsAddTask,
        isEditTask,
        setIsEditTask,
        isTaskDelete,
        setIsTaskDelete,
        isBoardDelete,
        setIsBoardDelete,
        isNewBoard,
        setIsNewBoard,
        isEditBoard,
        setIsEditBoard,
      }}
    >
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <GlobalStyle
        isDark={isDark}
        boardMenu={boardMenu}
        isTaskDetails={isTaskDetails}
        isAddTask={isAddTask}
        isEditTask={isEditTask}
        isTaskDelete={isTaskDelete}
        isBoardDelete={isBoardDelete}
        isNewBoard={isNewBoard}
        isEditBoard={isEditBoard}
      />
      {(boardMenu ||
        isTaskDetails ||
        isAddTask ||
        isEditTask ||
        isTaskDelete ||
        isBoardDelete ||
        isNewBoard ||
        isEditBoard) && (
        <BlackScreen
          onClick={() => {
            setBoardMenu(false);
            setIsTaskDetails(false);
            setIsAddTask(false);
            setIsNewBoard(false);
          }}
        />
      )}
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/:platform" element={<Board />} />
          <Route path="/" element={<Add />} />
        </Routes>
      </BrowserRouter>
    </MyContext.Provider>
  );
}

export default App;
