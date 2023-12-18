"use client";
import { CreateAccountSchema } from "@/lib/validation";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import PinInput from "react-pin-input";
import axios from "axios";
import { AccountProps, AccountResponse } from "@/types";
import { toast } from "../ui/use-toast";
const CreateAccountForm = ({ uid, setOpen, setAccounts, accounts }: { uid: string; setOpen: React.Dispatch<React.SetStateAction<boolean>>; setAccounts: React.Dispatch<React.SetStateAction<AccountProps[]>>; accounts: AccountProps[] }) => {
  const form = useForm<zod.infer<typeof CreateAccountSchema>>({ resolver: zodResolver(CreateAccountSchema), defaultValues: { name: "", pin: "" } });
  const { isValid, isSubmitting } = form.formState;
  async function onSubmit(values: zod.infer<typeof CreateAccountSchema>) {
    try {
      const { data } = await axios.post<AccountResponse>("/api/account", { ...values, uid });
      if (data.success) {
        setOpen(false);
        form.reset();
        setAccounts([...accounts, data.data as AccountProps]);
        return toast({ title: "Account created successfully", description: "Your account has been created successfully" });
      } else {
        return toast({ title: "Error", description: data.message, variant: "destructive" });
      }
    } catch (error) {
      return toast({ title: "Error", description: "Something went wrong", variant: "destructive" });
    }
  }
  return (
    <>
      <h1 className="text-white text-center font-bold text-3xl">Create Your Account</h1>
      <div className="w-full h-[2px] bg-slate-500/20 mb-4" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} autoComplete="off" className="h-[56px]" disabled={isSubmitting}></Input>
                </FormControl>
                <FormDescription>Your name will be used to identify your account</FormDescription>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PIN Code</FormLabel>
                <FormControl>
                  <PinInput
                    length={4}
                    initialValue={field.value}
                    secret
                    disabled={isSubmitting}
                    onChange={(value) => field.onChange(value)}
                    type="numeric"
                    inputMode="number"
                    style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}
                    inputStyle={{
                      width: "100%",
                      height: "56px",
                      fontSize: "40px",
                      borderColor: " RGBA(255, 255, 255, 0.8)",
                    }}
                    autoSelect={true}
                  />
                </FormControl>
                <FormDescription>Your PIN will be used to access your account</FormDescription>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 flex justify-center items-center h-[56px] !text-white mt-4" disabled={isSubmitting}>
            Create Account
          </Button>
        </form>
      </Form>
    </>
  );
};
export default CreateAccountForm;
