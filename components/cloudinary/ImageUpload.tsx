"use client";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import React from "react";
import { Button } from "../ui/button";
import { UseFormReturn } from "react-hook-form";

const ImageUpload = ({ form }: { form: UseFormReturn }) => {
  return (
    <CldUploadWidget
      options={{
        sources: ["local", "google_drive", "camera", "url"],
        maxFiles: 1,
        multiple: false,
        showPoweredBy: false,
        folder: "docket",
      }}
      signatureEndpoint={"/api/sign-image"}
      onSuccess={(result) => {
        console.log(result?.info); // { public_id, secure_url, etc }

        const imageUrl: CloudinaryUploadWidgetInfo =
          result?.info as CloudinaryUploadWidgetInfo; // Get the secure URL of the uploaded image

        form.setValue(
          "images",
          typeof imageUrl?.secure_url === "string" ? imageUrl.secure_url : ""
        ); // Set the image URL in the form
      }}
      onQueuesEnd={(result, { widget }) => {
        widget.close();
      }}
    >
      {({ open, results }) => {
        return (
          <Button onClick={() => open()} type="button">
            Select an Image
          </Button>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
