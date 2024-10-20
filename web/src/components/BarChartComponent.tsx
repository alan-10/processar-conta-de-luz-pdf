import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import moment from "moment";

import {  InvoiceData } from '../types/invoices'

interface Invoices   {
  invoices: InvoiceData[]
}

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];

export  function BarChartComponent( {invoices}: Invoices) {

  console.log("invoices::", invoices);

  const data3 = invoices.map(invoice => {
    return  {
      name: moment(invoice.emitionDate).format("MMMM"), 
      energiaEletrica: invoice.electrical_energy_value + invoice.scee_energy_value,
      gd_energy: invoice.gd_energy_value  ,
      amt: invoice.electrical_energy_value + invoice.scee_energy_value + invoice.gd_energy_value
    }
  });

  // const data2 = []

  // for (const invoice of invoices) {
  //   data2.push({
  //     name: moment(invoice.emitionDate).format("MMMM")
  //   })
  // }
 
   
  

  return (
    <BarChart
      width={500}
      height={300}
      data={data3}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="energiaEletrica" fill="#8884d8" background={{ fill: "#eee" }} />
      <Bar dataKey="gd_energy" fill="#82ca9d" />
    </BarChart>
  );
}
