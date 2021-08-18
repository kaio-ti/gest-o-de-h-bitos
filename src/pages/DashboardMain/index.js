import SideMenu from "../../components/SideMenu";
import Header from "../../components/Header";
import { DashboardContainer } from "../../styles/mainContainers";
import { DashboardMainBox } from "./style";
import Footer from "../../components/Footer";
import { useHabits } from "../../Providers/habits";
import { useState } from "react";
import { Drawer } from "@material-ui/core";
import DrawerMenu from "../../components/DrawerMenu";
import { useContext } from "react";
import { GroupsContext } from "../../Providers/groups";
import { Redirect } from "react-router-dom";
import { useAuthentication } from "../../Providers/Authentication";

const DashboardMain = () => {
  const { habitsList, editHabit } = useHabits();
  const { groupsList } = useContext(GroupsContext);
  const [showDrawer, setShowDrawer] = useState(false);
  const { authenticated } = useAuthentication();

  if (!authenticated) {
    return <Redirect to="/login" />;
  }

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
          <div className="mainHabits">
            <h1 className="DashboardTitle">meus hábitos</h1>
            {habitsList.map((habits, index) => {
              return (
                <div className="habitsMinicard" key={index}>
                  <h1>{habits.title}</h1>
                  <button onClick={() => editHabit(habits)}>
                    concluir hábito
                  </button>
                </div>
              );
            })}
          </div>
          <div className="mainGroups">
            <h1 className="DashboardTitle">meus grupos</h1>
            {groupsList.map((group, index) => {
              return (
                <div className="groupsMinicard" key={index}>
                  <h1>{group.name}</h1>
                  <h3>Categoria: {group.category}</h3>
                </div>
              );
            })}
          </div>

        </DashboardMainBox>
      </DashboardContainer>
      <Footer />
    </div>
  );
};

export default DashboardMain;
