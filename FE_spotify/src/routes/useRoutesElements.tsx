import { useRoutes } from "react-router-dom";
import HomePage from "../modules/UserModule/homePageLayout/HomePage";
import UserLayout from "../layouts/UserLayout";
import DetailArtists from "../modules/UserModule/detailArtists/DetailArtists";
import Playlist from "../modules/UserModule/playList/Playlist";
import Genre from "../modules/UserModule/genre/Genre";
import GenreAndSong from "../modules/UserModule/genreAndSong/GenreAndSong";

const useRoutesElements = () => {
    const element = useRoutes([
        {
            path: '',
            element: <UserLayout />,
            children: [
                {
                    path: '',
                    element: <HomePage />
                },
                {
                    path: 'detail-artists/:id',
                    element: <DetailArtists />
                },
                {
                    path: 'play-list/:id',
                    element: <Playlist />
                },
                {
                    path: 'genre',
                    element: <Genre/>
                },
                {
                    path: 'genre/:id',
                    element: <GenreAndSong/>
                }
            ]
        }
    ])
    return element
}
export default useRoutesElements

