"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import ROUTES from "@/constants/routes";
import { toast } from "sonner";
import { updateUser } from "@/lib/actions/user.action";
import { ProfileSchema } from "@/lib/validations";

import { Textarea } from "../ui/textarea";

interface Params {
  user: User;
}

const ProfileForm = ({ user }: Params) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: user.name || "",
      username: user.username || "",
      portfolio: user.portfolio || "",
      location: user.location || "",
      bio: user.bio || "",
    },
  });

  const handleUpdateProfile = async (values: z.infer<typeof ProfileSchema>) => {
    startTransition(async () => {
      const result = await updateUser({
        ...values,
      });

      if (result.success) {
        toast("Success", {
          description: "Your profile has been updated successfully.",
        });

        router.push(ROUTES.PROFILE(user._id));
      } else {
        toast(`Error (${result.status})`, {
          description: result.error?.message,
        });
      }
    });
  };

  return (
    <Card className="background-light850_dark100 light-border shadow-light100_dark100 mx-auto mt-9 w-full max-w-3xl rounded-2xl border">
      <CardHeader className="px-5 pt-6 pb-5 sm:px-8">
        <CardTitle className="h3-bold text-dark200_light900">
          Profile details
        </CardTitle>
        <CardDescription className="body-regular text-dark400_light800">
          Update your public profile information.
        </CardDescription>
      </CardHeader>

      <form
        onSubmit={form.handleSubmit(handleUpdateProfile)}
        className="flex flex-col gap-0"
      >
        <CardContent className="px-5 sm:px-8">
          <FieldGroup className="gap-6">
            <Controller
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="profile-name"
                    className="paragraph-semibold text-dark400_light800"
                  >
                    Name <span className="text-primary-500">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id="profile-name"
                    aria-invalid={fieldState.invalid}
                    autoComplete="name"
                    className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-14 border"
                    placeholder="Your name"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="username"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="profile-username"
                    className="paragraph-semibold text-dark400_light800"
                  >
                    Username <span className="text-primary-500">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id="profile-username"
                    aria-invalid={fieldState.invalid}
                    autoComplete="username"
                    className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-14 border"
                    placeholder="Your username"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="portfolio"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="profile-portfolio"
                    className="paragraph-semibold text-dark400_light800"
                  >
                    Portfolio Link
                  </FieldLabel>
                  <Input
                    {...field}
                    id="profile-portfolio"
                    type="url"
                    aria-invalid={fieldState.invalid}
                    autoComplete="url"
                    className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-14 border"
                    placeholder="Your portfolio link"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="location"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="profile-location"
                    className="paragraph-semibold text-dark400_light800"
                  >
                    Location <span className="text-primary-500">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id="profile-location"
                    aria-invalid={fieldState.invalid}
                    autoComplete="address-level2"
                    className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-14 border"
                    placeholder="Where do you live?"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="bio"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="profile-bio"
                    className="paragraph-semibold text-dark400_light800"
                  >
                    Bio <span className="text-primary-500">*</span>
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id="profile-bio"
                    rows={5}
                    aria-invalid={fieldState.invalid}
                    className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-35 border"
                    placeholder="What's special about you?"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </CardContent>

        <CardFooter className="light-border mt-6 justify-end border-t px-5 pt-5 pb-6 sm:px-8">
          <Button
            type="submit"
            className="primary-gradient w-fit"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>Submit</>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ProfileForm;
