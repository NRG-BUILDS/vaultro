import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
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
import useRequest from "@/hooks/use-request";
import { TokenDetails } from "../overview/fund-table";

const CreateFund = () => {
  const [tokens, setTokens] = useState<TokenDetails[] | null>(null);

  const [search, setSearch] = useState("");
  const [selectedTokens, setSelectedTokens] = useState<TokenDetails[]>([]);
  const [filteredTokens, setFilteredTokens] = useState<TokenDetails[]>([]);
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
  const { loading, makeRequest } = useRequest(
    "https://api.xpmarket.com/api/trending/tokens"
  );

  useEffect(() => {
    makeRequest().then((res) => {
      console.log(res);
      setTokens(res.data.tokens);
    });
  }, []);
  useEffect(() => {
    if (tokens) {
      const filtered = tokens.filter(
        (token) =>
          (token.code?.toLowerCase().includes(search.toLowerCase()) ||
            token.title?.toLowerCase().includes(search.toLowerCase())) &&
          !selectedTokens.includes(token)
      );
      setFilteredTokens(filtered);
    }
  }, [search, selectedTokens, tokens]);
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
          </CardHeader>
          {tokens && tokens.length > 0 && (
            <>
              <div className="divide-y pt-0 mb-4 p-4 md:p-6 max-h-[80svh] overflow-y-auto">
                {selectedTokens.map((token) => (
                  <div
                    key={token.issuer}
                    className="flex items-center justify-between w-full gap-2 py-4"
                  >
                    <div className="flex justify-between items-center gap-2">
                      <img
                        src={`${token.gravatar}`}
                        alt={token.code}
                        className="size-10 rounded-full border"
                      />
                      <span className="font-medium">{token.code}</span>
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
                className="pl-10 m-4 w-48 bg-primary/5 rounded-full text-sm"
                onChange={(e) => setSearch(e.target.value)}
              />
              <CardContent className="md:pt-0">
                <div className="divide-y px-1 max-h-[80svh] overflow-y-auto">
                  {filteredTokens.map((token) => (
                    <button
                      key={token.id}
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
                          src={`${token.gravatar}`}
                          alt={token.title}
                          className="size-10 rounded-full border"
                        />
                        <span className="font-medium">{token.code}</span>
                      </div>
                      <span className="text-sm max-w-40 truncate">
                        {token.issuer}
                      </span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </>
          )}
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
