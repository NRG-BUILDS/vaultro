"use client";

import { Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CardFooter } from "@/components/ui/card";
import { TokenDetails } from "../overview/fund-table";

const chartConfig = {
  allocation: {
    label: "Allocation",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function AllocationChart({ tokens }: { tokens: TokenDetails[] }) {
  const chartData = [
    { token: tokens[0].code, allocation: 50, fill: "var(--color-chrome)" },
    { token: tokens[1].code, allocation: 10, fill: "var(--color-safari)" },
    { token: tokens[2].code, allocation: 20, fill: "var(--color-firefox)" },
  ];
  return (
    <>
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie data={chartData} dataKey="allocation" nameKey="token" />
        </PieChart>
      </ChartContainer>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {chartData.map((entry, index) => (
            <div
              key={`cell-${index}`}
              className="flex items-center gap-2 text-sm"
            >
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: entry.fill }}
              ></div>
              <span>{tokens[index].code || ""}</span>
            </div>
          ))}
        </div>
      </CardFooter>
    </>
  );
}
