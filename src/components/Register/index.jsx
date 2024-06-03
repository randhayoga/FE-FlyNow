<<<<<<< HEAD
import { ModeToggle } from "../mode-toggle"

import { Button } from "../ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
// import { useToast } from "@/components/ui/use-toast"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { z } from "zod"

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email",
  }),
  password: z.string().min(6, {
    message: "Password must be 6 characters long",
  }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
})

const Register = () => {
  // const { toast } = useToast()
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values) {
    // Do something with the form values.
    console.log(values)
  }

  return (
    <div>
      <ModeToggle />
      <h3>Daftar</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="photo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Photo</FormLabel>
                <FormControl>
                  <Input type="file" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full bg-primary dark:bg-primary" type="submit">
            Submit
          </Button>
        </form>
      </Form>
      <p className="text-center text-sm text-muted-foreground">
        Have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  )
}

export default Register
=======
import { ModeToggle } from "../mode-toggle";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { useToast } from "@/components/ui/use-toast"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

const formSchema = z
  .object({
    email: z.string().email({
      message: "Please enter a valid email",
    }),
    password: z.string().min(6, {
      message: "Password must be 6 characters long",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const Register = () => {
  // const { toast } = useToast()
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values) {
    // Do something with the form values.
    console.log(values);
  }

  return (
    <div>
      <ModeToggle />
      <h3>Daftar</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="photo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Photo</FormLabel>
                <FormControl>
                  <Input type="file" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full bg-primary dark:bg-primary" type="submit">
            Submit
          </Button>
        </form>
      </Form>
      <p className="text-center text-sm text-muted-foreground">
        Have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
>>>>>>> 293af5ef5fed1e49ded1c9d665b5a0ced0292413
