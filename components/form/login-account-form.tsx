"use client";

import { AccountProps, AccountResponse } from "@/types";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import PinInput from "react-pin-input";
import { toast } from "../ui/use-toast";
import axios from "axios";
import { useGlobalContext } from "@/context";
import { usePathname, useRouter } from "next/navigation";

const LoginAccountForm = ({ currentAccount }: { currentAccount: AccountProps | null }) => {
  const [error, setError] = useState<boolean>(false);
  const [pin, setPin] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setAccount } = useGlobalContext();
  const pathname = usePathname();
  const router = useRouter();

  async function onSubmit(value: string) {
    setIsLoading(true);
    try {
      const { data } = await axios.post<AccountResponse>("/api/account/login", {
        pin: value,
        accountId: currentAccount?._id,
        uid: currentAccount?.uid,
      });
      if (data.success) {
        setAccount(data.data as AccountProps);
        sessionStorage.setItem("account", JSON.stringify(data.data as AccountProps));
        router.push(pathname);
        return toast({
          title: "Account login successfully",
          description: "Your account has been logged in successfully",
        });
      } else {
        setError(true);
      }
    } catch (error) {
      return toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <h1 className="text-gray-500 text-center font-bold text-[16px] mb-4">Profile Lock is currently ON</h1>
      {error ? (
        <h2 className="text-red-500 text-center font-bold text-[20px]">Whoops, wrong PIN. Please try again.</h2>
      ) : (
        <h2 className="text-white text-center font-bold text-[20px]">Enter your PIN to access this profile</h2>
      )}

      <div className="flex justify-center items-center">
        {isLoading && <Loader2 className="animate-spin text-center" />}
      </div>

      <div className="flex justify-center items-center">
        <PinInput
          length={4}
          initialValue={pin}
          onChange={(value) => setPin(value)}
          secret
          type="numeric"
          inputMode="number"
          style={{ display: "flex", gap: "10px", padding: "20px" }}
          inputStyle={{ borderColor: "gray", fontSize: "70px", height: "70px", width: "100%" }}
          disabled={isLoading}
          inputFocusStyle={{ borderColor: "white" }}
          onComplete={(value) => onSubmit(value)}
          autoSelect={true}
        />
      </div>
    </>
  );
};

export default LoginAccountForm;
