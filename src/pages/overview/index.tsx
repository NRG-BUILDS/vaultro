import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  LucideArrowDown,
  Plus,
  LucideSlidersHorizontal,
  LucideLoader,
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
import useRequest from "@/hooks/use-request";

interface TradingPair {
  id: number;
  issuer: string;
  symbol: string;
  title: string;
  currencyId1: number | null;
  currencyId2: number | null;
  txns: number;
  price1: string;
  price2: string;
  volume_usd: string;
  liquidity: string;
  liquidity_usd: string;
  tradingFee: string;
  created_at: string;
  swaps: number;
  holders: number;
  amount1: string;
  amount2: string;
  level: string;
  apr: string;
  lp_amount: string;
  fails: number;
  isFiat: number;
  farmingApr: string | null;
  logos: string[];
  price1Usd: number;
  price2Usd: number;
  plus2Depth: number;
  minus2Depth: number;
}
interface MemeToken {
  id: number;
  logo: string;
  title: string;
  tier: string;
  created_at: string;
  ticker: string;
  address: string;
  twitter: string | null;
  price: string;
  liquidity: string;
  priceChange: number;
  holders: number;
}
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

export default function Overview() {
  const navigate = useNavigate();
  const [tokens, setTokens] = useState<any>(null);
  const [memes, setMemes] = useState<any>(null);
  const [fundsView, setFundsView] = useState<"featured" | "all" | "bookmarked">(
    "featured"
  );
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);
  const { loading, makeRequest } = useRequest(
    "https://api.xpmarket.com/api/trending/tokens"
  );
  const { loading: memeLoading, makeRequest: memeRequest } = useRequest(
    "https://api.xpmarket.com/api/meme/pools?limit=10&offset=0&sort=created_at&sortDirection=desc&og=true"
  );
  useEffect(() => {
    makeRequest().then((res) => {
      console.log(res);
      setTokens(res.data);
    });
    memeRequest().then((res) => {
      console.log("Memes", res);
      setMemes(res.data.items);
    });
  }, []);
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
              {tokens ? (
                tokens.topLiquidityPairs.map((token: TradingPair, index) => (
                  <div
                    key={index}
                    onClick={() => navigate(`/details/${token.title}`)}
                    className="flex gap-4 items-center hover:bg-accent/10 hover:text-accent transition-all p-2 rounded-lg cursor-pointer"
                  >
                    <Icons
                      tokenPic1={token.logos[0]}
                      tokenPic2={token.logos[1]}
                    />
                    <div className="font-medium flex-col md:flex-row items-center gap-2">
                      <p>{token.title}</p>
                      <div className="flex w-full justify-between items-center gap-5 text-sm">
                        <p className="text-opacity-60 text-right">
                          {token.liquidity_usd}
                        </p>
                        <div className="flex items-center gap-1 text-green-500">
                          <p className="">
                            {token.price1Usd.toFixed(2)} /
                            {token.price2Usd.toFixed(2)}
                          </p>
                          {12 > 0 ? (
                            <LucideArrowDown className="rotate-180" />
                          ) : (
                            <LucideArrowDown />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex justify-center items-center h-48">
                  <LucideLoader className="h-6 w-6 animate-spin" />
                </div>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="md:pb-0">
              <CardTitle className="text-lg">Top Inflow (7 days)</CardTitle>
            </CardHeader>
            <CardContent className="md:px-2">
              {memes ? (
                memes
                  .filter((_, index) => index < 5)
                  .map((meme: MemeToken, index) => (
                    <div
                      key={index}
                      onClick={() => navigate(`/details/${meme.id}`)}
                      className="flex justify-between items-center hover:bg-accent/10 hover:text-accent transition-all p-2 rounded-lg cursor-pointer"
                    >
                      <div className="font-medium flex items-center gap-2">
                        {/* <Icons
                      tokenPic1={fund.tokenPic1}
                      tokenPic2={fund.tokenPics2}
                    /> */}
                        <div className="rounded-full size-9 bg-muted border border-white overflow-hidden">
                          <img
                            src={meme.logo}
                            alt=""
                            className="size-full object-cover"
                          />
                        </div>
                        <p>{meme.title}</p>
                      </div>
                      <p className="text-opacity-60 text-right">
                        {meme.liquidity}
                      </p>
                    </div>
                  ))
              ) : (
                <div className="flex justify-center items-center h-48">
                  <LucideLoader className="h-6 w-6 animate-spin" />
                </div>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="md:pb-0">
              <CardTitle className="text-lg">Top Outflow (7 days)</CardTitle>
            </CardHeader>
            <CardContent className="md:px-2">
              {memes ? (
                memes
                  .filter((_, index) => index > 4 && index < 10)
                  .map((meme: MemeToken, index) => (
                    <div
                      key={index}
                      onClick={() => navigate(`/details/${meme.id}`)}
                      className="flex justify-between items-center hover:bg-accent/10 hover:text-accent transition-all p-2 rounded-lg cursor-pointer"
                    >
                      <div className="font-medium flex items-center gap-2">
                        {/* <Icons
                      tokenPic1={fund.tokenPic1}
                      tokenPic2={fund.tokenPics2}
                    /> */}
                        <div className="rounded-full size-9 bg-muted border border-white overflow-hidden">
                          <img
                            src={meme.logo}
                            alt=""
                            className="size-full object-cover"
                          />
                        </div>
                        <p>{meme.title}</p>
                      </div>
                      <p className="text-opacity-60 text-right">
                        {meme.liquidity}
                      </p>
                    </div>
                  ))
              ) : (
                <div className="flex justify-center items-center h-48">
                  <LucideLoader className="h-6 w-6 animate-spin" />
                </div>
              )}
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
                  {tokens && <FundTable funds={tokens.tokens} />}
                  {loading && (
                    <div className="flex justify-center items-center h-96">
                      <LucideLoader className="h-6 w-6 animate-spin" />
                    </div>
                  )}
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
