"use client";

import CreateAccountForm from "../form/create-account-form";
import LoginAccountForm from "../form/login-account-form";
import { AccountProps, AccountResponse } from "@/types";
import { Dialog, DialogContent } from "../ui/dialog";
import { LockKeyhole, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "../ui/use-toast";
import { Button } from "../ui/button";
import Image from "next/image";
import Loader from "./loader";
import axios from "axios";

const ManageAccount = () => {
  const [currentAccount, setCurrentAccount] = useState<AccountProps | null>(null);
  const [state, setState] = useState<"login" | "create">("create");
  const [accounts, setAccounts] = useState<AccountProps[]>([]);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session }: any = useSession();

  useEffect(() => {
    const GetAllAccounts = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get<AccountResponse>(`/api/account?uid=${session?.user?.uid}`);
        if (data.success) setAccounts(data.data as AccountProps[]);
      } catch (error) {
        return toast({ title: "Error", description: "Something went wrong", variant: "destructive" });
      } finally {
        setIsLoading(false);
      }
    };

    GetAllAccounts();
  }, [session]);

  const onDelete = async (id: string) => {
    try {
      const isConfirm = confirm("Are you sure you want to delete this account?");

      if (isConfirm) {
        const { data } = await axios.delete<AccountResponse>(`/api/account?id=${id}`);

        if (data.success) {
          setAccounts(accounts.filter((account) => account._id !== id));

          return toast({ title: "Account deleted successfully", description: "The account has been deleted successfully" });
        } else {
          return toast({ title: "Error", description: data.message, variant: "destructive" });
        }
      }
    } catch (error) {
      return toast({ title: "Error", description: "An error occurred while deleting the account", variant: "destructive" });
    }
  };
  if (isLoading) return <Loader />;
  return (
    <div className="min-h-screen flex justify-center flex-col items-center relative">
      <div className="flex justify-center flex-col items-center">
        <h1 className="text-white font-bold text-5xl">Who Is Watching ?</h1>

        <ul className="flex my-24 gap-4">
          {isLoading ? null : (
            <>
              {accounts &&
                accounts.map((account, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      if (isDelete) return;
                      setOpen(true);
                      setState("login");
                      setCurrentAccount(account);
                    }}
                    className="max-w-[160px] min-w-[160px] w-[160px] h-[160px] flex flex-col items-center gap-3 cursor-pointer"
                  >
                    <div className="relative">
                      <div className="max-w-[160px] max-h-[160px] min-w-[84px] min-h-[84px] w-[160px] h-[160px] rounded object-cover relative">
                        <Image src={"https://occ-0-2611-3663.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABfNXUMVXGhnCZwPI1SghnGpmUgqS_J-owMff-jig42xPF7vozQS1ge5xTgPTzH7ttfNYQXnsYs4vrMBaadh4E6RTJMVepojWqOXx.png?r=1d4"} alt="account" fill />
                      </div>
                      {isDelete ? (
                        <div onClick={() => onDelete(account._id)} className="absolute transform bottom-0 z-10 cursor-pointer">
                          <Trash2 className="w-7 h-7 text-red-600" />
                        </div>
                      ) : null}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xl">{account.name}</span>
                      <LockKeyhole />
                    </div>
                  </li>
                ))}

              {accounts && accounts.length < 4 ? (
                <li
                  onClick={() => {
                    setOpen(true);
                    setState("create");
                  }}
                  className="max-w-[160px] max-h-[160px] min-w-[160px] min-h-[160px] w-[160px] h-[160px] bg-[#e5b109] flex justify-center items-center border border-black text-xl font-bold cursor-pointer"
                >
                  Add Account
                </li>
              ) : null}
            </>
          )}
        </ul>

        <Button onClick={() => setIsDelete((prev) => !prev)} className="bg-transparent hover:bg-transparent !text-white border border-gray-200 cursor-pointer tracking-wide inline-flex text-sm p-[1.5em]">
          Manage Account
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          {state === "login" && <LoginAccountForm currentAccount={currentAccount} />}
          {state === "create" && <CreateAccountForm uid={session?.user?.uid} setOpen={setOpen} setAccounts={setAccounts} accounts={accounts} />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageAccount;
