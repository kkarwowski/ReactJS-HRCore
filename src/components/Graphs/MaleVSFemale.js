import { merge } from "lodash";
import ReactApexChart from "react-apexcharts";
// material
import { styled } from "@mui/material/styles";
import { Card, CardHeader, Stack } from "@mui/material";
// utils
//
import BaseOptionChart from "../charts/BaseOptionChart";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useContext } from "react";
import { associatesContext } from "../../utils/context/contexts.js";

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
  const { associates } = useContext(associatesContext);
  const [allData, setAllData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getGenderCount = async () => {
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
        associate.Gender === gender && associate.EmplStatus === "Employed"
    );
    return filtered.length;
  };

  const chartOptions = merge(BaseOptionChart(), {
    height: 200,
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
  });
  return (
    <Card>
      <CardHeader title="Male vs Female " />
      {loading && (
        <Stack alignItems="center" justifyContent="center" mb={1}>
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
              height={290}
            />
          </ChartWrapperStyle>
        </>
      )}
    </Card>
  );
}
