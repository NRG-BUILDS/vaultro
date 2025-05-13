import { useState } from "react";
import {
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Bookmark,
  Search,
} from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Icons } from "@/components/ui/icons";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import RangeSlider from "@/components/ui/range-slider";

interface Badge {
  id: string;
  src: string;
}

export interface TokenDetails {
  id: number;
  code: string;
  issuer: string;
  title: string;
  gravatar: string;
  marketcap: number;
  trustlines: number;
  holders: number;
  twitter: string;
  followers: number;
  placeInTop: number;
  liquidity: string;
  traders: string;
  last_price: number;
  sparkline: number[];
  volume: number;
  volume_dex: number;
  xrp_price: number;
  price_change: number;
  price_change_7d: number;
  badge: Badge;
  score: number;
  liquidity_usd: number;
}

interface Props {
  funds: TokenDetails[];
}

export default function FundTable({ funds }: Props) {
  const [search, setSearch] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const navigate = useNavigate();
  const filteredFunds = funds.filter((fund) =>
    fund.title?.toLowerCase().includes(search.toLowerCase())
  );
  // Format numbers with commas for thousands
  const formatNumber = (num) => {
    return num.toLocaleString("en-US");
  };
  // Reset search when funds category changes
  React.useEffect(() => {
    if (funds) {
      setSearch("");
    }
  }, [funds]);

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by name"
            className="pl-10 w-48 bg-primary/5 rounded-full text-sm"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 *:hover:text-foreground hover:*:bg-accent/30">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                Total Locked
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-w-[200px]">
              <RangeSlider
                minValue={0}
                maxValue={25892342}
                // onChange={add the form field here}
              />
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                Price Change
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-w-[200px]">
              <RangeSlider
                isPercentage
                // onChange={add the form field here}
              />
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                Fee
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-w-[200px]">
              <RangeSlider
                isPercentage
                // onChange={add the form field here}
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-8"></TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Price (XRP)</TableHead>
            <TableHead className="text-right">Price Change 24h</TableHead>
            <TableHead className="text-right">Liquidity (XRP)</TableHead>
            <TableHead className="text-right">Market Cap</TableHead>
            <TableHead className="text-right">Volume</TableHead>
            <TableHead className="text-right">Place in Top</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredFunds.map((fund, index) => (
            <TableRow
              key={fund.id}
              onClick={() => navigate(`/details/${fund.id}`)}
              className="cursor-pointer hover:bg-accent/5"
            >
              <TableCell>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Bookmark
                    className="h-4 w-4"
                    fill={isBookmarked ? "#6C5DD3" : "none"}
                    stroke={isBookmarked ? "#6C5DD3" : "currentColor"}
                  />
                </Button>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {/* <Icons
                    tokenPic1={fund.badge?.src}
                    tokenPic2={fund.gravatar}
                  /> */}
                  <div className="rounded-full min-w-9 size-9 bg-muted border border-white overflow-hidden">
                    <img
                      src={fund.gravatar}
                      alt=""
                      className="size-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span>{fund.title}</span>
                    {index % 2 ? (
                      <Badge
                        variant="secondary"
                        className="text-xs bg-primary/10 text-primary px-2 py-0.5 w-fit"
                      >
                        Featured
                      </Badge>
                    ) : null}
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right">
                {fund.xrp_price.toFixed(3)}
              </TableCell>
              <TableCell className="text-right">
                <div
                  className={`flex items-center justify-end ${
                    fund.price_change >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {fund.price_change >= 0 ? (
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(fund.price_change).toFixed(2)}%
                </div>
              </TableCell>
              <TableCell className="text-right">
                {formatNumber(fund.liquidity)}
              </TableCell>
              <TableCell className="text-right">
                {fund.marketcap.toFixed(3)}
              </TableCell>
              <TableCell className="text-right">
                {fund.volume.toFixed(3)}
              </TableCell>
              <TableCell className="text-right">{fund.placeInTop}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-center mt-4">
        <Button
          variant="default"
          className="rounded-full bg-primary hover:bg-secondary w-8 h-8 p-0"
        >
          1
        </Button>
      </div>
    </div>
  );
}
