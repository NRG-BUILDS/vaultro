import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import {
  LucideArrowLeft,
  LucideBookmark,
  LucideMinusCircle,
  LucidePlusCircle,
  Wallet,
} from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const apiResponse = {
  status: "success",
  data: {
    fund: {
      id: "market-cap-top-3",
      name: "Market Cap Top 3",
      featured: true,
      icons: ["BTC", "ETH", "BNB"],
      description: "A Fund with the Top 3 XRPL Tokens by Market Cap",
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
        icon: "https://tokens.muesliswap.com/static/img/tokens/1ddcb9c9de95361565392c5bdff64767492d61a96166cb16094e54be.4f5054_scaled_100.webp",
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
        icon: "https://tokens.muesliswap.com/static/img/tokens/533bb94a8850ee3ccbe483106489399112b74c905342cb1792a797a0.494e4459_scaled_100.webp",
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
        icon: "https://tokens.muesliswap.com/static/img/tokens/a0028f350aaabe0545fdcb56b039bfb08e4bb4d8c4d7c3c7d481c235.484f534b59_scaled_100.webp",
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

const InteractionsInfo = () => {
  const [data] = React.useState(apiResponse.data.fund);
  const [tokens] = React.useState(apiResponse.data.tokenPositions);
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
          <CardHeader className="flex flex-col gap-5 md:pb-0 md:flex-row md:items-center justify-between">
            <div className="flex gap-2 items-center">
              <button onClick={goBack}>
                <LucideArrowLeft />
              </button>
              <Icons tokenPic1="" tokenPic2="" />
              <h1 className="text-xl font-bold">{data.name}</h1>
            </div>
            <div className="md:flex-row-reverse flex gap-2 items-center">
              <Button asChild variant="secondary" className="rounded-full">
                <Link to={`/details/${data.id}`}>Info</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="">
            <div className="grid gap-4 lg:grid-cols-2 py-4">
              <div>
                <h3 className="font-semibold text-lg mb-1">About Fund</h3>
                <p>{data.description}</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Tokens</h3>
                <div className="flex flex-wrap items-start gap-4">
                  {tokens.map((token) => (
                    <div className="space-y-1 flex flex-col">
                      <div className="size-12 mx-auto rounded-full overflow-hidden border">
                        <img
                          src={token.icon}
                          alt={token.name}
                          className="size-full object-cover"
                        />
                      </div>
                      <span className="text-sm text-center font-medium text-muted-foreground">
                        {token.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="pb-8 grid lg:justify-between lg:grid-cols-2 gap-4 lg:gap-x-6">
              {[
                {
                  name: "Price (XRP)",
                  value: data.metrics.inflow7d,
                },
                {
                  name: "Inflow 7 days",
                  value: data.metrics.inflow7d,
                },
                {
                  name: "Price Change 24h",
                  value: 0,
                },
                {
                  name: "Outflow 7 days",
                  value: data.metrics.outflow7d,
                },
                {
                  name: "Total Value Locked (XRP)",
                  value: data.metrics.totalValueLocked,
                },
                {
                  name: "Fund Fee",
                  value: 0.5,
                },
              ].map((metric) => (
                <div className="flex gap-1 items-end">
                  <p className="min-w-fit whitespace-nowrap">{metric.name} </p>
                  <div className="border-b border-foreground border-dashed w-full"></div>
                  <p className="font-medium">{formatNumber(metric.value)}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="">
            <CardHeader>
              <CardTitle>Add to Fund</CardTitle>
            </CardHeader>
            <CardContent className="">
              <div className="pb-4 md:pb-6">
                <div>
                  <Label
                    htmlFor="addInput"
                    className="w-full py-1 flex items-center justify-between"
                  >
                    <span>Enter XRP amount</span>
                    <div className="flex items-center text-sm text-gray-500">
                      <Wallet className="h-4 w-4 mr-1" />
                      To see balance, connect your wallet
                    </div>
                  </Label>
                  <div className="relative">
                    <Input
                      id="addInput"
                      name="addInput"
                      type="number"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              <div className="pb-8">
                {[
                  {
                    name: "Interface Fee",
                    value: "----",
                  },
                  {
                    name: "Creator Fee",
                    value: "----",
                  },
                  {
                    name: "You will hold",
                    value: "----",
                  },
                ].map((metric) => (
                  <div className="flex gap-1 items-end py-2">
                    <p className="min-w-fit whitespace-nowrap">
                      {metric.name}{" "}
                    </p>
                    <div className="border-b border-dashed w-full"></div>
                    <p className="min-w-fit whitespace-nowrap">
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="justify-center">
              <Button className="rounded-full" size="lg">
                Add to Fund <LucidePlusCircle />{" "}
              </Button>
            </CardFooter>
          </Card>
          <Card className="">
            <CardHeader>
              <CardTitle>Remove from Fund</CardTitle>
            </CardHeader>
            <CardContent className="">
              <div className="pb-4 md:pb-6">
                <div>
                  <Label
                    htmlFor="removeInput"
                    className="w-full py-1 flex items-center justify-between"
                  >
                    <span>Enter fund share amount</span>
                    <div className="flex items-center text-sm text-gray-500">
                      <Wallet className="h-4 w-4 mr-1" />
                      To see balance, connect your wallet
                    </div>
                  </Label>
                  <div className="relative">
                    <Input
                      id="removeInput"
                      name="removeInput"
                      type="number"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              <div className="pb-[72px]">
                {[
                  {
                    name: "Interface Fee",
                    value: "----",
                  },

                  {
                    name: "You will get",
                    value: "----",
                  },
                ].map((metric) => (
                  <div className="flex gap-1 items-end py-2">
                    <p className="min-w-fit whitespace-nowrap">
                      {metric.name}{" "}
                    </p>
                    <div className="border-b border-dashed w-full"></div>
                    <p className="min-w-fit whitespace-nowrap">
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="justify-center">
              <Button className="rounded-full" size="lg">
                Remove from Fund <LucideMinusCircle />{" "}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InteractionsInfo;
