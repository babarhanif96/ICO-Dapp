import { CircularProgress, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment } from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import colors from "../../colors";
import { StyledPaper } from "../../styled";
import Loader from "../Loader";

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const data = [
  { name: "Funding 1", value: 400 },
  { name: "Funding 2", value: 300 },
  { name: "Funding 3", value: 300 },
  { name: "Funding 4", value: 200 },
  { name: "Funding 5", value: 300 },
  { name: "Funding 6", value: 200 },
];
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#0011AB",
  "#5522CD",
  "#6622EF",
  "#7722AB",
  "#8822CD",
  "#9922EF",
  "#1221AB",
  "#1221CD",
  "#1221EF",
  "#2121AB",
];

const renderLegend = (props) => {
  const { payload } = props;

  return (
    <ul
      style={{
        listStyleType: "none",
        display: "flex",
        flexDirection: "column",
        padding: 0,
        width: "fit-content",
        margin: "auto",
      }}
    >
      {payload.map((entry, index) => (
        <li
          key={`item-${index}`}
          style={{
            marginBottom: 3,
            width: "fit-content",
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Box
              height=".8rem"
              width=".8rem"
              borderRadius={"100%"}
              bgcolor={entry.color}
            ></Box>
            <Typography variant="caption">{entry.value}</Typography>
            <Typography
              variant="caption"
              px={0.5}
              bgcolor={colors.yellow.v1}
              fontWeight={500}
              borderRadius={1}
            >
              {`${Math.round(entry.payload?.percent * 100)}%`}
            </Typography>
            <Typography
              variant="caption"
              px={0.5}
              bgcolor={colors.yellow.v1}
              fontWeight={500}
              borderRadius={1}
            >
              {entry.payload.value&&  `${(entry.payload.value).toFixed(3)} $USD`}
            </Typography>
          </Stack>
        </li>
      ))}
    </ul>
  );
};

export default function ThePieChart({ data1 = [],$USDgenerated }) {
 
 function getSum(total, num) {
  return total + Math.round(num);
}

var amounts = data1.length>0? data1.map(item=>item.value): null
var total =  data1.length>0? amounts.reduce((t,n)=>(t+Number(n)), 0): null
var data2 = []





  return (
    <StyledPaper sx={{ p: 2, mt: 2 }}>
      
      {data1.length==0 && <Loader />}

      <Fragment>
        <Typography align="center" variant="h6">
          Funding Allocation
        </Typography>
        <ResponsiveContainer width="100%" height={300 + data.length * 25}>
          <PieChart width={800} height={"100%"}>
            <Pie
              isAnimationActive={false}
              data={data1.map(({ name, value }) => ({
                name,
                value : $USDgenerated / total * value
                // value: ($USDgenerated / total * Number(value)).toFixed(2),
                // percent: (1 / total * Number(value)).toFixed(2)
              }))}
              label={renderCustomizedLabel}
              labelLine={false}
              innerRadius={80}
              outerRadius={120}
              fill="#8884d8"
              paddingAngle={1}
              dataKey="value"
            >
              {React.Children.toArray(
                data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))
              )}
            </Pie>
            <Legend content={renderLegend} />
          </PieChart>
        </ResponsiveContainer>
      </Fragment>
    </StyledPaper>
  );
}
