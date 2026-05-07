"use client";

import { useFormContext } from "react-hook-form";
import { PropertyFormData } from "@/schemas/validationSchema";
import ErrorMessage from "../../../../../components/Form/ErrorMassage";
import "../property.css";

export default function BasicDetails() {
  const {
    register,
    formState: { errors },
  } = useFormContext<PropertyFormData>();

  return (
    <div className="tp-dashboard-new-property mb-15">
      <h5 className="tp-dashboard-new-title">Basic Details</h5>
      <div className="tp-dashboard-new-property-box">
        <div className="row">
          <div className="col-lg-12">
            <div className="tp-dashboard-new-input">
              <label>Listing Title</label>
              <input
                className="textBox"
                type="text"
                {...register("title")}
                placeholder="Spacious 3-Bedroom Condo in Mont Kiara"
              />
              {errors?.title && (
                <ErrorMessage message={errors?.title?.message || ""} />
              )}
            </div>
          </div>
          <div className="col-lg-12">
            <div className="tp-dashboard-new-input">
              <label>Description</label>
              <textarea
                placeholder="Write a few lines about your property something which is special and makes your property stand out. Please do not mention your contact details in any format."
                {...register("description")}
                style={{ borderRadius: "8px" }}
              ></textarea>
              {errors?.description && (
                <ErrorMessage message={errors?.description?.message || ""} />
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <div className="tp-dashboard-new-input">
              <label> Listing Type </label>
              <div className="tp-property-tabs-select tp-select">
                <select
                  {...register("listingType")}
                  className="listDropDown"
                  onChange={(e) => {
                    const value = e.target.value;
                    sessionStorage.setItem("listingType", value);
                    window.dispatchEvent(new Event("listingTypeChanged"));
                  }}
                >
                  <option value="">Select</option>
                  <option value="rent">Rent</option>
                  <option value="sale">Sale</option>
                </select>
              </div>
              <div>
                {errors?.listingType && (
                  <ErrorMessage message={errors?.listingType?.message || ""} />
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="tp-dashboard-new-input">
              <label>Property Type </label>
              <div className="tp-property-tabs-select tp-select">
                <select {...register("propertyType")} className="listDropDown">
                  <option value="">Select</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Condominium">Condominium</option>
                  <option value="Landed House">Landed House</option>
                  <option value="Landed House">Bungalow</option>
                  <option value="Landed House">Serviced Residence</option>
                  <option value="Landed House">Office</option>
                  <option value="Landed House">Shop Lot</option>
                  <option value="Landed House">Land</option>
                </select>
              </div>
              <div>
                {errors?.propertyType && (
                  <ErrorMessage message={errors?.propertyType?.message || ""} />
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="tp-dashboard-new-input">
              <label>Tenure</label>
              <div className="tp-property-tabs-select tp-select">
                <select {...register("tenure")} className="listDropDown">
                  <option value="">Select</option>
                  <option value="freehold">Freehold</option>
                  <option value="leasehold">Leasehold</option>
                </select>
              </div>
              <div>
                {errors?.tenure && (
                  <ErrorMessage message={errors?.tenure?.message || ""} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
