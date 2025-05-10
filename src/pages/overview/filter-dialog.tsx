import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import RangeSlider from "@/components/ui/range-slider";
import { Drawer, DrawerContent } from "@/components/ui/drawer";

export default function FilterForm({
  openChange,
  open,
}: {
  openChange: (bool: boolean) => void;
  open: boolean;
}) {
  // State for form values
  const [filters, setFilters] = useState({
    search: "",
    strikePrice: { from: 0, to: 25892342 },
    priceChange: { from: -9.407, to: 100 },
    timeFrame: "7d",
    fee: { from: 0, to: 100 },
  });

  // Time frame options
  const timeFrameOptions = [
    { id: "24h", label: "24h" },
    { id: "7d", label: "7d" },
    { id: "all", label: "All time" },
  ];

  // Handle search input change
  const handleSearchChange = (e) => {
    setFilters({ ...filters, search: e.target.value });
  };

  // Clear search input
  const clearSearch = () => {
    setFilters({ ...filters, search: "" });
  };

  // Handle time frame change
  const handleTimeFrameChange = (timeFrame) => {
    setFilters({ ...filters, timeFrame });
  };

  // Handle form submission
  const handleApply = () => {
    console.log("Applied filters:", filters);
    // Add your filter application logic here
  };

  // Handle cancel action
  const handleCancel = () => {
    // Reset filters or close modal
    openChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={openChange}>
      <DrawerContent className="">
        <div className="h-[90svh] overflow-y-auto p-6 rounded-lg w-full max-w-md mx-auto shadow-lg">
          <h2 className="text-lg font-medium mb-4">Filters</h2>

          {/* Search input */}
          <div className="relative mb-6">
            <div className="flex items-center border rounded-lg  px-3 py-2">
              <svg
                className="w-4 h-4 text-gray-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <Input
                value={filters.search}
                onChange={handleSearchChange}
                placeholder="Search by name"
                className="border-0 bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              {filters.search && (
                <button
                  onClick={clearSearch}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Strike price section */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Strike price:
            </label>
            <div className="flex justify-between mb-2">
              <div className="flex items-center">
                <Input
                  value={filters.strikePrice.from}
                  className="w-20 text-center"
                  readOnly
                />
                <button className="ml-1 text-gray-400">
                  <X size={16} />
                </button>
              </div>
              <div className="flex items-center">
                <Input
                  value={filters.strikePrice.to}
                  className="w-24 text-center"
                  readOnly
                />
                <button className="ml-1 text-gray-400">
                  <X size={16} />
                </button>
              </div>
            </div>
            <RangeSlider
              minValue={0}
              maxValue={25892342}
              initialFrom={filters.strikePrice.from}
              initialTo={filters.strikePrice.to}
              //   onChange={(range) =>
              //     setFilters({ ...filters, strikePrice: range })
              //   }
            />
          </div>

          {/* Price change section */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price change:
            </label>
            <div className="flex justify-between mb-2">
              <div className="flex items-center">
                <Input
                  value={filters.priceChange.from}
                  className="w-20 text-center"
                  readOnly
                />
                <span className="ml-1 text-gray-400">%</span>
              </div>
              <div className="flex items-center">
                <Input
                  value={filters.priceChange.to}
                  className="w-20 text-center"
                  readOnly
                />
                <span className="ml-1 text-gray-400">%</span>
              </div>
            </div>
            <RangeSlider
              minValue={-100}
              maxValue={100}
              initialFrom={filters.priceChange.from}
              initialTo={filters.priceChange.to}
              //   onChange={(range) =>
              //     setFilters({ ...filters, priceChange: range })
              //   }
            />
          </div>

          {/* Time frame section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              {timeFrameOptions.map((option) => (
                <div key={option.id} className="flex items-center">
                  <button
                    className={`flex items-center justify-center rounded-full w-5 h-5 mr-1 ${
                      filters.timeFrame === option.id
                        ? "bg-purple-500 text-white"
                        : "border border-gray-300"
                    }`}
                    onClick={() => handleTimeFrameChange(option.id)}
                  >
                    {filters.timeFrame === option.id && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </button>
                  <span className="text-sm">{option.label}</span>
                </div>
              ))}
            </div>
            <RangeSlider
              minValue={0}
              maxValue={100}
              initialFrom={25}
              initialTo={75}
              onChange={() => {}}
            />
          </div>

          {/* Fee section */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fee:
            </label>
            <div className="flex justify-between mb-2">
              <div className="flex items-center">
                <Input
                  value={filters.fee.from}
                  className="w-20 text-center"
                  readOnly
                />
                <span className="ml-1 text-gray-400">%</span>
              </div>
              <div className="flex items-center">
                <Input
                  value={filters.fee.to}
                  className="w-20 text-center"
                  readOnly
                />
                <span className="ml-1 text-gray-400">%</span>
              </div>
            </div>
            <RangeSlider
              minValue={0}
              maxValue={100}
              initialFrom={filters.fee.from}
              initialTo={filters.fee.to}
              //   onChange={(range) => setFilters({ ...filters, fee: range })}
            />
          </div>

          {/* Action buttons */}
          <div className="flex gap-4">
            <Button className="flex-1 " onClick={handleApply}>
              Apply
            </Button>
            <Button
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800"
              variant="outline"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
