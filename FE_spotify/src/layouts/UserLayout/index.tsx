import Header from "./_header/Header";
import Footer from "./_footer/Footer";
import { Outlet } from "react-router-dom";
import Sidebar from "./_sidebar/Sidebar";
import PlayMusic from "../../modules/UserModule/playMusic/PlayMusic";
import { ModalProvider } from "../../globalContext/ModalContext";
import ListFriend from "../../modules/UserModule/listFriend/ListFriend";
export default function UserLayout() {
  return (
    <div>
      <div className="container mx-auto flex">
        <ModalProvider>
          <div style={{ width: "20%" }}>
            <Sidebar />
          </div>
          <div style={{ width: "80%" }}>
            <div className="mb-28">
              <Header />
            </div>
            <div>

            <Outlet />
            <div>{PlayMusic()}</div>
            </div>
            <Footer />
          </div>
          <div className="list-friend fixed bottom-12 right-10">
            <ListFriend />
          </div>
        </ModalProvider>
      </div>
    </div>
  );
}
