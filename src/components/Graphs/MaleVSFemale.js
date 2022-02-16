import { merge } from "lodash";
import ReactApexChart from "react-apexcharts";
// material
import { useTheme, styled } from "@mui/material/styles";
import { Card, CardHeader, Stack } from "@mui/material";
// utils
//
import BaseOptionChart from "../charts/BaseOptionChart";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useContext } from "react";

import { associatesContext } from "../../utils/context/contexts.js";
import Svgg from "./svgg";

const CHART_HEIGHT = 320;
const LEGEND_HEIGHT = 50;

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

export default function MaleVSFemaleGraph() {
  const { associates, setAssociates } = useContext(associatesContext);
  const [allData, setAllData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getGenderCount = async () => {
      // setMaleData(fetchDetails("Male"));
      // setFemaleData(fetchDetails("Female"));
      const all = [];
      const male = fetchDetails("Male");
      const female = fetchDetails("Female");
      const total = male + female;

      all.push((100 * male) / total);
      all.push((100 * female) / total);

      setAllData(all);
    };
    getGenderCount();
    setLoading(false);
  }, []);

  const fetchDetails = (gender) => {
    const filtered = associates.filter(
      (associate) =>
        associate.Gender == gender && associate.EmplStatus == "Employed"
    );
    return filtered.length;
  };
  // const chartOptions = merge(BaseOptionChart(), {
  //   height: 250,
  //   width: 250,

  //   type: "radialBar",
  //   legend: {
  //     show: true,
  //     fontSize: 13,
  //     fontWeight: 100,
  //   },

  //   labels: ["Male"],
  //   plotOptions: {
  //     radialBar: {
  //       hollow: {
  //         size: "50%",
  //       },
  //     },
  //   },
  // });
  const chartOptions = merge(
    BaseOptionChart(),
    {
      height: 250,
      width: 250,
      labels: ["Male", "Female"],
      colors: ["#0096FF", "#FF69B4"],

      responsive: [
        {
          breakpoint: 250,
          options: {
            chart: {
              width: 250,
            },
            // legend: {
            // position: "top",
            // },
          },
        },
      ],
    }
    // const chartOptions = merge(BaseOptionChart(), {
    //   height: 250,
    //   width: 250,

    //   type: "radialBar",
    //   legend: {
    //     show: false,
    //   },
    //   colors: ["#0096FF", "#FF69B4"],
    //   labels: ["Male", "Female"],
    //   plotOptions: {
    //     radialBar: {
    //       dataLabels: {
    //         total: {
    //           show: true,
    //           label: "Female vs Male",
    //           // formatter: function (w) {
    //           //   // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
    //           //   return 249;
    //           // },
    //         },
    //       },
    //       hollow: {
    //         size: "50%",
    //       },
    //     },
    //   },
    // }
  );
  return (
    <Card>
      <CardHeader title="Male vs Female " />
      {loading && (
        <Stack
          // direction="row"
          alignItems="center"
          justifyContent="center"
          mb={5}
        >
          <CircularProgress />
        </Stack>
      )}
      {allData && allData.length >= 1 && (
        <>
          <ChartWrapperStyle dir="ltr">
            <ReactApexChart
              options={chartOptions}
              series={allData}
              type="donut"
              // type="radialBar"
              height={290}
            />
          </ChartWrapperStyle>
        </>
      )}
      {/* <Svgg /> */}
    </Card>
  );
}
