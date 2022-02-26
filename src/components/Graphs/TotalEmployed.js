import { Icon } from "@iconify/react";
import androidFilled from "@iconify/icons-ant-design/team-outlined";
// material
import { styled } from "@mui/material/styles";
import { Card, Typography } from "@mui/material";
// utils
import { fShortenNumber } from "../../utils/formatNumber";
import { useState, useEffect, useContext } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { associatesContext } from "../../utils/context/contexts.js";

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  padding: theme.spacing(2, 0),
  // color: theme.palette.primary.darker,
  // color: theme.palette.background.paper,
  color: "#095b80",
  // backgroundColor: theme.palette.primary.lighter,
  backgroundColor: "#8cd7f7",
}));

const IconWrapperStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(1),
  color: "#000000", // color: theme.palette.warning.dark,
  // color: theme.palette.error.dark, // color: theme.palette.warning.dark,
  //   backgroundImage: `linear-gradient(135deg, ${alpha(
  //     theme.palette.primary.light,
  //     0.24
  //   )} 50%, ${alpha(theme.palette.secondary.light, 0.24)} 50%)`,
  // }));
  backgroundColor: theme.palette.grey[200],
}));

// ----------------------------------------------------------------------

export default function TotalEmployed() {
  const [totalEMPL, setTotal] = useState();
  const { associates } = useContext(associatesContext);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const filtered = associates.filter(
      (associate) => associate.EmplStatus === "Employed"
    );
    setTotal(filtered.length);
    setLoading(false);
  }, [associates]);

  return (
    <>
      <RootStyle>
        {loading && <CircularProgress />}
        {totalEMPL > 0 && (
          <div>
            <IconWrapperStyle>
              <Icon icon={androidFilled} width={35} height={35} />
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
