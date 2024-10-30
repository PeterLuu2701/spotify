import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./genre.css";
import { useAppSelector } from "../../../redux/hooks";
import { AppDispatch } from "../../../redux/store";
import { fetchAndSetSongGenre } from "../../../apis/apiGetSongGenre";
import { TypeGenre } from "../../../types/typeGenre";
import { useNavigate } from "react-router-dom";

export default function Genre() {
  const dispatch = useDispatch<AppDispatch>();
  const { songGenre } = useAppSelector((state) => state.song);
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchAndSetSongGenre());
  }, [dispatch]);

const renderGenre = () => {
    return songGenre?.map((genre: TypeGenre, index: number) => (
      <div
        key={genre.genreId}
        className={`genre-box color-${index % 10}`}
        onClick={() => navigate(`/genre/${genre.genreId}`)}
      >
        {genre.nameGenre}
      </div>
    ));
  };

  return (
    <div className="genre-page">
      <h1 className="genre-title">Genres All</h1>
      <div className="genre-grid">
        {renderGenre()}
      </div>
    </div>
  );
}
