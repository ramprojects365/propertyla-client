"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const LISTING_TYPES = ["", "rent", "buy", "new"];

export default function SearchRefineBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Fall back to "address" param (sent by homepage search bar)
  const [keyWord, setKeyWord] = useState(
    searchParams.get("q") ||
      searchParams.get("address") ||
      searchParams.get("keyWord") ||
      "",
  );
  const [type, setType] = useState(searchParams.get("type") || "");
  const [city, setCity] = useState(searchParams.get("city") || "");
  const [propertyName, setPropertyName] = useState(
    searchParams.get("propertyName") ||
      searchParams.get("q") ||
      searchParams.get("address") ||
      "",
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyWord.trim()) params.set("q", keyWord.trim());
    if (type) params.set("type", type);
    if (city.trim()) params.set("city", city.trim());
    if (propertyName.trim()) params.set("propertyName", propertyName.trim());
    router.push(`/search?${params.toString()}`);
  };

  const inputStyle: React.CSSProperties = {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px 14px",
    fontSize: "14px",
    width: "100%",
    outline: "none",
    background: "#fff",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "12px",
    fontWeight: 600,
    color: "#555",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "6px",
    display: "block",
  };

  return (
    <div
      style={{
        background: "#f8f9ff",
        border: "1px solid #e8e8f0",
        borderRadius: "8px",
        padding: "20px 24px",
        marginBottom: "32px",
      }}
    >
      <form onSubmit={handleSearch}>
        <div className="row g-3 align-items-end">
          {/* Keyword / Property */}
          <div className="col-lg-3 col-md-6">
            <label style={labelStyle}>Keyword</label>
            <input
              type="text"
              style={inputStyle}
              placeholder="Ex. luxury, studio..."
              value={keyWord}
              onChange={(e) => setKeyWord(e.target.value)}
            />
          </div>

          {/* Property Name */}
          <div className="col-lg-3 col-md-6">
            <label style={labelStyle}>Property Name</label>
            <input
              type="text"
              style={inputStyle}
              placeholder="Ex. Susana Sentral"
              value={propertyName}
              onChange={(e) => setPropertyName(e.target.value)}
            />
          </div>

          {/* City */}
          <div className="col-lg-2 col-md-6">
            <label style={labelStyle}>City</label>
            <input
              type="text"
              style={inputStyle}
              placeholder="Ex. Kuala Lumpur"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          {/* Type */}
          <div className="col-lg-2 col-md-6">
            <label style={labelStyle}>Listing Type</label>
            <select
              style={{ ...inputStyle, appearance: "auto" }}
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              {LISTING_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t === ""
                    ? "All Types"
                    : t.charAt(0).toUpperCase() + t.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <div className="col-lg-2 col-md-12">
            <button
              type="submit"
              style={{
                width: "100%",
                background: "#003B5C",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "11px 16px",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                letterSpacing: "0.3px",
              }}
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
