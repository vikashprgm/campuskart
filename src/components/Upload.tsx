"use client";

import * as React from "react";
import { useState, useCallback } from "react";
import { Upload, X, Tag, FileText, IndianRupee, Heart } from "lucide-react";
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
import { CategorySelector } from "./CategorySelector";

interface FormValues {
  title: string;
  description: string;
  price: string;
  category: Category | "";
}

function ImageUploader({
  files,
  setFiles,
  error,
}: {
  files: File[];
  setFiles: (files: File[]) => void;
  error?: string;
}) {
  const handleSimulatedUpload: NonNullable<FileUploadProps["onUpload"]> = useCallback(
    async (uploadFiles, { onProgress, onSuccess, onError }) => {
      await Promise.all(
        uploadFiles.map(async (file) => {
          try {
            for (let i = 1; i <= 10; i++) {
              await new Promise((r) => setTimeout(r, 50)); // Faster, cleaner simulation
              onProgress(file, i * 10);
            }
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
      description: `"${file.name.slice(0, 24)}..." was rejected`,
    });
  }, []);

  return (
    <div className="space-y-1.5">
      <Label>Photo <span className="text-destructive">*</span></Label>
      <FileUpload
        value={files}
        onValueChange={setFiles}
        onUpload={handleSimulatedUpload}
        onFileReject={onFileReject}
        maxFiles={1}
        accept="image/*"
        className="w-full"
      >
        <FileUploadDropzone
          className={error ? "border-destructive bg-destructive/5 focus-within:ring-destructive/30" : ""}
        >
          <div className="flex flex-col items-center gap-1 text-center">
            <div className={`flex items-center justify-center rounded-full border p-2.5 ${error ? "border-destructive text-destructive" : "text-muted-foreground"}`}>
              <Upload className="size-5" />
            </div>
            <p className="text-sm font-medium">Drag & drop photo here</p>
            <p className="text-xs text-muted-foreground">Or click to browse (1 photo only)</p>
          </div>
          <FileUploadTrigger asChild>
            <Button type="button" variant="outline" size="sm" className="mt-2 w-fit">
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
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
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
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!values.title.trim()) newErrors.title = "Title is required";
    if (!values.description.trim()) newErrors.description = "Enter description";
    if (!values.price) newErrors.price = "Enter Price";
    else if (isNaN(Number(values.price))) newErrors.price = "Price must be a valid number";
    if (!values.category) newErrors.category = "Please select a category";
    if (files.length === 0) newErrors.photo = "A photo is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof FormValues, val: string) => {
    setValues((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    toast.info("Posting your ad, just a second...");

    try {
      const imageUrl = await uploadToCloudinary(files[0]);
      await insertItemFn({
        data: {
          title: values.title.trim(),
          description: values.description.trim(),
          price: Number(values.price),
          category: values.category as Category,
          image_url: imageUrl,
        },
      });

      toast.success("Item listed successfully!");
      router.navigate({ to: "/products" });
    } catch (err) {
      console.error("[Submit Error]:", err);
      toast.error(err instanceof Error ? err.message : "Something went wrong posting your item.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <ImageUploader 
            files={files} 
            setFiles={(newFiles) => {
              setFiles(newFiles);
              if (errors.photo) setErrors((prev) => ({ ...prev, photo: "" }));
            }} 
            error={errors.photo} 
          />

          {/* Title */}
          <div className="space-y-1.5">
            <Label htmlFor="title">Title <span className="text-destructive">*</span></Label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              <Input
                id="title"
                placeholder="e.g. Voltas Cooler"
                className={`pl-9 ${errors.title ? "border-destructive focus-visible:ring-destructive/30" : ""}`}
                value={values.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </div>
            {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label htmlFor="description">Description <span className="text-destructive">*</span></Label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 size-4 text-muted-foreground pointer-events-none" />
              <Textarea
                id="description"
                placeholder="Describe the condition, size, or anything relevant…"
                className={`pl-9 resize-none min-h-20 ${errors.description ? "border-destructive focus-visible:ring-destructive/30" : ""}`}
                value={values.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>
            {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
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
                className={`pl-9 ${errors.price ? "border-destructive focus-visible:ring-destructive/30" : ""}`}
                value={values.price}
                onChange={(e) => handleChange("price", e.target.value)}
              />
            </div>
            {errors.price && <p className="text-xs text-destructive">{errors.price}</p>}
            <div className="flex gap-2 items-center text-xs text-muted-foreground pt-1 text-center">
               <Heart className="size-3.5 text-rose-500" /> 
               If you want to donate the item to others, leave the price as zero 
               <Heart className="size-3.5 text-rose-500" />
            </div>
          </div>

          <CategorySelector 
            value={values.category} 
            onChange={(val) => handleChange("category", val)}
            error={errors.category} 
          />

          {/* Submit */}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Uploading…" : "List item"}
          </Button>
        </form>
      </div>
    </div>
  );
}