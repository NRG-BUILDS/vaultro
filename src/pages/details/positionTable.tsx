import { useState } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import * as React from "react";

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
import { TokenDetails } from "../overview/fund-table";

interface Props {
  funds: TokenDetails[];
}

export default function PositionTable({ funds }: Props) {
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Price (XRP)</TableHead>
            <TableHead className="text-right">Market Cap (XRP)</TableHead>
            <TableHead className="text-right">Price Change 24h</TableHead>
            <TableHead className="text-right">Volume 24h</TableHead>
            <TableHead className="text-right">Liquidity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredFunds.map((fund) => (
            <TableRow key={fund.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="rounded-full size-9 bg-muted border border-white overflow-hidden">
                    <img
                      src={fund.gravatar}
                      alt=""
                      className="size-full object-cover"
                    />
                  </div>{" "}
                  <div className="flex flex-col">
                    <span>{fund.title}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right">
                {fund.xrp_price.toFixed(3)}
              </TableCell>
              <TableCell className="text-right">
                {formatNumber(fund.marketcap)}
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
                {formatNumber(fund.volume)}
              </TableCell>
              <TableCell className="text-right">
                {formatNumber(fund.liquidity)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
