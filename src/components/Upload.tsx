"use client";
import { Upload, X, Tag, FileText, IndianRupee, Heart } from "lucide-react";
import * as React from "react";
import { useState, useCallback } from "react";
import { toast } from "sonner";
import { useRouter } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadItemProgress,
  FileUploadList,
  type FileUploadProps,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import { insertItemFn, uploadToCloudinary } from "#/utils/db";
import { type Category } from "#/data/types";

const CATEGORIES: { value: Category; label: string }[] = [
  { value: "electronics", label: "Electronics" },
  { value: "accessories", label: "Accessories" },
  { value: "fashion", label: "Fashion" },
  { value: "decor", label: "Decor" },
  { value: "sports", label: "Sports" },
  { value: "books", label: "Books" },
  { value: "health", label: "Health" },
  { value: "other", label: "Other" },
];

interface FormValues {
  title: string;
  description: string;
  price: string;
  category: Category | "";
}

interface FormErrors {
  title?: string;
  category?: string;
  price?: string;
  photo?: string;
  description? : string
}

export function UploadPage() {
  const router = useRouter();

  const [files, setFiles] = useState<File[]>([]);
  const [values, setValues] = useState<FormValues>({
    title: "",
    description: "",
    price: "",
    category: "",
  });
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues | "photo", boolean>>>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate(vals: FormValues, photoFiles: File[]): FormErrors {
    const errs: FormErrors = {};
    if (!vals.title.trim()) errs.title = "Title is required";
    if (!vals.category) errs.category = "Please select a category";
    if ((vals.price && isNaN(Number(vals.price)))) errs.price = "Price must be a number";
    if (!vals.price) errs.price = "Enter Price"
    if(!vals.description) errs.description = "Enter description"
    if (photoFiles.length === 0) errs.photo = "A photo is required";
    return errs;
  }
  //get latest values
  const valuesRef = React.useRef(values);
  React.useEffect(() => { valuesRef.current = values; }, [values]);
 
  function handleBlur(field: keyof FormValues) {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(valuesRef.current, files));
  }

  function handleChange(field: keyof FormValues, val: string) {
    const next = { ...values, [field]: val };
    setValues(next);
    if (touched[field]) setErrors(validate(next, files));
  }

  const onUpload: NonNullable<FileUploadProps["onUpload"]> = useCallback(
    async (uploadFiles, { onProgress, onSuccess, onError }) => {
      await Promise.all(
        uploadFiles.map(async (file) => {
          try {
            for (let i = 1; i <= 10; i++) {
              await new Promise((r) => setTimeout(r, Math.random() * 150 + 80));
              onProgress(file, i * 10);
            }
            await new Promise((r) => setTimeout(r, 300));
            onSuccess(file);
          } catch (err) {
            onError(file, err instanceof Error ? err : new Error("Upload failed"));
          }
        })
      );
    },
    []
  );

  const onFileReject = useCallback((file: File, message: string) => {
    toast.error(message, {
      description: `"${file.name.length > 24 ? file.name.slice(0, 24) + "…" : file.name}" was rejected`,
    });
  }, []);

  function handleFilesChange(newFiles: File[]) {
    setFiles(newFiles);
    setTouched((t) => ({ ...t, photo: true }));
    setErrors((e) => ({
      ...e,
      photo: newFiles.length === 0 ? "A photo is required" : undefined,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();

      const allTouched = Object.fromEntries(
        [...Object.keys(values), "photo"].map((k) => [k, true])
      );
      setTouched(allTouched);
      const errs = validate(values, files);
      setErrors(errs);

      if (Object.keys(errs).length > 0) {
        return;
      }

      setIsSubmitting(true);
      toast.info("Posting your ad, just a second")
      try {
        const imageUrl = await uploadToCloudinary(files[0]);

        await insertItemFn({
          data: {
            title: values.title.trim(),
            description: values.description.trim(),
            price: values.price ? Number(values.price) : null,
            category: values.category as Category,
            image_url: imageUrl,
          },
        });

        toast.success("Item listed successfully!");
        router.navigate({ to: "/products" });
      } catch (err) {
        console.error("[Submit] error:", err);
        toast.error(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setIsSubmitting(false);
      }
}

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto max-w-lg">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">List an item</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Fill in the details to post an ad.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {/* Photo upload */}
          <div className="space-y-1.5">
            <Label>
              Photo <span className="text-destructive">*</span>
            </Label>
            <FileUpload
              value={files}
              onValueChange={handleFilesChange}
              onUpload={onUpload}
              onFileReject={onFileReject}
              maxFiles={1}
              accept="image/*"
              className="w-full"
            >
              <FileUploadDropzone className={ touched.photo && errors.photo ? "border-destructive bg-destructive/5 focus-within:ring-destructive/30" : ""}>
                <div className="flex flex-col items-center gap-1 text-center">
                  <div
                    className={`flex items-center justify-center rounded-full border p-2.5 ${
                      touched.photo && errors.photo
                        ? "border-destructive text-destructive"
                        : "text-muted-foreground"
                    }`}
                  >
                    <Upload className="size-5" />
                  </div>
                  <p className="text-sm font-medium">Drag & drop photo here</p>
                  <p className="text-xs text-muted-foreground">
                    Or click to browse (1 photo only)
                  </p>
                </div>
                <FileUploadTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2 w-fit"
                  >
                    Browse files
                  </Button>
                </FileUploadTrigger>
              </FileUploadDropzone>

              <FileUploadList>
                {files.map((file, index) => (
                  <FileUploadItem key={index} value={file} className="flex-col">
                    <div className="flex w-full items-center gap-2">
                      <FileUploadItemPreview />
                      <FileUploadItemMetadata />
                      <FileUploadItemDelete asChild>
                        <Button variant="ghost" size="icon" className="size-7 ml-auto">
                          <X className="size-4" />
                        </Button>
                      </FileUploadItemDelete>
                    </div>
                    <FileUploadItemProgress />
                  </FileUploadItem>
                ))}
              </FileUploadList>
            </FileUpload>
            {touched.photo && errors.photo && (
              <p className="text-xs text-destructive">{errors.photo}</p>
            )}
          </div>

          {/* Title */}
          <div className="space-y-1.5">
            <Label htmlFor="title">
              Title <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              <Input
                id="title"
                placeholder="e.g. Voltas Cooler"
                className={`pl-9 ${touched.title && errors.title ? "border-destructive focus-visible:ring-destructive/30" : ""}`}
                value={values.title}
                onChange={(e) => handleChange("title", e.target.value)}
                onBlur={() => handleBlur("title")}
                aria-invalid={!!(touched.title && errors.title)}
              />
            </div>
            {touched.title && errors.title && (
              <p className="text-xs text-destructive">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label htmlFor="description">Description <span className="text-destructive">*</span></Label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 size-4 text-muted-foreground pointer-events-none" />
              <Textarea
                id="description"
                placeholder="Describe the condition, size, or anything relevant…"
                className="pl-9 resize-none min-h-20"
                value={values.description}
                onChange={(e) => handleChange("description", e.target.value)}
                onBlur={() => handleBlur("description")}
                aria-invalid = {!!(touched.description && errors.description)}
              />
              {errors.description && touched.description && <p className="text-xs text-destructive pt-1">{errors.description}</p>}
            </div>
          </div>

          {/* Price */}
          <div className="space-y-1.5">
            <Label htmlFor="price">Price (₹) <span className="text-destructive">*</span></Label>
            <div className="relative">
              <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              <Input
                id="price"
                type="number"
                min={0}
                placeholder="0"
                className={`pl-9 ${touched.price && errors.price ? "border-destructive focus-visible:ring-destructive/30" : ""}`}
                value={values.price}
                onChange={(e) => handleChange("price", e.target.value)}
                onBlur={() => handleBlur("price")}
                aria-invalid={!!(touched.price && errors.price)}
              />
            </div>
            {touched.price && errors.price && (
              <p className="text-xs text-destructive">{errors.price}</p>
            )}
            <div className="flex gap-2 items-center text-gray-600">
               {<Heart size='15'/>}If you want to donate the item to others, leave the price to Zero {<Heart size={'15'}/>}
            </div>
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <Label>
              Category <span className="text-destructive">*</span>
            </Label>
            <div
              role="group"
              aria-label="Category"
              className="flex flex-wrap gap-2"
              onBlur={() => {
                // Mark touched when focus leaves the group
                setTimeout(() => {
                  setTouched((t) => ({ ...t, category: true }));
                  setErrors(validate(values, files));
                }, 100);
              }}
            >
              {CATEGORIES.map(({ value, label }) => {
                const isSelected = values.category === value;
                const hasError = !!(touched.category && errors.category);
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => {
                      const next = { ...values, category: value };
                      setValues(next);
                      setTouched((t) => ({ ...t, category: true }));
                      setErrors(validate(next, files));
                    }}
                    className={[
                      "rounded-full border px-3 py-1 text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isSelected
                        ? "border-primary bg-primary text-primary-foreground"
                        : hasError
                        ? "border-destructive bg-destructive/5 text-destructive hover:bg-destructive/10"
                        : "border-border bg-background text-foreground hover:bg-muted",
                    ].join(" ")}
                    aria-pressed={isSelected}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
            {touched.category && errors.category && (
              <p className="text-xs text-destructive">{errors.category}</p>
            )}
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Uploading…" : "List item"}
          </Button>
        </form>
      </div>
    </div>
  );
}