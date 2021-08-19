import { useEffect, useState } from "react";
import { useToken } from "../../Providers/token";
import api from "../../services/api";
import { AiOutlineDelete } from "react-icons/ai";
import { ActivityBox } from "./style";
import { EditText } from 'react-edit-text';
import { toast } from "react-toastify";
import 'react-edit-text/dist/index.css';

const ActivityCard = ({ activity, setActivitiesList, group, activitiesList }) => {
  const [compAtt, setCompAtt] = useState(0);
  const [specificActivity, setSpecificActivity] = useState([])
  const [newActivity, setNewActivity] = useState(activity.title)
  const { token } = useToken();
  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    setNewActivity(activity.title);

  }, [activitiesList])

  const getOneActivity = () => {
    api
      .get(`/activities/${activity.id}/`)
      .then((response) => {
        setSpecificActivity(response.data)
        console.log(specificActivity)
      })
      .catch((err) => console.log(err));
  };

  const editActivity = () => {
    getOneActivity();
    const submitData = { title: newActivity }
    console.log(submitData)
    api
      .patch(`/activities/${activity.id}/`, submitData, config)
      .then(() => toast.success("Atividade alterada com sucesso!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      }))
      .catch((err) => console.log(err))
  };

  const deleteActivity = () => {
    const tk = JSON.parse(localStorage.getItem('@gestaohabitosg5:token'));
    api
      .delete(`/activities/${activity.id}/`, {
        headers: { Authorization: `Bearer ${tk}` }
      })
      // .then(res => {
      //   console.log(res);
      //   return res;
      // })
      .then(() => api.get(`activities/?group=${group.id}`))
      // .then(res => {
      //   console.log(res.data.results)
      //   return res;
      // })
      .then(res => setActivitiesList(res.data.results))
      .catch((err) => console.log(err));
  };

  return (
    <ActivityBox>
      <div>
        <EditText
          value={newActivity}
          onChange={setNewActivity}
          onSave={editActivity} />
      </div>
      <div className="activityButtons">
        <button onClick={deleteActivity}><AiOutlineDelete /></button>
      </div>
    </ActivityBox>
  )
}

export default ActivityCard;
