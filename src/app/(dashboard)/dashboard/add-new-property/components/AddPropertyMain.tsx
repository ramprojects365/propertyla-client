"use client";

import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { propertySchema, PropertyFormData } from "@/schemas/validationSchema";
import BasicDetails from "./BasicDetails";
import LocationDetails from "./LocationDetails";
import PropertyDetails from "./PropertyDetails";
import AmenitiesDetails from "./AmenitiesDetails";
import UploadMedia from "./UploadMedia";
import { toast } from "sonner";

// Amenity groupings — mirror the FE display groups for categorising on submit
const AMENITY_GROUPS = {
  lifestyle: [
    "Swimming Pool",
    "Gymnasium",
    "Playground",
    "BBQ Area",
    "Function Room",
    "Games Room",
    "Sky Garden",
    "Reading Room",
    "Lounge",
  ],
  facilities: [
    "Covered Parking",
    "Visitor Parking",
    "Service Lift",
    "Surau / Prayer Room",
    "Parcel Locker",
    "Laundry Room",
    "Cafeteria",
  ],
  security: [
    "24-hour Security",
    "CCTV Surveillance",
    "Access Card System",
    "Fire Alarm System",
    "Emergency Exit",
  ],
};

/** Map a flat amenities array to the grouped structure the BE expects */
function groupAmenities(flat: string[] = []) {
  const result: {
    lifestyle: string[];
    facilities: string[];
    security: string[];
  } = {
    lifestyle: [],
    facilities: [],
    security: [],
  };
  for (const amenity of flat) {
    if (AMENITY_GROUPS.lifestyle.includes(amenity)) {
      result.lifestyle.push(amenity);
    } else if (AMENITY_GROUPS.facilities.includes(amenity)) {
      result.facilities.push(amenity);
    } else if (AMENITY_GROUPS.security.includes(amenity)) {
      result.security.push(amenity);
    }
  }
  return result;
}

export default function AddPropertyPage() {
  const methods = useForm<PropertyFormData>({
    resolver: yupResolver(propertySchema),
    mode: "onSubmit",
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<PropertyFormData> = (data) => {
    (async () => {
      try {
        // UploadMedia already uploaded the files and stored their public URLs
        // in the hidden DOM input "#uploaded-images-input" — just read from it.
        let imageUrls: string[] = [];
        if (typeof document !== "undefined") {
          const hiddenEl = document.getElementById(
            "uploaded-images-input",
          ) as HTMLInputElement | null;
          if (hiddenEl?.value) {
            try {
              const parsed = JSON.parse(hiddenEl.value);
              if (Array.isArray(parsed))
                imageUrls = parsed.filter(
                  (u): u is string => typeof u === "string",
                );
            } catch {}
          }
        }

        if (imageUrls.length < 5) {
          toast.error("Please upload minimum 5 images for better results.");
          return;
        }

        // ---------------------------------------------------------------
        // Remap FE field names → BE field names before sending to the API
        // ---------------------------------------------------------------
        const flatAmenities = (data.amenities ?? []).filter(
          (a): a is string => typeof a === "string",
        );

        // Convert property age range to actual year of build
        const getYearFromAgeRange = (
          ageRange: string | number | undefined,
        ): number | undefined => {
          if (!ageRange) return undefined;
          const currentYear = new Date().getFullYear();
          const age = parseInt(String(ageRange), 10);

          switch (age) {
            case 1: // 1 to 3 years
              return currentYear - 2;
            case 2: // 3 to 5 years
              return currentYear - 4;
            case 3: // 5 to 10 years
              return currentYear - 7;
            case 4: // More than 10 years
              return currentYear - 15;
            default:
              return undefined;
          }
        };

        const payload = {
          // Pass-through fields that match between FE and BE
          listingType: data.listingType,
          propertyType: data.propertyType,
          propertyName: data.propertyName,
          tenure: data.tenure,
          title: data.title,
          description: data.description,
          location: data.location,
          latitude: data.latitude,
          longitude: data.longitude,
          streetName: data.streetName,
          cityName: data.cityName,
          landmark: data.landmark,
          furnishing: data.furnishing,
          availability: data.availability,
          floorLevel: data.floorLevel?.toString(),
          status: "active",

          // Remapped numeric fields (FE stores as string from input/select)
          price: parseFloat(data.price),
          buildupArea: data.builtUpArea
            ? parseFloat(data.builtUpArea)
            : undefined,
          bedrooms: data.bedRooms ? parseInt(data.bedRooms, 10) : undefined,
          bathrooms: data.bathRooms ? parseInt(data.bathRooms, 10) : undefined,
          yearOfBuild: getYearFromAgeRange(data.propertyAge),

          // Remapped name fields
          state: data.stateName,
          county: data.countryName,
          pincode: data.pinCode,

          // Convert "Yes"/"No" negotiable to boolean
          negotiable: data.negotiable === "Yes",

          // Group flat amenities array into {lifestyle, facilities, security}
          amenities: groupAmenities(flatAmenities),

          // Images from upload
          images: imageUrls,
        };

        const rawToken =
          typeof window !== "undefined"
            ? localStorage.getItem("authToken")
            : null;

        console.log(localStorage.getItem("authToken"));
        const authHeader = `Bearer ${rawToken ?? ""}`;
        const API_BASE2 =
          process.env.NEXT_PUBLIC_API_BASE ?? "http://159.223.92.101:3008";
        const propertyUrl = `${API_BASE2}/api/properties`;
        const res = await fetch(propertyUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const err = await res
            .json()
            .catch(() => ({ message: res.statusText }));
          console.error("API error:", err);
          toast.error(
            "Failed to add property: " + (err.message || res.statusText),
          );
          return;
        }

        const result = await res.json();
        console.log("Property created:", result);
        methods.reset();
        toast.success("Property added successfully.");
        if (typeof window !== "undefined") {
          // Redirect to home page (replace so user can't go back to the form)
          window.location.replace("/");
        }
      } catch (error) {
        console.error("Network error:", error);
        toast.error("Network error while submitting the form.");
      }
    })();
  };

  return (
    <FormProvider {...methods}>
      <form
        className="tp-dashboard-add-property-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <BasicDetails />
        <LocationDetails />
        <PropertyDetails />
        <AmenitiesDetails />
        <UploadMedia />
        <div className="tp-dashboard-new-btn">
          <button type="submit" className="add">
            Add Property
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
