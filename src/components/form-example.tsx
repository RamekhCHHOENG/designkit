import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Example, ExampleWrapper } from "@/components/example"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const schema = z.object({
  username: z.string("Username is required.").min(2, "Username must be at least 2 characters.").max(30),
  email: z.email("Enter a valid email address."),
  bio: z.string().max(160, "Bio can be at most 160 characters.").optional(),
  terms: z.literal(true, { error: "You must accept the terms." }),
})

type Values = z.input<typeof schema>

export default function FormExample() {
  const [submitted, setSubmitted] = React.useState<unknown>(null)

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { username: "", email: "", bio: "", terms: false as unknown as true },
  })

  return (
    <ExampleWrapper>
      <Example title="Form with validation">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => setSubmitted(values))}
            className="flex w-full max-w-sm flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>This is your public display name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="m@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tell us a little about yourself" {...field} />
                  </FormControl>
                  <FormDescription>Up to 160 characters.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start gap-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value === true}
                      onCheckedChange={(checked) => field.onChange(checked)}
                    />
                  </FormControl>
                  <div className="flex flex-col gap-1.5 leading-none">
                    <FormLabel>Accept terms and conditions</FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>

            {submitted !== null && (
              <pre className="overflow-auto rounded-md bg-muted p-3 text-xs" data-testid="form-result">
                {JSON.stringify(submitted, null, 2)}
              </pre>
            )}
          </form>
        </Form>
      </Example>
    </ExampleWrapper>
  )
}
