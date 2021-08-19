import jwtDecode from "jwt-decode";
import { useState, useEffect } from "react";
import api from "../../services/api";
import ActivityCard from "../ActivityCard";
import GoalCard from "../GoalCard";
import { GroupContainer } from "./style.js";
import { GrAddCircle } from "react-icons/gr";
import Modal from "../Modal";
import AddActivityModal from "../AddActivity";
import AddGoalModal from "../AddGoals";
import GroupEditorPopup from '../GroupEditor';

const GroupCard = ({ group }) => {
  const [name, setName] = useState(group.name)
  const [activitiesList, setActivitiesList] = useState([]);
  const [goalsList, setGoalsList] = useState([]);
  const [openActivty, setOpenActivity] = useState(false);
  const [openGoal, setOpenGoal] = useState(false);
  const [openGroupEditor, setOpenGroupEditor] = useState(false);
  const userID = jwtDecode(
    JSON.parse(localStorage.getItem('@gestaohabitosg5:token'))
  ).user_id
  const groupID = group.creator.id;

  const handleOpenActivity = () => {
    setOpenActivity(true);
  };
  const handleOpenGoals = () => {
    setOpenGoal(true);
  };
  const handleClose = () => {
    setOpenActivity(false);
    setOpenGoal(false);
  };

  useEffect(() => {
    const tk = JSON.parse(localStorage.getItem('@gestaohabitosg5:token'));
    // if (token) {
    api
      .get(`/goals/?group=${group.id}`, {
        headers: { Authorization: `Bearer ${tk}` }
      })
      .then((res) => setGoalsList(res.data.results))
      .catch((e) => console.log(e));

    api
      .get(`/activities/?group=${group.id}`, {
        headers: { Authorization: `Bearer ${tk}` }
      })
      .then((res) => setActivitiesList(res.data.results))
      .catch((e) => console.log(e));
    // }
    // getGoals(group.id, tk);
    // getActivities(group.id, tk)
  }, []);

  return (
    <GroupContainer>
      <h1>{name}</h1>
      <h3>Categoria: {group.category}</h3>
      <div className="activitiesSection">
        <h2>
          Atividades: <GrAddCircle onClick={handleOpenActivity} />
        </h2>
        <Modal openModal={openActivty} setOpenModal={handleClose}>
          <AddActivityModal group={group} setActivitiesList={setActivitiesList} />
        </Modal>
        {activitiesList.length > 0 ? (
          activitiesList.map((activity, index) => {
            return <ActivityCard
              key={index}
              activity={activity}
              setActivitiesList={setActivitiesList}
              group={group}
            />;
          })
        ) : (
          <span className="noContentMessage">Não há atividades</span>
        )}
      </div>
      <div className="goalsSection">
        <h2>
          Metas: <GrAddCircle onClick={handleOpenGoals} />
        </h2>
        <Modal openModal={openGoal} setOpenModal={handleClose}>
          <AddGoalModal group={group} setGoalsList={setGoalsList} />
        </Modal>
        {goalsList.length > 0 ? (
          goalsList.map((goal, index) => {
            return (
              <GoalCard
                key={index}
                goal={goal}
                setGoalsList={setGoalsList}
                group={group}
              />
            );
          })
        ) : (
          <span className="noContentMessage">Não há metas</span>
        )}
      </div>
      {groupID === userID ?
        <button onClick={() => setOpenGroupEditor(true)}> Editar grupo </button>
        :
        <button className='disabled' disabled> Editar grupo </button>
      }
      <Modal openModal={openGroupEditor} setOpenModal={setOpenGroupEditor} >
        <GroupEditorPopup group={group} setName={setName} userID={userID} />
      </Modal>
    </GroupContainer>
  );
};

export default GroupCard;
