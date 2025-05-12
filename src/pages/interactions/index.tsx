import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import InteractionsTable from "./interactions-table";
import { useEffect, useState } from "react";
import useRequest from "@/hooks/use-request";
import { LucideLoader } from "lucide-react";

const fundData = [
  {
    id: 1,
    name: "Market Cap Top 3",
    icons: ["BTC", "ETH", "BNB"],
    featured: false,
    price: 4.464,
    priceChange: -4.97,
    totalLocked: 25892342,
    inflow7d: 342,
    outflow7d: 3523,
    fundFee: 0,
  },
  {
    id: 2,
    name: "Market Cap Top 5",
    icons: ["BTC", "ETH", "BNB", "XRP", "SOL"],
    featured: true,
    price: 6.199,
    priceChange: -1.75,
    totalLocked: 11223240,
    inflow7d: 2432,
    outflow7d: 232,
    fundFee: 0,
  },
  {
    id: 3,
    name: "Market Cap Top 10",
    icons: ["BTC", "ETH", "BNB", "XRP", "SOL"],
    featured: true,
    price: 9.46,
    priceChange: 2.73,
    totalLocked: 5412320,
    inflow7d: 898,
    outflow7d: 123,
    fundFee: 0,
  },
  {
    id: 4,
    name: "Market Cap Top 15",
    icons: ["BTC", "ETH", "BNB", "XRP", "SOL"],
    featured: true,
    price: 11.672,
    priceChange: -7.37,
    totalLocked: 3842304,
    inflow7d: 784,
    outflow7d: 119,
    fundFee: 0,
  },
  {
    id: 5,
    name: "My 3 Picks",
    icons: ["SOL", "ADA", "DOT"],
    featured: true,
    price: 0.518,
    priceChange: 6.72,
    totalLocked: 1912300,
    inflow7d: 343.2,
    outflow7d: 123.1,
    fundFee: 1,
  },
  {
    id: 6,
    name: "DEX FUND",
    icons: ["UNI", "CAKE", "SUSHI"],
    featured: false,
    price: 2.005,
    priceChange: -9.15,
    totalLocked: 1324200,
    inflow7d: 432.4,
    outflow7d: 143,
    fundFee: 0,
  },
  {
    id: 7,
    name: "My Native Asset Fund 5",
    icons: ["ADA", "SOL", "AVAX", "ATOM", "DOT"],
    featured: true,
    price: 3.175,
    priceChange: 4.98,
    totalLocked: 4823943,
    inflow7d: 354.3,
    outflow7d: 243.4,
    fundFee: 0.3,
  },
  {
    id: 8,
    name: "AI Fund",
    icons: ["FET", "AGIX", "OCEAN"],
    featured: false,
    price: 2.703,
    priceChange: -5.7,
    totalLocked: 14920,
    inflow7d: 543,
    outflow7d: 94,
    fundFee: 0.1,
  },
  {
    id: 9,
    name: "Gaming Fund",
    icons: ["AXS", "SAND", "MANA", "ENJ"],
    featured: true,
    price: 1174.49,
    priceChange: -7.12,
    totalLocked: 31123,
    inflow7d: 194,
    outflow7d: 143,
    fundFee: 0.1,
  },
  {
    id: 10,
    name: "My MEME Fund Picks",
    icons: ["DOGE", "SHIB", "PEPE", "FLOKI"],
    featured: true,
    price: 8.871,
    priceChange: 7.31,
    totalLocked: 57345,
    inflow7d: 3423,
    outflow7d: 114,
    fundFee: 0.5,
  },
];

const Interactions = () => {
  const [tokens, setTokens] = useState<any>(null);
  const { loading, makeRequest } = useRequest(
    "https://api.xpmarket.com/api/trending/tokens"
  );

  useEffect(() => {
    makeRequest().then((res) => {
      console.log(res);
      setTokens(res.data);
    });
  }, []);
  return (
    <div className="p-4 md:p-6">
      <Card className="w-full">
        <CardHeader className="flex flex-col items-start space-y-2">
          <CardTitle className="text-lg font-semibold">Featured Fund</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Select fund
          </CardDescription>
        </CardHeader>
        <CardContent>
          {tokens && <InteractionsTable funds={tokens.tokens} />}
          {loading && (
            <div className="flex items-center justify-center">
              <LucideLoader className="h-6 w-6 animate-spin" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Interactions;
