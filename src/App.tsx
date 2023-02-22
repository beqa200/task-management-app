import { Helmet } from "react-helmet";
import { BlackScreen, GlobalStyle, theme } from "./styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createContext, useState } from "react";
import { Header } from "./components";
import data from "./data.json";
import Board from "./pages/Board";
import { ContextProps, Platform, Task } from "./vite-env";
import Add from "./pages/Add";
import BoardMenu from "./components/BoardMenu";


export const MyContext = createContext<ContextProps | null>(null);

function App() {
  //global states
  const [boards, setBoards] = useState<Platform[]>(data.boards)
  const [platform, setPlatform] = useState<string | undefined>(
    boards?.[0].name
  );
  const [boardMenu, setBoardMenu] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(true);
  const [isTaskDetails, setIsTaskDetails] = useState<boolean>(false);
  const [taskDetails, setTaskDetails] = useState<Task | undefined>();
  
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
      }}
    >
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <GlobalStyle isDark={isDark} />

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
