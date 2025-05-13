import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { Wallet, ChevronDown, LucideXCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const tokens = [
  {
    name: "WMT",
    icon: "https://tokens.muesliswap.com/static/img/tokens/1d7f33bd23d85e1a25d87d86fac4f199c3197a2f7afeb662a0f34e1e.776f726c646d6f62696c65746f6b656e_scaled_100.webp",
    address: "1d7...f34e1",
  },
  {
    name: "MILK",
    icon: "https://tokens.muesliswap.com/static/img/tokens/afbe91c0b44b3040e360057bf8354ead8c49c4979ae6ab7c4fbdc9eb.4d494c4b7632_scaled_100.webp",
    address: "afb...bdc9eb",
  },
  {
    name: "PBX",
    icon: "https://tokens.muesliswap.com/static/img/tokens/cc8d1b026353022abbfcc2e1e71159f9e308d9c6e905ac1db24c7fb6.50617269627573_scaled_100.webp",
    address: "cc8...4c7fb6",
  },
  {
    name: "MELD",
    icon: "https://tokens.muesliswap.com/static/img/tokens/a2944573e99d2ed3055b808eaa264f0bf119e01fc6b18863067c63e4.4d454c44_scaled_100.webp",
    address: "a29...7c63e4",
  },
  {
    name: "EMP",
    icon: "https://tokens.muesliswap.com/static/img/tokens/6c8642400e8437f737eb86df0fc8a8437c760f48592b1ba8f5767e81.456d706f7761_scaled_100.webp",
    address: "6c8...767e81",
  },
  {
    name: "DJED",
    icon: "https://tokens.muesliswap.com/static/img/tokens/7914fae20eb2903ed6fd5021a415c1bd2626b64a2d86a304cb40ff5e.4c494649_scaled_100.webp",
    address: "8db...a1cd61",
  },
  {
    name: "OPT",
    icon: "https://tokens.muesliswap.com/static/img/tokens/1ddcb9c9de95361565392c5bdff64767492d61a96166cb16094e54be.4f5054_scaled_100.webp",
    address: "1dd...4e54be",
  },
  {
    name: "LIFI",
    icon: "https://tokens.muesliswap.com/static/img/tokens/8db269c3ec630e06ae29f74bc39edd1f87c819f1056206e879a1cd61.446a65644d6963726f555344_scaled_100.webp",
    address: "791...40ff5e",
  },
];

const CreateFund = () => {
  const [formState, setFormState] = useState({
    fundName: "",
    description: "",
    creatorName: "",
    hideName: false,
    XRP: "",
    addCommission: false,
    address: "",
    fee: "",
    selectedTokens: [],
  });

  const [search, setSearch] = useState("");
  const [selectedTokens, setSelectedTokens] = useState([]);
  const filteredTokens = tokens.filter(
    (token) =>
      token.name.toLowerCase().includes(search.toLowerCase()) &&
      !selectedTokens.includes(token)
  );
  return (
    <>
      <div className="p-4 md:p-6 grid lg:grid-cols-2 gap-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Create Fund</CardTitle>
            <CardDescription>
              Create a new fund and start managing your assets.
            </CardDescription>
          </CardHeader>
          <CardContent className="md:pt-0">
            <CreateFundForm formState={formState} setFormState={setFormState} />
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 mb-2">
              <span>Select Tokens</span>
              {selectedTokens.length > 0 && (
                <Badge>{selectedTokens.length}</Badge>
              )}
            </CardTitle>
            <div className="divide-y px-1 mb-4 max-h-[80svh] overflow-y-auto">
              {selectedTokens.map((token) => (
                <div
                  key={token.address}
                  className="flex items-center justify-between w-full gap-2 py-4"
                >
                  <div className="flex justify-between items-center gap-2">
                    <img
                      src={`${token.icon}`}
                      alt={token.name}
                      className="size-10 rounded-full border"
                    />
                    <span className="font-medium">{token.name}</span>
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <div className="border p-2 rounded-lg min-w-20">
                      <span>{(100 / selectedTokens.length).toFixed(2)}</span>
                      <span>%</span>
                    </div>
                    <button
                      onClick={() => {
                        if (selectedTokens.includes(token)) {
                          setSelectedTokens(
                            selectedTokens.filter((t) => t !== token)
                          );
                        } else {
                          setSelectedTokens([...selectedTokens, token]);
                        }
                      }}
                      className="text-lg hover:text-destructive"
                    >
                      <LucideXCircle />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <Input
              type="text"
              placeholder="Search by name"
              className="pl-10 w-48 bg-primary/5 rounded-full text-sm"
              onChange={(e) => setSearch(e.target.value)}
            />
          </CardHeader>
          <CardContent className="md:pt-0">
            <div className="divide-y px-1 max-h-[80svh] overflow-y-auto">
              {filteredTokens.map((token) => (
                <button
                  key={token.address}
                  onClick={() => {
                    if (selectedTokens.includes(token)) {
                      setSelectedTokens(
                        selectedTokens.filter((t) => t !== token)
                      );
                    } else {
                      setSelectedTokens([...selectedTokens, token]);
                    }
                  }}
                  className="flex items-center justify-between w-full gap-2 py-4"
                >
                  <div className="flex justify-between items-center gap-2">
                    <img
                      src={`${token.icon}`}
                      alt={token.name}
                      className="size-10 rounded-full border"
                    />
                    <span className="font-medium">{token.name}</span>
                  </div>
                  <span className="text-sm ">{token.address}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="lg:col-span-full flex items-center justify-end gap-2">
          <Button
            size="lg"
            onClick={() => {
              // Handle fund creation logic here
              console.log("Fund created with state:", formState);
            }}
          >
            Create Fund
          </Button>
        </div>
      </div>
    </>
  );
};

export default CreateFund;

interface CreateFundFormProps {
  formState: {
    fundName: string;
    description: string;
    creatorName: string;
    hideName: boolean;
    XRP: string;
    addCommission: boolean;
    address: string;
    fee: string;
    selectedTokens: any[];
  };
  setFormState: (state: any) => void;
}
function CreateFundForm({ formState, setFormState }: CreateFundFormProps) {
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState({
      ...formState,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <>
      <div className="space-y-4">
        {/* Fund Name */}
        <div>
          <Label htmlFor="fundName">Fund name</Label>
          <Input
            id="fundName"
            name="fundName"
            placeholder="Fund name"
            value={formState.fundName}
            onChange={handleInputChange}
          />
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Description"
            value={formState.description}
            onChange={handleInputChange}
          />
        </div>

        {/* Creator Name */}
        <div>
          <Label htmlFor="creatorName">Creator name</Label>
          <Input
            id="creatorName"
            name="creatorName"
            placeholder="Creator name"
            value={formState.creatorName}
            onChange={handleInputChange}
            disabled={formState.hideName}
          />
        </div>

        {/* Hide Name Checkbox */}
        <label htmlFor="hideName" className="flex items-center gap-1">
          <Checkbox
            id="hideName"
            name="hideName"
            checked={formState.hideName}
            onCheckedChange={(check) =>
              //@ts-ignore
              setFormState({ ...formState, hideName: check })
            }
          />
          <span className="text-sm">Hide my name</span>
        </label>

        {/* Add XRP Input */}
        <div>
          <Label
            htmlFor="XRP"
            className="w-full py-1 flex items-center justify-between"
          >
            <span>Add XRP to fund (min:100 XRP)</span>
            <div className="flex items-center text-sm text-gray-500">
              <Wallet className="h-4 w-4 mr-1" />
              To see balance, connect your wallet
            </div>
          </Label>
          <div className="relative">
            <Input
              id="XRP"
              name="XRP"
              type="number"
              placeholder="0"
              value={formState.XRP}
              onChange={handleInputChange}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
              XRP
            </div>
          </div>
        </div>

        {/* Add Commission Checkbox */}
        <label htmlFor="addCommission" className="flex items-center gap-1">
          <Checkbox
            id="addCommission"
            name="addCommission"
            checked={formState.addCommission}
            onCheckedChange={(check) =>
              //@ts-ignore
              setFormState({ ...formState, addCommission: check })
            }
          />
          <span className="text-sm">Add commission</span>
        </label>

        {/* Address and Fee */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              placeholder="Address"
              value={formState.address}
              onChange={handleInputChange}
              disabled={formState.addCommission}
            />
          </div>
          <div>
            <Label htmlFor="fee">Fee</Label>
            <Select
              name="fee"
              value={formState.fee}
              disabled={formState.addCommission}
              onValueChange={(val) => setFormState({ ...formState, fee: val })}
            >
              <SelectTrigger id="fee" className="w-full">
                Select fee
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0.5">0.5%</SelectItem>
                <SelectItem value="1">1%</SelectItem>
                <SelectItem value="1.5">1.5%</SelectItem>
                <SelectItem value="2">2%</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </>
  );
}
