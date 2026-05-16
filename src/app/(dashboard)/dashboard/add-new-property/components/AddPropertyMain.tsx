"use client";

import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { propertySchema, PropertyFormData } from "@/schemas/validationSchema";
import BasicDetails from "./BasicDetails";
import LocationDetails from "./LocationDetails";
import PropertyDetails from "./PropertyDetails";
import AmenitiesDetails from "./AmenitiesDetails";
import UploadMedia from "./UploadMedia";
import FloorPlan from "./FloorPlan";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { getPropertyById } from "@/services/propertyService";
import { useSearchParams } from "next/navigation";

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

/** Convert yearOfBuild to property age range for the form */
const getAgeRangeFromYear = (yearOfBuild?: number): number => {
  if (!yearOfBuild) return 1;
  const currentYear = new Date().getFullYear();
  const age = currentYear - yearOfBuild;

  if (age <= 3) return 1; // 1 to 3 years
  if (age <= 5) return 2; // 3 to 5 years
  if (age <= 10) return 3; // 5 to 10 years
  return 4; // More than 10 years
};

/** Flatten grouped amenities from API to a flat array for the form */
const flattenAmenities = (amenities?: {
  lifestyle?: string[];
  facilities?: string[];
  security?: string[];
}): string[] => {
  if (!amenities) return [];
  return [
    ...(amenities.lifestyle || []),
    ...(amenities.facilities || []),
    ...(amenities.security || []),
  ];
};

