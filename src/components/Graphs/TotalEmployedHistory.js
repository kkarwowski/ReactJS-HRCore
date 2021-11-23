import { merge } from "lodash";
import ReactApexChart from "react-apexcharts";
// material
import { Card, CardHeader, Box } from "@mui/material";
//
import { BaseOptionChart } from "../../components/charts/";
import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase.js";
import moment from "moment";
// ----------------------------------------------------------------------

export default function TotalEmployedHistory() {
  const [EmployedHistory, setEmployedHistory] = useState([]);
  useEffect(() => {
    const getTotal = async () => {
      fetchDetails();
    };
    getTotal();
  }, []);

  const fetchDetails = async () => {
    const data = await getDocs(collection(db, "TotalAssociatesChart"));
    setEmployedHistory(
      data.docs.map((user) => [
        {
          ...EmployedHistory,
          x: user.data().Date.toString(),
          y: user.data().Total,
        },
      ])
    );
  };

  const CHART_DATA = [
    {
      name: "Employed",
      type: "area",
      data: EmployedHistory.flat(2).sort(function (a, b) {
        var A = a.x.split("/");
        var B = b.x.split("/");
        var strA = [A[2], A[1], A[0]].join("/");
        var strB = [B[2], B[1], B[0]].join("/");
        return strA.localeCompare(strB);
      }),

      animations: {
        initialAnimation: {
          enabled: true,
        },
      },
    },
  ];
  const chartOptions = merge(BaseOptionChart(), {
    // stroke: { width: [0, 2, 3] },
    stroke: { curve: "smooth" },
    // plotOptions: { bar: { columnWidth: "11%", borderRadius: 4 } },
    // fill: { type: ["solid", "gradient", "solid"] },

    // xaxis: {
    // type: "datetime",
    //   labels: {
    //     format: "dd/MM",
    //   },
    // },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== "undefined") {
            return `${y.toFixed(0)} persons`;
          }
          return y;
        },
      },
    },
  });

  return (
    <div>
      {EmployedHistory && (
        <Card>
          <CardHeader
            title="Employed over time"
            subheader="(+43%) than last year"
          />
          <Box sx={{ p: 3, pb: 1 }} dir="ltr">
            <ReactApexChart
              type="area"
              series={CHART_DATA}
              options={chartOptions}
              height={364}
            />
          </Box>
        </Card>
      )}
    </div>
  );
}
