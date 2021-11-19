import { Icon } from "@iconify/react";
import androidFilled from "@iconify/icons-ant-design/team-outlined";
// material
import { alpha, styled } from "@mui/material/styles";
import { Card, Typography } from "@mui/material";
// utils
import { fShortenNumber } from "../../utils/formatNumber";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase.js";

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter,
}));

const IconWrapperStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(2),
  color: theme.palette.warning.dark, // color: theme.palette.warning.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(
    theme.palette.primary.dark,
    0
  )} 0%, ${alpha(theme.palette.primary.dark, 0.24)} 100%)`,
}));

// ----------------------------------------------------------------------

export default function TotalEmployed() {
  const [totalEMPL, setTotal] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getEmployed = async () => {
      const ress = await fetchDetails();
      const num = ress.docs.length;
      setLoading(false);
      setTotal(num);
    };
    getEmployed();
  }, []);

  const fetchDetails = async () => {
    const citiesRef = collection(db, "Associates");
    const q = query(citiesRef, where("EmplStatus", "==", "Employed"));
    const querySnapshot = await getDocs(q);

    return querySnapshot;
  };
  return (
    <>
      <RootStyle>
        {loading && <CircularProgress />}
        {totalEMPL && (
          <div>
            <IconWrapperStyle>
              <Icon icon={androidFilled} width={24} height={24} />
            </IconWrapperStyle>
            <Typography variant="h3">{fShortenNumber(totalEMPL)}</Typography>
            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
              Employed Associates
            </Typography>
          </div>
        )}
      </RootStyle>
    </>
  );
}
