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
  const [EmployedHistory, setEmployedHistory] = useState();
  const [dataForChart, setDataForChart] = useState([]);
  const [labelForChart, setLabelForChar] = useState([]);
  useEffect(() => {
    const getTotal = async () => {
      fetchDetails();
    };
    getTotal();
  }, []);

  const fetchDetails = async () => {
    const data = await getDocs(collection(db, "TotalAssociatesChart"));
    data.forEach((doc) => {
      setDataForChart([...dataForChart, doc.data().Total]);

      setLabelForChar([
        ...labelForChart,
        moment(doc.data().Date, "DD/MM/YYYY").format("MM/DD/YYYY").toString(),
      ]);
    });
    // setEmployedHistory(data.docs);
  };

  const CHART_DATA = [
    {
      name: "Team A",
      type: "column",
      data: dataForChart,
    },
    // {
    //   name: 'Team B',
    //   type: 'area',
    //   data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
    // },
    // {
    //   name: 'Team C',
    //   type: 'line',
    //   data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
    // }
  ];
  const chartOptions = merge(BaseOptionChart(), {
    // stroke: { width: [0, 2, 3] },
    stroke: { curve: "smooth" },
    plotOptions: { bar: { columnWidth: "11%", borderRadius: 4 } },
    fill: { type: ["solid", "gradient", "solid"] },
    // labels: [
    //   "01/04/2003",
    //   "02/04/2003",
    //   "03/12/2003",
    //   "04/01/2003",
    //   "05/01/2003",
    //   "06/01/2003",
    //   "07/01/2003",
    //   "08/01/2003",
    //   "09/01/2003",
    //   "10/01/2003",
    //   "11/01/2003",
    // ],

    // labels: [
    //   "17/10/2021",
    //   "10/10/2021",
    //   "04/05/2021",
    //   "01/06/2021",
    //   "29/06/2021",
    //   "17/08/2021",
    //   "19/09/2021",
    //   "17/05/2021",
    //   "26/07/2021",
    //   "08/06/2021",
    // ],
    labels: labelForChart,

    xaxis: {
      type: "datetime",
      // labels: {
      //   format: "DD/MM/YYYY",
      // },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== "undefined") {
            return `${y.toFixed(0)} visits`;
          }
          return y;
        },
      },
    },
  });

  return (
    <div>
      {labelForChart && (
        <Card>
          <CardHeader
            title="Website Visits"
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
