import { Icon } from "@iconify/react";
import "./SearchBar.css";
import { useState, useContext, useRef } from "react";
import searchFill from "@iconify/icons-eva/search-fill";
// material
import { styled, alpha } from "@mui/material/styles";
import { Link } from "react-router-dom";
import {
  Box,
  Avatar,
  Input,
  Slide,
  Button,
  InputAdornment,
  ClickAwayListener,
  IconButton,
  List,
  Grid,
  ListItem,
  TextField,
} from "@mui/material";
import { associatesContext } from "../../utils/context/contexts";
// ----------------------------------------------------------------------

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;
const TvShowContainer = styled("div")(({ theme }) => ({
  width: "800px",
  "min-height": "4em",
  display: "flex",
  "border-bottom": "2px solid #d8d8d852",
  padding: "6px 8px",
  "align-items": "center",
}));
const Name = styled("h3")(({ theme }) => ({
  "font-size": "15px",
  color: "#000",
  "margin-left": "10px",
  flex: 2,
  display: "flex",
}));
const SearchbarStyle = styled("div")(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 99,
  width: "90%",
  height: "30%",
  display: "flex",
  position: "absolute",
  alignItems: "center",
  height: APPBAR_MOBILE,
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
  padding: theme.spacing(0, 3),
  // boxShadow: theme.customShadows.z8,
  backgroundColor: `${alpha(theme.palette.background.default, 0.72)}`,
  [theme.breakpoints.up("md")]: {
    height: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));
const SearchContent = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  "flex-direction": "column",
  padding: "1em",
  "overflow-y": "auto",
}));
// ----------------------------------------------------------------------

export default function Searchbar() {
  const { associates: associatesData, setAssociates: setAssociatesData } =
    useContext(associatesContext);
  const [wordEntered, setWordEntered] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const inputRef = useRef(null);
  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const HandleClear = (props) => {
    inputRef.current.value = "";
  };

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = associatesData.filter((value) => {
      return value.FirstName.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };
  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {/* {!isOpen && (
          <IconButton onClick={handleOpen}>
            <Icon icon={searchFill} width={20} height={20} />
          </IconButton>
        )} */}

        {/* <Slide direction="down" in={isOpen} mountOnEnter unmountOnExit> */}
        <SearchbarStyle>
          <Input
            ref={inputRef}
            autoFocus
            fullWidth
            disableUnderline
            placeholder="Search…"
            onChange={handleFilter}
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
        {/* </Slide> */}

        <SearchContent>
          {(filteredData.length != 0) & (wordEntered.length > 0) &&
            filteredData.slice(0, 5).map((value, key) => {
              return (
                <Link to={`/dashboard/associates/${value.id}`} key={value.id}>
                  <TvShowContainer>
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      alignContent="space-between"
                    >
                      <Grid item>
                        <Avatar
                          src={value.profilePicture}
                          sx={{ width: 24, height: 24 }}
                        />

                        <Name>
                          {value.FirstName} {value.LastName}
                        </Name>
                      </Grid>
                      <Grid item>
                        <div alignItems="flex-end">Profile</div>
                      </Grid>
                    </Grid>
                  </TvShowContainer>
                </Link>

                // <a className="dataItem" href={value.link} target="_blank">
                //   {value.title}
                // </a>
              );
            })}
        </SearchContent>

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
