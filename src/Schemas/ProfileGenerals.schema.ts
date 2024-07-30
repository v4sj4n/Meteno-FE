import * as yup from "yup";
export const updateGeneralsSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(3, "First name must be at least 3 characters long"),
  lastName: yup
    .string()
    .min(3, "First name must be at least 3 characters long"),
  bio: yup.string().max(250, "Bio must be at  max 250 characters long"),
});

export type updateGenerals = yup.InferType<typeof updateGeneralsSchema>;
