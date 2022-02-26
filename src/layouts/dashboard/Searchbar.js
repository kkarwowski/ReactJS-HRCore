import { Icon } from "@iconify/react";
import "./SearchBar.css";
import { useState, useRef } from "react";
import searchFill from "@iconify/icons-eva/search-fill";
// material
import { styled, alpha } from "@mui/material/styles";
import {
  Box,
  Input,
  Slide,
  InputAdornment,
  ClickAwayListener,
  IconButton,
} from "@mui/material";
// ----------------------------------------------------------------------

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 70;

const SearchbarStyle = styled("div")(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 99,
  width: "100%",
  display: "flex",
  position: "absolute",
  alignItems: "center",
  height: APPBAR_MOBILE,
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  backgroundColor: `${alpha(theme.palette.background.default, 0.72)}`,
  [theme.breakpoints.up("md")]: {
    height: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

export default function Searchbar() {
  const [isOpen, setOpen] = useState(false);
  const inputRef = useRef(null);
  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const HandleClear = (props) => {
  //   inputRef.current.value = "";
  // };

  // const handleFilter = (event) => {
  //   const searchWord = event.target.value;
  //   setWordEntered(searchWord);
  //   const newFilter = associatesData.filter((value) => {
  //     return value.FirstName.toLowerCase().includes(searchWord.toLowerCase());
  //   });

  //   if (searchWord === "") {
  //     setFilteredData([]);
  //   } else {
  //     setFilteredData(newFilter);
  //   }
  // };
  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!isOpen && (
          <IconButton onClick={handleOpen}>
            <Icon icon={searchFill} width={20} height={20} />
          </IconButton>
        )}

        <Slide direction="down" in={isOpen} mountOnEnter unmountOnExit>
          <SearchbarStyle>
            <Input
              ref={inputRef}
              autoFocus
              fullWidth
              disableUnderline
              placeholder="Search…"
              // onChange={handleFilter}
              startAdornment={
                <InputAdornment position="start">
                  <Box
                    component={Icon}
                    icon={searchFill}
                    sx={{ color: "text.disabled", width: 20, height: 20 }}
                  />
                </InputAdornment>
              }
              sx={{ mr: 1, fontWeight: "fontWeightBold" }}
            />
            {/* <Button variant="contained" onClick={handleClose}>
              Search
            </Button> */}
          </SearchbarStyle>
        </Slide>

        {/* {isOpen && (
          <List component="nav">
            <ListItem key={1}></ListItem>
            <ListItem key={2}>
              <TextField value="sdf" />
            </ListItem>
            <ListItem key={3}>
              <TextField value="sdf" />
            </ListItem>
            <ListItem key={4}>
              <TextField value="sdf" />
            </ListItem>
            <ListItem key={5}>
              <TextField value="sdf" />
            </ListItem>
            <ListItem key={6}>
              <TextField value="sdf" />
            </ListItem>
          </List>
        )} */}
      </div>
    </ClickAwayListener>
  );
}
