import { ReactNode } from "react";
import {
  FormProvider,
  useForm,
  SubmitHandler,
  FieldValues,
  UseFormReturn,
  DefaultValues,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface FormWrapperProps<T extends FieldValues> {
  schema: yup.AnyObjectSchema;
  onSubmit: SubmitHandler<T>;
  defaultValues?: DefaultValues<T>; // ✅ correct type from RHF
  children: ReactNode;
}

function FormWrapper<T extends FieldValues>({
  schema,
  onSubmit,
  defaultValues,
  children,
}: FormWrapperProps<T>) {
  // ✅ RHF will infer T correctly
  const methods: UseFormReturn<T> = useForm<T>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
}

export default FormWrapper;
