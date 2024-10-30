import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
type typeSongProps = {
  id: number;
  playlistId: number;
  songId: number;
};
interface GlobalContextType {
  idMusic: string | undefined;
  nameArtists: string | undefined;
  setIdMusic: Dispatch<SetStateAction<string | undefined>>;
  setNameArtists: Dispatch<SetStateAction<string | undefined>>;
  dataFuncSongEnd: Function | undefined;
  songProps: typeSongProps | undefined;
  handleSetSongProps: (data: typeSongProps) => void;
  funcSongEndProps: (data: any) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [idMusic, setIdMusic] = useState<string | undefined>(undefined);
  const [nameArtists, setNameArtists] = useState<string | undefined>(undefined);
  const [songProps, setSongProps] = useState<typeSongProps>();
  const [dataFuncSongEnd, setDataFuncSongEnd] = useState<Function>();
  const handleSetSongProps = (data: typeSongProps) => {
    setSongProps(data);
  };
  const funcSongEndProps = (data: any) => {
    setDataFuncSongEnd(data);
  };
  return (
    <GlobalContext.Provider
      value={{
        idMusic,
        setIdMusic,
        nameArtists,
        setNameArtists,
        songProps,
        handleSetSongProps,
        dataFuncSongEnd,
        funcSongEndProps,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
