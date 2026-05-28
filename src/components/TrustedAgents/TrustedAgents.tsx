"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { API_BASE_URL } from "@/config/constants";
import { useTranslation } from "@/contexts/LanguageContext";

interface Agent {
  id: string;
  name: string;
  agentId: string;
  email: string;
  image: string;
  rating: number;
  properties: number;
}

interface User {
  id?: string;
  username?: string;
  email?: string;
  phoneNumber?: string;
  userType?: string | null;
  profileImage?: string;
  fullName?: string;
  bio?: string;
  companyName?: string;
  designation?: string;
  experienceYears?: number;
  renNumber?: string | null;
  renStatus?: string | null;
  renVerified?: boolean;
  renStatusLabel?: string;
  emailVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const trustedAgents: Agent[] = [
  {
    id: "1",
    name: "Fara",
    agentId: "PEA 3329",
    email: "faizzatulfarhana2020@gmail.com",
    image: "/assets/img/team/team-details/fara.jpg",
    rating: 4.9,
    properties: 120,
  },
  {
    id: "2",
    name: "MR.PUI",
    agentId: "PEA 2457)",
    email: "puits888@gmail.com",
    image: "/assets/img/team/team-details/pui.jpg",
    rating: 4.7,
    properties: 95,
  },
  {
    id: "3",
    name: "Eddie",
    agentId: "REN 4234",
    email: "",
    image: "/assets/img/team/team-details/eddie.jpg",
    rating: 3.1,
    properties: 34,
  },
];

export default function TrustedAgents() {
  const [userMap, setUserMap] = useState<Record<string, User>>({});
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchUsersFromProperties = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/properties`);
        if (!res.ok) throw new Error("Failed to fetch properties");

        const data = await res.json();
        const properties = Array.isArray(data) ? data : data?.data || [];

        // Extract unique users from properties
        const usersMap: Record<string, User> = {};
        properties.forEach((property: any) => {
          if (property.user && property.user.email) {
            usersMap[property.user.email] = property.user;
          }
        });

        setUserMap(usersMap);
      } catch (error) {
        console.error("Error fetching users from properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersFromProperties();
  }, []);

  const getAgentProfileUrl = (agent: Agent): string => {
    const userData = userMap[agent.email];

    if (!userData) {
      // Fallback: use agent ID if no user data found
      return `/property-agent/${agent.id}`;
    }

    const slug: string = userData.username || agent.name;
    const cleanSlug = slug
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    const renVerified =
      userData.renVerified === true || userData.renStatus === "verified";
    const renStatusLabel =
      userData.renStatusLabel || (renVerified ? "Verified" : "Not verified");

    const userDataForUrl = {
      id: userData.id || cleanSlug,
      username: userData.username || agent.name,
      email: userData.email || agent.email,
      phoneNumber: userData.phoneNumber || "",
      userType: userData.userType || "",
      profileImage: userData.profileImage || agent.image,
      fullName: userData.fullName || userData.username || agent.name,
      designation: userData.designation || "Real Estate Agent",
      experienceYears: userData.experienceYears || 5,
      bio:
        userData.bio ||
        "Professional real estate agent specializing in Malaysian properties.",
      companyName: userData.companyName || "",
      renNumber: userData.renNumber || agent.agentId,
      renStatus: userData.renStatus || "not_verified",
      renVerified,
      renStatusLabel,
      emailVerified: userData.emailVerified ?? true,
      createdAt: userData.createdAt || new Date().toISOString(),
      updatedAt: userData.updatedAt || new Date().toISOString(),
    };

    const jsonString = JSON.stringify(userDataForUrl);
    const encodedData = btoa(encodeURIComponent(jsonString));
    const finalUrl = `/property-agent/${cleanSlug}?data=${encodedData}`;
    return finalUrl;
  };

  if (loading) {
    return (
      <section style={{ padding: "60px 0" }}>
        <div className="container">
          <div className="text-center">
            <p>Loading trusted partners...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={{ padding: "60px 0" }}>
      <div className="container">
        <div className="text-center mb-5 pb-15">
          <h2
            style={{
              fontSize: "32px",
              fontWeight: 700,
              color: "#003B5C",
              marginBottom: "15px",
            }}
          >
            {t("home.trustedPartners")}
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "#666",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            {t("home.meetPropertyConsultants")}
          </p>
        </div>

        {/* Horizontal Scroll Container */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            overflowX: "auto",
            paddingBottom: "20px",
            scrollBehavior: "smooth",
            scrollbarWidth: "thin",
            scrollbarColor: "#003B5C #f0f0f0",
          }}
          className="trusted-agents-scroll"
        >
          {trustedAgents.map((agent) => (
            <Link
              key={agent.id}
              href={getAgentProfileUrl(agent)}
              style={{
                textDecoration: "none",
                flex: "0 0 auto",
                minWidth: "140px",
                maxWidth: "200px",
              }}
            >
              <div
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  padding: "20px",
                  textAlign: "center",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                  transition: "all 0.3s ease",
                  border: "1px solid #e0e0e0",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 20px rgba(0, 59, 92, 0.15)";
                  e.currentTarget.style.borderColor = "#003B5C";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0, 0, 0, 0.08)";
                  e.currentTarget.style.borderColor = "#e0e0e0";
                }}
              >
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    margin: "0 auto 15px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "1px solid #003B5C",
                  }}
                >
                  <Image
                    src={agent.image}
                    alt={agent.name}
                    width={100}
                    height={100}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#003B5C",
                    marginBottom: "5px",
                  }}
                >
                  {agent.name}
                </h3>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#666",
                    marginBottom: "10px",
                  }}
                >
                  {agent.agentId}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "5px",
                    fontSize: "12px",
                    color: "#666",
                    marginBottom: "5px",
                  }}
                >
                  <span style={{ color: "#FFA500" }}>★</span>
                  <span>{agent.rating}</span>
                </div>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#666",
                  }}
                >
                  {agent.properties} Properties
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Custom scrollbar styling */}
        <style jsx>{`
          .trusted-agents-scroll::-webkit-scrollbar {
            height: 8px;
          }
          .trusted-agents-scroll::-webkit-scrollbar-track {
            background: #f0f0f0;
            border-radius: 4px;
          }
          .trusted-agents-scroll::-webkit-scrollbar-thumb {
            background: #003b5c;
            border-radius: 4px;
          }
          .trusted-agents-scroll::-webkit-scrollbar-thumb:hover {
            background: #0056b3;
          }
        `}</style>
      </div>
    </section>
  );
}
