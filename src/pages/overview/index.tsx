import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Pencil,
  LucideArrowDown,
  Plus,
  LucideSlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { Icons } from "@/components/ui/icons";
import FundTable from "./fund-table";
import FilterForm from "./filter-dialog";

const fundData = {
  topChanges24h: [
    {
      name: "DEX FUND",
      value: 2.005,
      change: 7.599,
      tokenPic1:
        "https://tokens.muesliswap.com/static/img/tokens/a0028f350aaabe0545fdcb56b039bfb08e4bb4d8c4d7c3c7d481c235.484f534b59_scaled_100.webp",
      tokenPics2:
        "https://tokens.muesliswap.com/static/img/tokens/1ddcb9c9de95361565392c5bdff64767492d61a96166cb16094e54be.4f5054_scaled_100.webp",
    },
    {
      name: "Gaming Fund",
      value: 1174.49,
      change: 6.637,
      tokenPic1:
        "https://tokens.muesliswap.com/static/img/tokens/a0028f350aaabe0545fdcb56b039bfb08e4bb4d8c4d7c3c7d481c235.484f534b59_scaled_100.webp",
      tokenPics2:
        "https://tokens.muesliswap.com/static/img/tokens/533bb94a8850ee3ccbe483106489399112b74c905342cb1792a797a0.494e4459_scaled_100.webp",
    },
    {
      name: "Market Cap Top 3",
      value: 4.464,
      change: 5.714,
      tokenPic1:
        "https://tokens.muesliswap.com/static/img/tokens/a0028f350aaabe0545fdcb56b039bfb08e4bb4d8c4d7c3c7d481c235.484f534b59_scaled_100.webp",
      tokenPics2:
        "https://tokens.muesliswap.com/static/img/tokens/a2944573e99d2ed3055b808eaa264f0bf119e01fc6b18863067c63e4.4d454c44_scaled_100.webp",
    },
  ],
  topInflow7d: [
    {
      name: "My MEME Fund Picks",
      inflow: 3423,
      tokenPic1:
        "https://tokens.muesliswap.com/static/img/tokens/a0028f350aaabe0545fdcb56b039bfb08e4bb4d8c4d7c3c7d481c235.484f534b59_scaled_100.webp",
      tokenPics2:
        "https://tokens.muesliswap.com/static/img/tokens/a2944573e99d2ed3055b808eaa264f0bf119e01fc6b18863067c63e4.4d454c44_scaled_100.webp",
    },
    {
      name: "Market Cap Top 5",
      inflow: 2432,
      tokenPic1:
        "https://tokens.muesliswap.com/static/img/tokens/a0028f350aaabe0545fdcb56b039bfb08e4bb4d8c4d7c3c7d481c235.484f534b59_scaled_100.webp",
      tokenPics2:
        "https://tokens.muesliswap.com/static/img/tokens/533bb94a8850ee3ccbe483106489399112b74c905342cb1792a797a0.494e4459_scaled_100.webp",
    },
    {
      name: "Market Cap Top 10",
      inflow: 898,
      tokenPic1:
        "https://tokens.muesliswap.com/static/img/tokens/a0028f350aaabe0545fdcb56b039bfb08e4bb4d8c4d7c3c7d481c235.484f534b59_scaled_100.webp",
      tokenPics2:
        "https://tokens.muesliswap.com/static/img/tokens/a2944573e99d2ed3055b808eaa264f0bf119e01fc6b18863067c63e4.4d454c44_scaled_100.webp",
    },
  ],
  topOutflow7d: [
    {
      name: "Market Cap Top 3",
      outflow: 3523,
      tokenPic1:
        "https://tokens.muesliswap.com/static/img/tokens/1ddcb9c9de95361565392c5bdff64767492d61a96166cb16094e54be.4f5054_scaled_100.webp",
      tokenPics2:
        "https://tokens.muesliswap.com/static/img/tokens/a2944573e99d2ed3055b808eaa264f0bf119e01fc6b18863067c63e4.4d454c44_scaled_100.webp",
    },
    {
      name: "My Native Asset Fund 5",
      outflow: 243.4,
      tokenPic1:
        "https://tokens.muesliswap.com/static/img/tokens/a0028f350aaabe0545fdcb56b039bfb08e4bb4d8c4d7c3c7d481c235.484f534b59_scaled_100.webp",
      tokenPics2:
        "https://tokens.muesliswap.com/static/img/tokens/a2944573e99d2ed3055b808eaa264f0bf119e01fc6b18863067c63e4.4d454c44_scaled_100.webp",
    },
    {
      name: "Market Cap Top 5",
      outflow: 232,
      tokenPic1:
        "https://tokens.muesliswap.com/static/img/tokens/a0028f350aaabe0545fdcb56b039bfb08e4bb4d8c4d7c3c7d481c235.484f534b59_scaled_100.webp",
      tokenPics2:
        "https://tokens.muesliswap.com/static/img/tokens/a2944573e99d2ed3055b808eaa264f0bf119e01fc6b18863067c63e4.4d454c44_scaled_100.webp",
    },
  ],
};
const fundsTableData = {
  featured: [
    {
      id: 1,
      name: "Market Cap Top 3",
      featured: true,
      price: 4.464,
      priceChange: 3.19,
      totalLocked: 25892342,
      inflow: 342,
      outflow: 3523,
      fundFee: 0,
      bookmarked: true,
      icons: ["BTC", "ETH", "BNB"],
    },
    {
      id: 2,
      name: "Market Cap Top 5",
      featured: true,
      price: 6.199,
      priceChange: 2.81,
      totalLocked: 11223240,
      inflow: 2432,
      outflow: 232,
      fundFee: 0,
      bookmarked: true,
      icons: [
        "https://tokens.muesliswap.com/static/img/tokens/533bb94a8850ee3ccbe483106489399112b74c905342cb1792a797a0.494e4459_scaled_100.webp",
        "https://tokens.muesliswap.com/static/img/tokens/1d7f33bd23d85e1a25d87d86fac4f199c3197a2f7afeb662a0f34e1e.776f726c646d6f62696c65746f6b656e_scaled_100.webp",
      ],
    },
    {
      id: 3,
      name: "My 3 Picks",
      featured: true,
      price: 0.518,
      priceChange: -6.13,
      totalLocked: 1912300,
      inflow: 343.2,
      outflow: 123.1,
      fundFee: 1,
      bookmarked: true,
      icons: [
        "https://tokens.muesliswap.com/static/img/tokens/1ddcb9c9de95361565392c5bdff64767492d61a96166cb16094e54be.4f5054_scaled_100.webp",
        "https://tokens.muesliswap.com/static/img/tokens/1ddcb9c9de95361565392c5bdff64767492d61a96166cb16094e54be.4f5054_scaled_100.webp",
      ],
    },
    {
      id: 4,
      name: "AI Fund",
      featured: true,
      price: 2.703,
      priceChange: -3.03,
      totalLocked: 14920,
      inflow: 543,
      outflow: 94,
      fundFee: 0.1,
      bookmarked: true,
      icons: [
        "https://tokens.muesliswap.com/static/img/tokens/1ddcb9c9de95361565392c5bdff64767492d61a96166cb16094e54be.4f5054_scaled_100.webp",
        "https://tokens.muesliswap.com/static/img/tokens/1ddcb9c9de95361565392c5bdff64767492d61a96166cb16094e54be.4f5054_scaled_100.webp",
      ],
    },
    {
      id: 5,
      name: "My MEME Fund Picks",
      featured: true,
      price: 8.871,
      priceChange: 7.98,
      totalLocked: 57345,
      inflow: 3423,
      outflow: 114,
      fundFee: 0.5,
      bookmarked: true,
      icons: [
        "https://tokens.muesliswap.com/static/img/tokens/1ddcb9c9de95361565392c5bdff64767492d61a96166cb16094e54be.4f5054_scaled_100.webp",
        "https://tokens.muesliswap.com/static/img/tokens/a0028f350aaabe0545fdcb56b039bfb08e4bb4d8c4d7c3c7d481c235.484f534b59_scaled_100.webp",
      ],
    },
  ],
  all: [],
  bookmarked: [],
};
export default function Overview() {
  const navigate = useNavigate();

  const [fundsView, setFundsView] = useState<"featured" | "all" | "bookmarked">(
    "featured"
  );
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);
  return (
    <>
      <div className="p-2 md:p-6 max-w-7xl mx-auto space-y-6">
        {/* <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Ooverview</h1>
            <p className="text-muted-foreground">Welcome back, Creator!</p>
          </div>
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="">
            <CardHeader className="md:pb-0">
              <CardTitle className="text-lg">Top Changes (24 hours)</CardTitle>
            </CardHeader>
            <CardContent className="md:px-2">
              {fundData.topChanges24h.map((fund, index) => (
                <div
                  key={index}
                  onClick={() => navigate(`/details/${fund.name}`)}
                  className="flex gap-4 items-center hover:bg-accent/10 hover:text-accent transition-all p-2 rounded-lg cursor-pointer"
                >
                  <Icons
                    tokenPic1={fund.tokenPic1}
                    tokenPic2={fund.tokenPics2}
                  />
                  <div className="font-medium flex-col md:flex-row items-center gap-2">
                    <p>{fund.name}</p>
                    <div className="flex w-full justify-between items-center gap-5 text-sm">
                      <p className="text-opacity-60 text-right">{fund.value}</p>
                      <div className="flex items-center gap-1 text-green-500">
                        <p className="">{fund.change}</p>
                        {fund.change > 0 ? (
                          <LucideArrowDown className="rotate-180" />
                        ) : (
                          <LucideArrowDown />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="md:pb-0">
              <CardTitle className="text-lg">Top Inflow (7 days)</CardTitle>
            </CardHeader>
            <CardContent className="md:px-2">
              {fundData.topInflow7d.map((fund, index) => (
                <div
                  key={index}
                  onClick={() => navigate(`/details/${fund.name}`)}
                  className="flex justify-between items-center hover:bg-accent/10 hover:text-accent transition-all p-2 rounded-lg cursor-pointer"
                >
                  <div className="font-medium flex items-center gap-2">
                    <Icons
                      tokenPic1={fund.tokenPic1}
                      tokenPic2={fund.tokenPics2}
                    />
                    <p>{fund.name}</p>
                  </div>
                  <p className="text-opacity-60 text-right">{fund.inflow}</p>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="md:pb-0">
              <CardTitle className="text-lg">Top Outflow (7 days)</CardTitle>
            </CardHeader>
            <CardContent className="md:px-2">
              {fundData.topOutflow7d.map((fund, index) => (
                <div
                  key={index}
                  onClick={() => navigate(`/details/${fund.name}`)}
                  className="flex justify-between items-center hover:bg-accent/10 hover:text-accent transition-all p-2 rounded-lg cursor-pointer"
                >
                  <div className="font-medium flex items-center gap-2">
                    <Icons
                      tokenPic1={fund.tokenPic1}
                      tokenPic2={fund.tokenPics2}
                    />
                    <p>{fund.name}</p>
                  </div>
                  <p className="text-opacity-60 text-right">{fund.outflow}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview">
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <Card>
                <CardHeader className="flex flex-col lg:flex-row md:items-center justify-between">
                  <div className="flex gap-1 items-center *:rounded-none w-full overflow-x-auto">
                    <Button
                      variant="ghost"
                      onClick={() => setFundsView("featured")}
                      className={`${
                        fundsView === "featured"
                          ? "border-b border-primary"
                          : ""
                      }`}
                    >
                      Featured Funds
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => setFundsView("all")}
                      className={`${
                        fundsView === "all" ? "border-b border-primary" : ""
                      }`}
                    >
                      All Funds
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => setFundsView("bookmarked")}
                      className={` md:hidden ${
                        fundsView === "bookmarked"
                          ? "border-b border-primary rounded-b-none"
                          : ""
                      }`}
                    >
                      Bookmarks
                    </Button>
                  </div>
                  <div className="flex items-start md:items-center gap-2">
                    <Button
                      variant="ghost"
                      onClick={() => setFundsView("bookmarked")}
                      className={`hidden md:inline-block ${
                        fundsView === "bookmarked"
                          ? "border-b border-primary rounded-b-none"
                          : ""
                      }`}
                    >
                      Bookmarks
                    </Button>
                    <Button
                      onClick={() => navigate("/create-fund")}
                      className="rounded-full"
                    >
                      <Plus className="w-4 h-4" />
                      <span className="hidden md:inline-block">
                        Create a New Fund
                      </span>
                    </Button>
                    <Button
                      onClick={() => {
                        setOpenFilterDrawer(true);
                      }}
                      className="md:hidden"
                      variant="outline"
                    >
                      <LucideSlidersHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <FundTable funds={fundsTableData[fundsView]} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        {openFilterDrawer && (
          <FilterForm
            open={openFilterDrawer}
            openChange={setOpenFilterDrawer}
          />
        )}
      </div>
    </>
  );
}
