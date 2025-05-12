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
import RangeSlider from "@/components/ui/range-slider";

interface Props {
  funds: {
    id: number;
    name: string;
    icons: string[];
    featured: boolean;
    price: number;
    priceChange: number;
    totalLocked: number;
    inflow7d: number;
    outflow7d: number;
    fundFee: number;
  }[];
}

export default function PositionsTable({ funds }: Props) {
  const [search, setSearch] = useState("");
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
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Price (XRP)</TableHead>
            <TableHead className="text-right">Price Change 24h</TableHead>
            <TableHead className="text-right">Total locked (XRP)</TableHead>
            <TableHead className="text-right">Inflow 7d</TableHead>
            <TableHead className="text-right">Outflow 7d</TableHead>
            <TableHead className="text-right">Fund Fee</TableHead>
            <TableHead className="w-8"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredFunds.map((fund) => (
            <TableRow key={fund.id}>
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
                {formatNumber(fund.inflow7d)}
              </TableCell>
              <TableCell className="text-right">
                {formatNumber(fund.outflow7d)}
              </TableCell>
              <TableCell className="text-right">{fund.fundFee}%</TableCell>
              <TableCell className="text-right">
                <Button
                  size="sm"
                  className="bg-primary/10 text-xs hover:bg-primary/20 text-primary"
                >
                  Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filteredFunds.length === 0 && (
        <div className="h-48 flex items-center justify-center">
          <p className="text-sm text-muted-foreground">No funds found.</p>
        </div>
      )}

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
