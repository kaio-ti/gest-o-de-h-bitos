import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../services/api";
import { useToken } from "../token";

export const HabitsContext = createContext();

export const HabitsProvider = ({ children }) => {
  const [habitsList, setHabitsList] = useState([]);
  const { token } = useToken();
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const addHabit = (data) => {
    const {
      title,
      category,
      difficulty,
      frequency,
      achieved,
      how_much_achieved,
      user,
    } = data;
    api
      .post(
        "/habits/",
        {
          title: title,
          category: category,
          difficulty: difficulty,
          frequency: frequency,
          achieved: achieved,
          how_much_achieved: how_much_achieved,
          user: user,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((e) => setHabitsList([...habitsList, e.data]))
      .catch((error) => console.log(error));
  };

  const removeHabit = (id) => {
    const filteredHabits = habitsList.filter((habit) => habit.id !== id);
    api
      .delete(`/habits/${id}/`, config)
      .then((response) => setHabitsList(filteredHabits));
  };

  const editHabit = (data, habit) => {
    api
      .patch(
        `/habits/${habit.id}/`,
        data,
        config
      )
      .then(res => habit = {
        ...habit,
        how_much_achieved: res.data.how_much_achieved,
        achieved: res.data.achieved
      })
  };

  const getHabits = (tk) => {
    api
      .get("/habits/personal/", {
        headers: { Authorization: `Bearer ${tk}` }
      })
      .then((response) => {
        setHabitsList(response.data);
      })
  }

  // useEffect(() => {
  //   if (token) {
  //       .catch((err) => console.log(err));
  //   }
  // }, [token]);

  return (
    <HabitsContext.Provider
      value={{ habitsList, addHabit, removeHabit, editHabit, getHabits }}
    >
      {children}
    </HabitsContext.Provider>
  );
};
export const useHabits = () => useContext(HabitsContext);
