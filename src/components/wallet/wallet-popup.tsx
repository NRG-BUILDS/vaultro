import React, { useState, useEffect } from "react";
import { Check, LucideArrowLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import walletIcon from "@/assets/icons/wallet.png";
import { Checkbox } from "../ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";

interface PricingPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WalletPopup({ open, onOpenChange }: PricingPopupProps) {
  const handleSubscribe = () => {
    toast.success("Wallet added succesfully");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-[700px] p-0 overflow-y-auto">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl md:text-2xl text-center">
            Connect Wallet
          </DialogTitle>
          <DialogDescription className="text-center pt-2">
            Select the wallet you want to connect below.
          </DialogDescription>
        </DialogHeader>

        <SelectWallet
          wallets={["Xamam Wallet"]}
          handleConfirm={handleSubscribe}
        />
      </DialogContent>
    </Dialog>
  );
}

export default WalletPopup;

type Props = {
  wallets: string[];
  handleConfirm: () => void;
};
export const SelectWallet = ({ wallets, handleConfirm }: Props) => {
  const [selectedWallet, setSelectedWallet] = useState<string | null>(
    wallets[0]
  );
  const [termsAgreement, setTermsAgreement] = useState<CheckedState>(false);
  return (
    <div className="p-6 space-y-6">
      <RadioGroup
        value={selectedWallet}
        onValueChange={(value) => setSelectedWallet(value)}
        className="grid gap-4"
      >
        {wallets.map((wallet) => (
          <div
            key={wallet}
            className={`border rounded-lg p-4 py-10 relative aspect- items-center justify-center flex ${
              selectedWallet === wallet
                ? "border-primary bg-primary/5 dark:bg-primary/10"
                : ""
            }`}
          >
            <div>
              <RadioGroupItem value={wallet} id={wallet} className="sr-only" />
              <Label
                htmlFor={wallet}
                className="flex flex-col items-center h-full cursor-pointer"
              >
                <img
                  src={walletIcon}
                  alt=""
                  className="size-10 object-contain"
                />
                <span className="font-medium mb-1">{wallet}</span>
                <span className="text-sm text-muted-foreground"></span>
              </Label>
            </div>
          </div>
        ))}
      </RadioGroup>

      <div className="flex items-center space-x-1">
        <Checkbox
          name="termsAgreement"
          id="termsAgreement"
          checked={termsAgreement}
          onCheckedChange={(check) => setTermsAgreement(check)}
        />
        <span className="text-sm max-w-[500px] text-muted-foreground ml-2">
          By connecting your wallet, you agree to our Disclaimer, Terms of
          Service and our Privacy Policy.
        </span>
      </div>
      <div className="flex justify-end pt-8 pb-6">
        <Button
          disabled={!termsAgreement}
          onClick={handleConfirm}
          className="min-w-[200px] rounded-full"
        >
          <span>Connect Wallet</span>
        </Button>
      </div>
    </div>
  );
};
