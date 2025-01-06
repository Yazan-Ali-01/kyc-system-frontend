import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-upload";

import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, CloudUpload, Paperclip } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSubmitKyc } from "@/features/dashboard/api/kyc.query";
import { useState } from "react";

const formSchema = z.object({
  firstName: z.string().min(2).max(10),
  lastName: z.string().min(2).max(10),
  dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date string format",
  }),
  idDocument: z.any(),
  idDocumentType: z.string(),
  idDocumentNumber: z.string().min(6),
  address: z.object({
    street: z.string().min(3),
    city: z.string().min(2),
    state: z.string(),
    country: z
      .string()
      .length(2, { message: "Country code must be exactly 2 characters" })
      .regex(/^[A-Z]{2}$/, {
        message:
          "Country must be a 2-letter country code in uppercase (e.g., US, GB, DE)",
      }),
    postalCode: z.string(),
  }),
});

export default function SubmitKycForm() {
  const [files, setFiles] = useState<File[] | null>(null);
  const dropZoneConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 5,
    multiple: false,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "application/pdf": [".pdf"],
    },
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dateOfBirth: new Date().toISOString(),
      address: {
        street: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
      },
    },
  });

  const submitKyc = useSubmitKyc();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!files || files.length === 0) {
      toast.error("Please upload an ID document");
      return;
    }

    try {
      const submissionData = {
        ...values,
        idDocument: files[0],
      };

      await submitKyc.mutateAsync(submissionData);
      toast.success("KYC submitted successfully");
    } catch (_error) {
      toast.error("Failed to submit KYC");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Yazan" type="text" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display first name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Ali" type="text" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display last name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(new Date(field.value), "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}

                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) =>
                      field.onChange(date ? date.toISOString() : "")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>Your date of birth.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="idDocumentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID Document Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select document type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="passport">Passport</SelectItem>
                      <SelectItem value="nationalId">National ID</SelectItem>
                      <SelectItem value="drivingLicense">
                        Driving License
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    This is the ID document type you are sumitting.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="idDocumentNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID Document Number</FormLabel>
                  <FormControl>
                    <Input placeholder="DL123456789" type="text" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your id document number.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="address.street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., 123 Main Street"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the street address, including house/building number
                    and street name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="address.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Dubai" type="text" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the name of the city associated with the address.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="address.state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State/Province</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Dubai or Sharjah"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the name of the state or province associated with the
                    address. This field may be required based on the country
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="address.country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country Code (ISO)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., US or CA"
                      type="text"
                      maxLength={2}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the two-letter ISO 3166-1 alpha-2 country code for the
                    address
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="address.postalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Postal Code</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., 10001 or M5V 3C6"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Enter the postal or ZIP code associated with the address. Format
                should align with the country's standard
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="idDocument"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload ID Document</FormLabel>
              <FormControl>
                <FileUploader
                  value={files}
                  onValueChange={(newFiles) => {
                    setFiles(newFiles);
                    if (newFiles && newFiles.length > 0) {
                      field.onChange(newFiles[0]);
                    }
                  }}
                  dropzoneOptions={dropZoneConfig}
                  className="relative bg-background rounded-lg p-2"
                >
                  <FileInput
                    id="fileInput"
                    className="outline-dashed outline-1 outline-slate-500"
                  >
                    <div className="flex items-center justify-center flex-col p-8 w-full">
                      <CloudUpload className="text-gray-500 w-10 h-10" />
                      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                        &nbsp; or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF
                      </p>
                    </div>
                  </FileInput>
                  <FileUploaderContent>
                    {files &&
                      files.length > 0 &&
                      files.map((file, i) => (
                        <FileUploaderItem key={i} index={i}>
                          <Paperclip className="h-4 w-4 stroke-current" />
                          <span>{file.name}</span>
                        </FileUploaderItem>
                      ))}
                  </FileUploaderContent>
                </FileUploader>
              </FormControl>
              <FormDescription>
                Upload a scanned copy or photo of a valid ID document (e.g.,
                passport, driver's license, or national ID). Accepted formats:
                PDF, JPEG, PNG. Maximum file size: 5 MB
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
