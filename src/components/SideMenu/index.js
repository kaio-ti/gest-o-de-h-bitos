import { MenuButton, MenuContainer } from "./style";
import { useHistory } from "react-router";
import { Modal } from "@material-ui/core";
import { useState } from "react";
import UpdateUser from "../updateUser";
import { Slide } from "@material-ui/core";
import React from "react";
import { useAuthentication } from "../../Providers/Authentication";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SideMenu = () => {
  const [open, setOpen] = useState(false);
  const { setAuthenticated } = useAuthentication();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    setAuthenticated(false);
    history.push("/");
  };

  return (
    <MenuContainer>
      <img src="https://i.pravatar.cc/120" alt="avatar" />
      <MenuButton onClick={() => history.push("/dashboardMain")}>
        Início
      </MenuButton>
      <MenuButton onClick={() => history.push("/dashboardHabits")}>
        Meus hábitos
      </MenuButton>
      <MenuButton onClick={() => history.push("/dashboardGroups")}>
        Meus grupos
      </MenuButton>
      <MenuButton onClick={handleOpen}>Configurações</MenuButton>
      <Modal
        open={open}
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <UpdateUser />
      </Modal>
      <MenuButton onClick={handleLogout}>Logout</MenuButton>
    </MenuContainer>
  );
};

export default SideMenu;
