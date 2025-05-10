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

interface Props {
  funds: {
    id: string;
    name: string;
    fullName: string;
    icon: string;
    price: number;
    marketCap: number;
    priceChange24h: number;
    volume24h: number;
    share: number;
  }[];
}

export default function PositionTable({ funds }: Props) {
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Price (ADA)</TableHead>
            <TableHead className="text-right">Market Cap (ADA)</TableHead>
            <TableHead className="text-right">Price Change 24h</TableHead>
            <TableHead className="text-right">Volume 24h</TableHead>
            <TableHead className="text-right">Share (%)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredFunds.map((fund) => (
            <TableRow key={fund.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Icons tokenPic1={fund.icon} tokenPic2={fund.icon} />
                  <div className="flex flex-col">
                    <span>{fund.name}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right">
                {fund.price.toFixed(3)}
              </TableCell>
              <TableCell className="text-right">
                {formatNumber(fund.marketCap)}
              </TableCell>
              <TableCell className="text-right">
                <div
                  className={`flex items-center justify-end ${
                    fund.priceChange24h >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {fund.priceChange24h >= 0 ? (
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(fund.priceChange24h).toFixed(2)}%
                </div>
              </TableCell>
              <TableCell className="text-right">
                {formatNumber(fund.volume24h)}
              </TableCell>
              <TableCell className="text-right">
                {formatNumber(fund.share)}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
