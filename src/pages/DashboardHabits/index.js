import Header from "../../components/Header";
import { DashboardContainer } from "../../styles/mainContainers";
import SideMenu from "../../components/SideMenu";
import { DashboardMainBox } from "../DashboardMain/style";
import Footer from "../../components/Footer";
import { useHabits } from "../../Providers/habits";
import HabitCard from "../../components/HabitCard";
import { Drawer } from "@material-ui/core";
import DrawerMenu from "../../components/DrawerMenu";
import { useState } from "react";
import HabitCreator from "../../components/HabitCreator";
import { Redirect } from "react-router-dom";
import { HabitsBox } from "./style";

const DashboardHabits = (authenticated) => {
  const { habitsList, addHabit } = useHabits();
  const [showDrawer, setShowDrawer] = useState(false);

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
          <HabitsBox>
            <h1 className="DashboardTitle">meus hábitos</h1>
            <HabitCreator />
            <div>
              {habitsList.map((habit) => {
                return <HabitCard key={habit.id} habit={habit} />;
              })}
            </div>
            <button onClick={addHabit}>Novo hábito</button>
          </HabitsBox>

          <div>Mais informações</div>
        </DashboardMainBox>
      </DashboardContainer>
      <Footer />
    </div>
  );
};

export default DashboardHabits;