export default function AddPropertyPage() {
  const methods = useForm<PropertyFormData>({
    resolver: yupResolver(propertySchema),
    defaultValues: {
      listingType: "",
      propertyType: "",
      propertyName: "",
      tenure: "",
      title: "",
      description: "",
      location: "",
      latitude: undefined,
      longitude: undefined,
      streetName: "",
      cityName: "",
      stateName: "",
      countryName: "Malaysia",
      pinCode: "",
      landmark: "",
      price: "",
      builtUpArea: "",
      landSize: "",
      furnishing: "",
      bedRooms: "",
      bathRooms: "",
      availability: "",
      negotiable: "",
      floorLevel: "",
      propertyAge: undefined,
      yearOfCompletion: undefined,
      carParkAllocation: "",
      facingDirection: "",
      renovationStatus: "",
      depositAmount: "",
      minimumRentalPeriod: "",
      petPolicy: "",
      preferredTenantType: "",
      maintenanceFee: "",
      sinkingFund: "",
      bumiLotStatus: "",
      floorPlan: "",
      amenities: [],
    },
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { errors },
  } = methods;
  const searchParams = useSearchParams();
  const editPropertyId = searchParams.get("edit");
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch and populate property data when in edit mode
  useEffect(() => {
    if (editPropertyId) {
      setIsEditMode(true);
      setIsLoading(true);

      const fetchProperty = async () => {
        try {
          const response = await getPropertyById(editPropertyId);
          console.log("📦 Raw API Response:", response);

          // API returns { success: true, data: { ...property fields... } }
          const propertyData = response.data || response;
          console.log("📦 Extracted property data:", propertyData);

          // Map API data to form structure
          const formData: Partial<PropertyFormData> = {
            // Basic Details
            listingType: propertyData.listingType || "",
            propertyType: propertyData.propertyType || "",
            propertyName: propertyData.propertyName || "",
            tenure: propertyData.tenure || "",
            title: propertyData.title || "",
            description: propertyData.description || "",

            // Location Details
            location: propertyData.location || "",
            latitude: propertyData.latitude,
            longitude: propertyData.longitude,
            streetName: propertyData.streetName || "",
            cityName: propertyData.cityName || "",
            stateName: propertyData.state || "",
            countryName: propertyData.county || "",
            pinCode: propertyData.pincode || "",
            landmark: propertyData.landmark || "",

            // Property Details
            price: String(propertyData.price || ""),
            builtUpArea: String(propertyData.buildupArea || ""),
            landSize: propertyData.landSize
              ? String(propertyData.landSize)
              : "",
            furnishing: propertyData.furnishing || "",
            bedRooms: String(propertyData.bedrooms || ""),
            bathRooms: String(propertyData.bathrooms || ""),
            availability: propertyData.availability || "",
            negotiable: propertyData.negotiable ? "Yes" : "No",
            floorLevel: String(propertyData.floorLevel || ""),
            propertyAge: getAgeRangeFromYear(propertyData.yearOfBuild),
            yearOfCompletion: propertyData.yearOfCompletion,
            carParkAllocation: propertyData.carParkAllocation || "",
            facingDirection: propertyData.facingDirection || "",
            renovationStatus: propertyData.renovationStatus || "",

            // RENT-specific fields
            depositAmount: propertyData.depositAmount
              ? String(propertyData.depositAmount)
              : "",
            minimumRentalPeriod: propertyData.minimumRentalPeriod || "",
            petPolicy: propertyData.petPolicy || "",
            preferredTenantType: propertyData.preferredTenantType || "",

            // Strata property fields
            maintenanceFee: propertyData.maintenanceFee
              ? String(propertyData.maintenanceFee)
              : "",
            sinkingFund: propertyData.sinkingFund
              ? String(propertyData.sinkingFund)
              : "",

            // Malaysian market fields
            bumiLotStatus: propertyData.bumiLotStatus || "",

            // Floor Plan
            floorPlan: propertyData.floorPlan || "",

            // Amenities
            amenities: flattenAmenities(propertyData.amenities),
          };

          console.log("📝 Form data being set:", formData);

          // Use setValue for each field to ensure proper population
          // This is more reliable than reset() for complex forms
          Object.entries(formData).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              setValue(key as keyof PropertyFormData, value, {
                shouldValidate: false,
                shouldDirty: false,
                shouldTouch: false,
              });
            }
          });

          console.log("✅ Form values set via setValue");

          // Set images in the hidden input for UploadMedia component
          if (propertyData.images && Array.isArray(propertyData.images)) {
            console.log("🖼️ Setting images:", propertyData.images);
            const hiddenInput = document.getElementById(
              "uploaded-images-input",
            ) as HTMLInputElement | null;
            if (hiddenInput) {
              hiddenInput.value = JSON.stringify(propertyData.images);
            }
            // Also update UploadMedia component state via custom event
            window.dispatchEvent(
              new CustomEvent("property-images-loaded", {
                detail: { images: propertyData.images },
              }),
            );
          }

          toast.success("Property data loaded for editing");
        } catch (error) {
          console.error("Error fetching property:", error);
          toast.error("Failed to load property data");
        } finally {
          setIsLoading(false);
        }
      };

      fetchProperty();
    }
  }, [editPropertyId, reset]);

  const onSubmit: SubmitHandler<PropertyFormData> = (data) => {
    console.log("🚀 Submit called with data:", data);
    console.log("🚀 Form errors:", errors);
    (async () => {
      try {
        // Prevent submission while loading
        if (isLoading) {
          console.log("⏳ Submission blocked - isLoading is true");
          toast.error("Please wait while property data is loading...");
          return;
        }
        console.log("✅ isLoading check passed");

        // Check if form has any validation errors
        if (Object.keys(errors).length > 0) {
          console.log("❌ Form has validation errors:", errors);
          return;
        }
        console.log("✅ Form validation passed");
        // UploadMedia already uploaded the files and stored their public URLs
        // in the hidden DOM input "#uploaded-images-input" — just read from it.
        let imageUrls: string[] = [];
        if (typeof document !== "undefined") {
          const hiddenEl = document.getElementById(
            "uploaded-images-input",
          ) as HTMLInputElement | null;
          console.log("🔍 Hidden input element:", hiddenEl);
          console.log("🔍 Hidden input value:", hiddenEl?.value);

          if (hiddenEl?.value) {
            try {
              const parsed = JSON.parse(hiddenEl.value);
              console.log("🔍 Parsed hidden input value:", parsed);
              if (Array.isArray(parsed))
                imageUrls = parsed.filter(
                  (u): u is string => typeof u === "string",
                );
            } catch (e) {
              console.error("❌ Error parsing hidden input value:", e);
            }
          }
        }

        console.log("📸 Image URLs:", imageUrls);
        console.log("📸 Image count:", imageUrls.length);

        if (imageUrls.length < 5) {
          setError("root", {
            type: "manual",
            message: "Please upload minimum 5 images for better results.",
          });
          return;
        }

        console.log("✅ Image count check passed");
        console.log("📋 Form data:", data);
        console.log("📋 isEditMode:", isEditMode);
        console.log("📋 editPropertyId:", editPropertyId);

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
          buildupArea: data.builtUpArea ? parseFloat(data.builtUpArea) : null,
          landSize: data.landSize ? parseFloat(data.landSize) : null,
          bedrooms: data.bedRooms ? parseInt(data.bedRooms, 10) : null,
          bathrooms: data.bathRooms ? parseInt(data.bathRooms, 10) : null,
          yearOfBuild: getYearFromAgeRange(data.propertyAge) || null,
          yearOfCompletion: data.yearOfCompletion
            ? parseInt(String(data.yearOfCompletion), 10)
            : null,

          // Remapped name fields
          state: data.stateName,
          county: data.countryName,
          pincode: data.pinCode,

          // Convert "Yes"/"No" negotiable to boolean
          negotiable: data.negotiable === "Yes",

          // General fields
          carParkAllocation: data.carParkAllocation || "",
          facingDirection: data.facingDirection || "",
          renovationStatus: data.renovationStatus || "",

          // RENT-specific fields
          depositAmount: data.depositAmount
            ? parseFloat(data.depositAmount)
            : null,
          minimumRentalPeriod: data.minimumRentalPeriod || "",
          petPolicy: data.petPolicy || "",
          preferredTenantType: data.preferredTenantType || "",

          // Strata property fields
          maintenanceFee: data.maintenanceFee
            ? parseFloat(data.maintenanceFee)
            : null,
          sinkingFund: data.sinkingFund ? parseFloat(data.sinkingFund) : null,

          // Malaysian market fields
          bumiLotStatus: data.bumiLotStatus || "",

          // Floor Plan
          floorPlan: data.floorPlan || "",

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
        const propertyUrl =
          isEditMode && editPropertyId
            ? `${API_BASE2}/api/properties/${editPropertyId}`
            : `${API_BASE2}/api/properties`;

        console.log("🌐 API URL:", propertyUrl);
        console.log("🔑 Auth header:", authHeader);
        console.log("📦 Payload:", payload);

        const res = await fetch(propertyUrl, {
          method: isEditMode ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
          },
          body: JSON.stringify(payload),
        });

        console.log("📡 Response status:", res.status);
        console.log("📡 Response ok:", res.ok);

        if (!res.ok) {
          const err = await res
            .json()
            .catch(() => ({ message: res.statusText }));
          console.error("API error:", err);
          const action = isEditMode ? "update" : "add";
          toast.error(
            `Failed to ${action} property: ` + (err.message || res.statusText),
            { duration: 5000 },
          );
          return;
        }

        const result = await res.json();
        console.log(
          isEditMode ? "Property updated:" : "Property created:",
          result,
        );
        methods.reset();
        const successMessage = isEditMode
          ? "Property updated successfully."
          : "Property added successfully.";
        toast.success(successMessage, { duration: 5000 });
        if (typeof window !== "undefined") {
          // Redirect to dashboard property list
          window.location.replace("/dashboard/property");
        }
      } catch (error) {
        console.error("Network error:", error);
        toast.error("Network error while submitting the form.", {
          duration: 5000,
        });
      }
    })();
  };

  return (
    <FormProvider {...methods}>
      {isLoading && (
        <div className="text-center py-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading property data...</p>
        </div>
      )}
      <form
        className="tp-dashboard-add-property-form"
        onSubmit={(e) => {
          console.log("📝 Form submit event triggered");
          console.log("📝 isLoading:", isLoading);
          console.log("📝 Button disabled:", isLoading);
          console.log("📝 Current form errors:", errors);
          handleSubmit(onSubmit, (errors) => {
            console.log("❌ Form validation failed with errors:", errors);
            e.preventDefault();
          })(e);
        }}
      >
        {errors.root && (
          <div
            className="alert alert-danger mb-3"
            style={{
              color: "#dc3545",
              padding: "10px",
              borderRadius: "5px",
              backgroundColor: "#f8d7da",
              border: "1px solid #f5c6cb",
            }}
          >
            {errors.root.message}
          </div>
        )}
        <BasicDetails />
        <LocationDetails />
        <PropertyDetails />
        <AmenitiesDetails />
        <UploadMedia />
        <FloorPlan />
        <div className="tp-dashboard-new-btn">
          <button
            type="submit"
            className="add"
            disabled={isLoading}
            onClick={(e) => {
              console.log("🔘 Button clicked");
              console.log("🔘 isLoading:", isLoading);
              console.log("🔘 Button disabled:", isLoading);
            }}
          >
            {isEditMode ? "Update Property" : "Add Property"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
