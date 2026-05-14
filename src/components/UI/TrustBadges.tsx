"use client";
import React from "react";

export default function TrustBadges() {
  return (
    <div className="trust-badges" style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginTop: "20px", justifyContent: "center" }}>
      <div className="trust-badge" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#666" }}>
        <span style={{ fontSize: "18px" }}>✓</span>
        <span>Verified Agents</span>
      </div>
      <div className="trust-badge" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#666" }}>
        <span style={{ fontSize: "18px" }}>🔒</span>
        <span>Secure Platform</span>
      </div>
      <div className="trust-badge" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#666" }}>
        <span style={{ fontSize: "18px" }}>🏆</span>
        <span>Top Rated</span>
      </div>
      <div className="trust-badge" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#666" }}>
        <span style={{ fontSize: "18px" }}>👥</span>
        <span>10,000+ Users</span>
      </div>
    </div>
  );
}
