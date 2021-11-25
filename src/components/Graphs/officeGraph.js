import { merge } from "lodash";
import ReactApexChart from "react-apexcharts";
// material
import { useTheme, styled } from "@mui/material/styles";
import { Card, CardHeader, Stack, Typography, Button } from "@mui/material";
// utils
import { fNumber } from "../../utils/formatNumber";
//
import BaseOptionChart from "../charts/BaseOptionChart";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, useEffect, useContext } from "react";
import {
  officesContext,
  associatesContext,
} from "../../utils/context/contexts";
// ----------------------------------------------------------------------

const CHART_HEIGHT = 330;
const LEGEND_HEIGHT = 60;

const ChartWrapperStyle = styled("div")(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(1),
  "& .apexcharts-canvas svg": { height: CHART_HEIGHT },
  "& .apexcharts-canvas svg,.apexcharts-canvas foreignObject": {
    overflow: "visible",
  },
  "& .apexcharts-legend": {
    height: LEGEND_HEIGHT,
    alignContent: "center",
    position: "relative !important",
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

export default function OfficeGraph() {
  const { allOffices } = useContext(officesContext);
  const OFFICES = allOffices.flat(2);
  const { associates, setAssociates } = useContext(associatesContext);
  const theme = useTheme();
  const [loadingOffice, setLoadingOffice] = useState(true);
  const [officesData, setOfficesData] = useState();

  useEffect(() => {
    const getOffice = async () => {
      setLoadingOffice(true);
      console.log("effect OFFICE");
      const officeData = [];
      for (const off of OFFICES) {
        // const ress = await fetchDetails(off);
        // officeData.push(ress.docs.length);
        officeData.push(fetchDetails(off));
      }
      setOfficesData(officeData);
      setLoadingOffice(false);
    };
    getOffice();
  }, [allOffices]);

  const fetchDetails = (off) => {
    const filtered = associates.filter(
      (associate) =>
        associate.Office == off && associate.EmplStatus == "Employed"
    );
    // const citiesRef = collection(db, "Associates");
    // const q = query(citiesRef, where("Office", "==", off));
    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    // });
    // return querySnapshot;
    return filtered.length;
  };
  const chartOptions = merge(BaseOptionChart(), {
    colors: [
      theme.palette.primary.main,
      theme.palette.info.main,
      theme.palette.warning.main,
      theme.palette.error.main,
    ],
    labels: OFFICES,
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: "center" },
    dataLabels: { enabled: true, dropShadow: { enabled: true } },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => fNumber(seriesName) + " associates",
        title: {
          formatter: (seriesName) => `${seriesName} -`,
        },
      },
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } },
    },
  });

  return (
    <Card>
      <Typography component="div">
        <CardHeader title="Associates per Office" sx={{ fontWeight: "bold" }} />
      </Typography>
      {loadingOffice && (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          mb={5}
        >
          <CircularProgress />
        </Stack>
      )}
      {officesData && (
        <ChartWrapperStyle dir="ltr">
          <ReactApexChart
            type="pie"
            series={officesData}
            options={chartOptions}
            height={280}
          />
        </ChartWrapperStyle>
      )}
    </Card>
  );
}
