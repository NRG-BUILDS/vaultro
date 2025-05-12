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
import { Link } from "react-router-dom";
import { TokenDetails } from "../overview/fund-table";

interface Props {
  funds: TokenDetails[];
}

export default function InteractionsTable({ funds }: Props) {
  const [search, setSearch] = useState("");
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
      <div className="relative mb-4">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search by name"
          className="pl-10 w-full bg-primary/5 border-0 rounded-full text-sm"
          onChange={(e) => setSearch(e.target.value)}
        />
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
                  {/* <Icons tokenPic1={fund.icons[0]} tokenPic2={fund.icons[1]} /> */}
                  <div className="rounded-full size-9 bg-muted border border-white overflow-hidden">
                    <img
                      src={fund.gravatar}
                      alt=""
                      className="size-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span>{fund.title}</span>
                    <Badge
                      variant="secondary"
                      className="text-xs bg-primary/10 text-primary px-2 py-0.5 w-fit"
                    >
                      Featured
                    </Badge>
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
                {formatNumber(fund.price_change_7d)}
              </TableCell>
              <TableCell className="text-right">
                {formatNumber("---")}
              </TableCell>
              <TableCell className="text-right">{"---"}%</TableCell>
              <TableCell className="text-right">
                <Button
                  size="sm"
                  asChild
                  className="bg-primary/10 text-xs hover:bg-primary/20 text-primary"
                >
                  <Link to={`/details/${fund.id}`}>Details</Link>
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
