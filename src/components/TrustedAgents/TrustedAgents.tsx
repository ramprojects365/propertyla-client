"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Agent {
  id: string;
  name: string;
  agentId: string;
  image: string;
  rating: number;
  properties: number;
}

const trustedAgents: Agent[] = [
  {
    id: "david-hussy-2987852",
    name: "David Hussy",
    agentId: "REN 1234",
    image: "/assets/img/team/team-details/user.png",
    rating: 4.8,
    properties: 150,
  },
  {
    id: "sarah-lim-2987853",
    name: "Sarah Lim",
    agentId: "REN 1234",
    image: "/assets/img/team/team-details/user.png",
    rating: 4.9,
    properties: 120,
  },
  {
    id: "ahmad-khan-2987854",
    name: "Ahmad Khan",
    agentId: "REN 1234",
    image: "/assets/img/team/team-details/user.png",
    rating: 4.7,
    properties: 95,
  },
  {
    id: "jennifer-lee-2987855",
    name: "Jennifer Lee",
    agentId: "REN 1234",
    image: "/assets/img/team/team-details/user.png",
    rating: 4.8,
    properties: 110,
  },
  {
    id: "michael-tan-2987856",
    name: "Michael Tan",
    agentId: "REN 1234",
    image: "/assets/img/team/team-details/user.png",
    rating: 4.6,
    properties: 85,
  },
  {
    id: "fatima-ali-2987857",
    name: "Fatima Ali",
    agentId: "REN 1234",
    image: "/assets/img/team/team-details/user.png",
    rating: 4.9,
    properties: 130,
  },
];

export default function TrustedAgents() {
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
            Trusted Agents
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "#666",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Meet our verified and experienced property consultants
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
              href={`/property-agent/${agent.id}`}
              style={{
                textDecoration: "none",
                flex: "0 0 auto",
                minWidth: "200px",
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
