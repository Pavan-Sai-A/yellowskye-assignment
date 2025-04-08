"use client";

import { sampleProjects } from "@/lib/sampleData";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SampleLineChart = () => {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    const formattedData = sampleProjects.map((project) => ({
      name: project.metrics.name,
      value: project.metrics.value,
    }));
    setData(formattedData);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-full px-4 py-6 sm:py-8 bg-gray-50 rounded-lg shadow-md overflow-hidden">
      <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-4 text-center">
        Project Metrics
      </h2>
      {data.length > 0 ? (
        <div className="w-full max-w-[90vw] sm:max-w-3xl md:max-w-4xl h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 20, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fill: "#4b5563" }}
                label={{
                  value: "Projects",
                  position: "insideBottom",
                  offset: -8,
                  fontSize: 14,
                  fill: "#6b7280",
                }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#4b5563" }}
                label={{
                  value: "Value",
                  angle: -90,
                  position: "insideLeft",
                  offset: -4,
                  fontSize: 14,
                  fill: "#6b7280",
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#f9fafb",
                  borderColor: "#d1d5db",
                  borderRadius: "6px",
                  padding: "10px",
                }}
                labelStyle={{ color: "#374151", fontWeight: "bold" }}
                itemStyle={{ color: "#4b5563" }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#6366f1"
                strokeWidth={2}
                dot={{ r: 5, fill: "#6366f1" }}
                activeDot={{ r: 8, stroke: "#4338ca", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="text-gray-600 text-sm mt-4 text-center">
          No data available to display.
        </p>
      )}
    </div>
  );
};
export default SampleLineChart;
