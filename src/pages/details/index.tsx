import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { LucideArrowLeft, LucideBookmark } from "lucide-react";
import React from "react";
import { AllocationChart } from "./piechart";
import PositionTable from "./positionTable";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const apiResponse = {
  status: "success",
  data: {
    fund: {
      id: "market-cap-top-3",
      name: "Market Cap Top 3",
      featured: true,
      icons: ["BTC", "ETH", "BNB"],
      description: "A fund with the Top 3 Cardano Native Assets by Market Cap.",
      creator: "Vaultro Financ Team",
      fee: 0,
      metrics: {
        totalValueLocked: 25892342,
        tokens: 3,
        pricePerToken: 4.46,
        inflow7d: 342,
        outflow7d: 3523,
      },
    },
    tokenAllocation: [
      {
        symbol: "AGIX",
        name: "SingularityNET",
        percentage: 46,
        color: "#5E30CC",
      },
      {
        symbol: "WMT",
        name: "World Mobile Token",
        percentage: 42,
        color: "#7747E3",
      },
      {
        symbol: "COPI",
        name: "Cornucopias",
        percentage: 13,
        color: "#915BFF",
      },
    ],
    tokenPositions: [
      {
        id: "agix",
        name: "AGIX",
        fullName: "SingularityNET",
        icon: "AGIX",
        price: 1.112,
        marketCap: 655406506.57,
        priceChange24h: -0.02,
        volume24h: 397.77,
        share: 45.88,
      },
      {
        id: "wmt",
        name: "WMT",
        fullName: "World Mobile Token",
        icon: "WMT",
        price: 0.594,
        marketCap: 135409160.28,
        priceChange24h: 15.15,
        volume24h: 71276.27,
        share: 41.6,
      },
      {
        id: "copi",
        name: "COPI",
        fullName: "Cornucopias",
        icon: "COPI",
        price: 0.093,
        marketCap: 83264756.98,
        priceChange24h: 0,
        volume24h: 1.59,
        share: 12.52,
      },
    ],
    navigationData: {
      currentPage: "Create Fund",
      menuItems: [
        {
          label: "Overview",
          active: false,
          link: "/overview",
        },
        {
          label: "Fund Interactions",
          active: false,
          link: "/fund-interactions",
        },
        {
          label: "Create Fund",
          active: true,
          link: "/create-fund",
        },
        {
          label: "My Positions",
          active: false,
          link: "/my-positions",
        },
      ],
      language: "ENG",
      walletConnected: false,
    },
    placeholderFeatures: [
      {
        title: "Historical Performance",
        comingSoon: true,
      },
      {
        title: "Fund Analytics",
        comingSoon: true,
      },
    ],
  },
};
// Format numbers with commas for thousands
const formatNumber = (num: number) => {
  return num.toLocaleString("en-US");
};

const Details = () => {
  const [data] = React.useState(apiResponse.data.fund);
  const [tokenPositions] = React.useState(apiResponse.data.tokenPositions);
  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/";
    }
  };
  return (
    <div className="p-4 md:p-6">
      <div className="grid gap-6">
        <Card>
          <CardContent className="flex flex-col gap-5 md:flex-row md:items-center justify-between">
            <div className="flex gap-2 items-center">
              <button onClick={goBack}>
                <LucideArrowLeft />
              </button>
              <Icons tokenPic1="" tokenPic2="" />
              <h1 className="text-xl font-bold">{data.name}</h1>
            </div>
            <div className="md:flex-row-reverse flex gap-2 items-center">
              <Button asChild variant="secondary" className="rounded-full">
                <Link to={`/interactions-info/${data.id}`}>
                  Add/Remove from Fund
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <LucideBookmark />
              </Button>
            </div>
          </CardContent>
        </Card>
        <div className="grid lg:grid-cols-12 gap-6">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>About Fund</CardTitle>
              <CardDescription> {data.description}</CardDescription>
            </CardHeader>
            <CardContent className="">
              <div className="pb-8">
                {[
                  {
                    name: "Total Value Locked (XRP)",
                    value: "totalValueLocked",
                  },
                  {
                    name: "Tokens",
                    value: "tokens",
                  },
                  {
                    name: "Price per Fund token (XRP)",
                    value: "pricePerToken",
                  },
                  {
                    name: "Inflow 7 days",
                    value: "inflow7d",
                  },
                  {
                    name: "Outflow 7 days",
                    value: "outflow7d",
                  },
                ].map((metric) => (
                  <div className="flex gap-1 items-end py-2">
                    <p className="min-w-fit whitespace-nowrap">
                      {metric.name}{" "}
                    </p>
                    <div className="border-b border-dashed w-full"></div>
                    <p className="font-medium">
                      {formatNumber(data.metrics[metric.value])}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Token Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <AllocationChart />
            </CardContent>
          </Card>
          <div className="lg:col-span-4 grid gap-6 min-h-[400px]">
            <Card className="lg:col-span-4 border-dashed border-4 flex items-center justify-center">
              <p className="text-muted-foreground">Feature Coming Soon!</p>
            </Card>
            <Card className="lg:col-span-4 border-dashed border-4 flex items-center justify-center">
              <p className="text-muted-foreground">Feature Coming Soon!</p>
            </Card>
          </div>
        </div>
        <Card className="">
          <CardHeader>
            <CardTitle>Token Allocation</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <PositionTable funds={tokenPositions} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Details;
