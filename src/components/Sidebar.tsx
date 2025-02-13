import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState, logout } from "../store/store";
import HomeIcon from "@mui/icons-material/Home";
import RegisterIcon from "@mui/icons-material/HowToReg";
import FavoriteIcon from "@mui/icons-material/Favorite";
import UserIcon from "@mui/icons-material/AccountCircle";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  Box,
  Typography,
  Button,
} from "@mui/material";

export const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const { username } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Drawer
      variant="permanent"
      open={open}
      onClick={() => setOpen(!open)}
      sx={{
        width: open ? 240 : 100,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? 240 : 100,
          transition: "width 0.3s ease-in-out",
          overflowX: "hidden",
          cursor: "pointer",
        },
      }}
    >
      <Toolbar />
      <List>
        <ListItem key={"Home"} disablePadding>
          <ListItemButton
            component={Link}
            to={"/"}
            onClick={(e) => e.stopPropagation()}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            {open && <ListItemText primary={"Home"} />}
          </ListItemButton>
        </ListItem>
        {!username ? (
          <ListItem key={"Register/Login"} disablePadding>
            <ListItemButton
              component={Link}
              to={"/register"}
              onClick={(e) => e.stopPropagation()}
            >
              <ListItemIcon>
                <RegisterIcon />
              </ListItemIcon>
              {open && <ListItemText primary={"Register/Login"} />}
            </ListItemButton>
          </ListItem>
        ) : (
          <ListItem key={"Favorites"} disablePadding>
            <ListItemButton
              component={Link}
              to={"/favorite"}
              onClick={(e) => e.stopPropagation()}
            >
              <ListItemIcon>
                <FavoriteIcon />
              </ListItemIcon>
              {open && <ListItemText primary={"Favorites"} />}
            </ListItemButton>
          </ListItem>
        )}
      </List>
      <Divider />
      {username && (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              mt: "auto",
              p: 2,
              textAlign: "center",
              borderTop: "1px solid #ddd",
            }}
          >
            <UserIcon />
            <Typography variant="body2" color="textSecondary">
              {username}
            </Typography>
            <Button
              variant="text"
              color="secondary"
              sx={{
                backgroundColor: "primary.main",
              }}
              onClick={(e) => {
                e.stopPropagation();
                dispatch(logout());
              }}
            >
              Logout
            </Button>
          </Box>
        </>
      )}
    </Drawer>
  );
};
