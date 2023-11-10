import * as zod from "zod";

export const CreateAccountSchema = zod.object({
  name: zod.string().min(2, "Name is required min 2 characters").max(10, "Name is too long"),
  pin: zod.string().min(4, "PIN is required").max(4, "PIN is too long"),
});
