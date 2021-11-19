import { merge } from "lodash";
import ReactApexChart from "react-apexcharts";
// material
import { useTheme, styled } from "@mui/material/styles";
import { Card, CardHeader, Stack } from "@mui/material";
// utils
import { fNumber } from "../../utils/formatNumber";
//
import BaseOptionChart from "../charts/BaseOptionChart";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, useEffect, useContext } from "react";
import { officesContext } from "../../utils/context/contexts";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase.js";
// ----------------------------------------------------------------------

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled("div")(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
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

  const theme = useTheme();
  const [loadingOffice, setLoadingOffice] = useState(true);
  const [officesData, setOfficeData] = useState();

  useEffect(() => {
    const getOffice = async () => {
      const officeData = [];
      for (const off of OFFICES) {
        const ress = await fetchDetails(off);
        officeData.push(ress.docs.length);
      }
      setOfficeData(officeData);
      setLoadingOffice(false);
    };
    getOffice();
  }, []);

  const fetchDetails = async (off) => {
    const citiesRef = collection(db, "Associates");
    const q = query(citiesRef, where("Office", "==", off));
    const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    // });
    return querySnapshot;
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
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `#${seriesName}`,
        },
      },
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } },
    },
  });

  return (
    <Card>
      <CardHeader title="Associates per Office" />
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
