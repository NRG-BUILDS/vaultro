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

interface Props {
  funds: {
    id: number;
    name: string;
    featured: boolean;
    price: number;
    priceChange: number;
    totalLocked: number;
    inflow: number;
    outflow: number;
    fundFee: number;
    bookmarked: boolean;
    icons: string[];
  }[];
}

export default function FundTable({ funds }: Props) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const filteredFunds = funds.filter((fund) =>
    fund.name.toLowerCase().includes(search.toLowerCase())
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
            <TableHead className="text-right">Price (ADA)</TableHead>
            <TableHead className="text-right">Price Change 24h</TableHead>
            <TableHead className="text-right">Total locked (ADA)</TableHead>
            <TableHead className="text-right">Inflow (ADA) 7d</TableHead>
            <TableHead className="text-right">Outflow (ADA) 7d</TableHead>
            <TableHead className="text-right">Fund Fee</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredFunds.map((fund) => (
            <TableRow
              key={fund.id}
              onClick={() => navigate(`/details/${fund.id}`)}
              className="cursor-pointer hover:bg-accent/5"
            >
              <TableCell>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Bookmark
                    className="h-4 w-4"
                    fill={fund.bookmarked ? "#6C5DD3" : "none"}
                    stroke={fund.bookmarked ? "#6C5DD3" : "currentColor"}
                  />
                </Button>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Icons tokenPic1={fund.icons[0]} tokenPic2={fund.icons[1]} />
                  <div className="flex flex-col">
                    <span>{fund.name}</span>
                    {fund.featured && (
                      <Badge
                        variant="secondary"
                        className="text-xs bg-primary/10 text-primary px-2 py-0.5 w-fit"
                      >
                        Featured
                      </Badge>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right">
                {fund.price.toFixed(3)}
              </TableCell>
              <TableCell className="text-right">
                <div
                  className={`flex items-center justify-end ${
                    fund.priceChange >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {fund.priceChange >= 0 ? (
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(fund.priceChange).toFixed(2)}%
                </div>
              </TableCell>
              <TableCell className="text-right">
                {formatNumber(fund.totalLocked)}
              </TableCell>
              <TableCell className="text-right">
                {formatNumber(fund.inflow)}
              </TableCell>
              <TableCell className="text-right">
                {formatNumber(fund.outflow)}
              </TableCell>
              <TableCell className="text-right">{fund.fundFee}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-center mt-4">
        <Button
          variant="default"
          className="rounded-full bg-purple-600 hover:bg-purple-700 w-8 h-8 p-0"
        >
          1
        </Button>
      </div>
    </div>
  );
}
