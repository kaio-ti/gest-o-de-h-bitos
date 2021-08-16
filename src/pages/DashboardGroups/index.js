import Header from "../../components/Header";
import { DashboardContainer } from "../../styles/mainContainers";
import SideMenu from "../../components/SideMenu";
import { DashboardMainBox } from "../DashboardMain/style";
import Footer from "../../components/Footer";
import { useState } from "react";
import { Drawer } from "@material-ui/core";
import DrawerMenu from "../../components/DrawerMenu";
import GroupCreatorPopup from "../../components/GroupCreator";

const DashboardGroups = () => {
  const [openModal, setOpenModal] = useState(false);

  const [showDrawer, setShowDrawer] = useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };
  return (
    <div>
      <Drawer
        anchor="left"
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
      >
        <DrawerMenu />
      </Drawer>
      <Header setShowDrawer={setShowDrawer} />
      <DashboardContainer>
        <SideMenu />
        <DashboardMainBox>
          <div className="mainHabits">Meus grupos</div>
          <div className="mainGroups">
            Criar grupo
            <button>Novo grupo</button>
          </div>
        </DashboardMainBox>
      </DashboardContainer>
      <Footer />
    </div>
  );
};

export default DashboardGroups;
