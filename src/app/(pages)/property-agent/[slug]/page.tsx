"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CallThreeSvg, TeamEmailSvg, MessageSvgTwo } from "@/components/SVG";

// Define the agent interface to match API response
interface AgentData {
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
  profileImage?: string;
  fullName?: string;
  bio?: string;
  companyName?: string;
  icPassport?: string;
  designation?: string;
  experienceYears?: number;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

// Function to parse user data from URL parameters
const parseUserDataFromUrl = (): AgentData | null => {
  if (typeof window === "undefined") return null;

  const urlParams = new URLSearchParams(window.location.search);
  const userDataParam = urlParams.get("data");

  if (!userDataParam) return null;

  try {
    const userData = JSON.parse(atob(userDataParam));
    return userData;
  } catch (error) {
    console.error("Error parsing user data from URL:", error);
    return null;
  }
};

export default function PropertyAgentPage() {
  // Get slug from URL for client-side routing
  const [slug, setSlug] = React.useState<string>("");
  
  React.useEffect(() => {
    // Extract slug from URL path
    const pathParts = window.location.pathname.split('/');
    const slugFromPath = pathParts[pathParts.length - 1];
    if (slugFromPath) {
      setSlug(slugFromPath);
    }
  }, []);

  // For now, create a simple agent data structure
  // In real implementation, this would fetch from API using the slug
  const agent: AgentData = {
    id: slug,
    username: slug,
    email: "agent@propertyla.com.my",
    phoneNumber: "+601126368426",
    fullName: slug.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
    designation: "Real Estate Agent",
    experienceYears: 5,
    bio: "Professional real estate agent specializing in Malaysian properties.",
    emailVerified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  // For now, create a simple agent data structure

  if (!agent) {
    return (
      <div className="container text-center py-5">
        <div
          className="spinner-border"
          role="status"
          style={{ color: "#003B5C" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading agent profile...</p>
      </div>
    );
  }

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `Hi ${agent.fullName || agent.username}, I found your profile on PropertyLA and would like to inquire about property services.`,
    );
    window.open(
      `https://wa.me/${agent.phoneNumber.replace(/\D/g, "")}?text=${message}`,
      "_blank",
    );
  };

  return (
    <>
      {/* Breadcrumb Area Start */}
      <section
        className="tp-breadcrumb-area pt-25 pb-10"
        style={{ backgroundColor: "#f8f9ff" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="tp-breadcrumb">
                <nav>
                  <Link 
                    href="/"
                    style={{ 
                      position: "relative", 
                      display: "inline-block",
                      textDecoration: "underline",
                      color: "#003B5C"
                    }}
                  >
                    Home
                  </Link>
                  {" / "}
                  <span style={{ color: "#666" }}>{agent.fullName || agent.username}</span>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agent Profile Area Start */}
      <section className="tp-agent-profile-area pt-40 pb-100">
        <div className="container">
          <div className="row">
            {/* Left Column - Agent Info */}
            <div className="col-lg-4">
              <div className="tp-agent-profile-card">
                <div className="tp-agent-profile-header">
                  <div className="tp-agent-profile-image">
                    <Image
                      src={
                        agent.profileImage ||
                        "/assets/img/team/team-details/user.png"
                      }
                      alt={agent.fullName || agent.username}
                      width={200}
                      height={200}
                      style={{ borderRadius: "50%", objectFit: "cover" }}
                    />
                  </div>
                  <div className="tp-agent-profile-basic-info">
                    <h2 className="tp-agent-profile-name">
                      {agent.fullName || agent.username}
                    </h2>
                    <p className="tp-agent-profile-designation">
                      {agent.designation || "Real Estate Agent"}
                    </p>
                    <div className="tp-agent-profile-stats">
                      <div className="stat-item">
                        <span className="stat-number">25</span>
                        <span className="stat-label">Properties</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-number">
                          {agent.experienceYears || 0}
                        </span>
                        <span className="stat-label">Years Exp</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="tp-agent-profile-contact">
                  <h3 className="tp-agent-profile-section-title">
                    Contact Information
                  </h3>
                  <div className="contact-info-list">
                    <div className="contact-item">
                      <div className="contact-icon">
                        <CallThreeSvg width="16" height="16" />
                      </div>
                      <div className="contact-details">
                        <span className="contact-label">Phone</span>
                        <Link
                          href={`tel:${agent.phoneNumber}`}
                          className="contact-value"
                        >
                          {agent.phoneNumber}
                        </Link>
                      </div>
                    </div>
                    <div className="contact-item">
                      <div className="contact-icon">
                        <TeamEmailSvg />
                      </div>
                      <div className="contact-details">
                        <span className="contact-label">Email</span>
                        <Link
                          href={`mailto:${agent.email}`}
                          className="contact-value"
                        >
                          {agent.email}
                        </Link>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="tp-btn w-100"
                    onClick={handleWhatsAppClick}
                    style={{ background: "rgb(37, 211, 102)" }}
                  >
                    <span className="btn-wrap">
                      <MessageSvgTwo />
                      WhatsApp
                    </span>
                  </button>
                </div>

                {/* About Section */}
                <div
                  className="tp-agent-profile-section"
                  style={{ paddingTop: "10px" }}
                >
                  <h3 className="tp-agent-profile-section-title">
                    About {agent.fullName || agent.username}
                  </h3>
                  <div className="tp-agent-profile-about">
                    <p>{agent.bio || "No bio available."}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="col-lg-8">
              <div className="tp-agent-profile-details">
                {/* Professional Information */}
                <div className="tp-agent-profile-section">
                  <h3 className="tp-agent-profile-section-title">
                    Professional Information
                  </h3>
                  <div className="tp-agent-professional-info">
                    <div className="info-grid">
                      <div className="info-item">
                        <span className="info-label">Company Name</span>
                        <span className="info-value">
                          {agent.companyName || "N/A"}
                        </span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Designation</span>
                        <span className="info-value">
                          {agent.designation || "Real Estate Agent"}
                        </span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Experience</span>
                        <span className="info-value">
                          {agent.experienceYears || 0} Years
                        </span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">IC/Passport</span>
                        <span className="info-value">
                          {agent.icPassport || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="tp-agent-profile-section">
                  <h3 className="tp-agent-profile-section-title">
                    Send Message to {agent.fullName || agent.username}
                  </h3>
                  <div className="tp-agent-contact-form">
                    <form className="contact-form">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Your Name *</label>
                            <input
                              type="text"
                              className="form-control"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Your Email *</label>
                            <input
                              type="email"
                              className="form-control"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Your Phone *</label>
                            <input
                              type="tel"
                              className="form-control"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Subject *</label>
                            <input
                              type="text"
                              className="form-control"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group">
                            <label>Your Message *</label>
                            <textarea
                              className="form-control"
                              rows={5}
                              required
                            ></textarea>
                          </div>
                        </div>
                        <div className="col-12">
                          <button type="submit" className="tp-btn">
                            Send Message
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .tp-agent-profile-area {
          background-color: #f8f9ff;
        }
        .tp-agent-profile-card {
          background: white;
          border-radius: 10px;
          padding: 30px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
          margin-bottom: 30px;
        }
        .tp-agent-profile-header {
          text-align: center;
          margin-bottom: 30px;
        }
        .tp-agent-profile-name {
          font-size: 28px;
          font-weight: 600;
          color: #003b5c;
          margin-bottom: 5px;
        }
        .tp-agent-profile-designation {
          color: #666;
          margin-bottom: 20px;
        }
        .tp-agent-profile-stats {
          display: flex;
          justify-content: center;
          gap: 30px;
          margin-bottom: 20px;
        }
        .stat-item {
          text-align: center;
        }
        .stat-number {
          display: block;
          font-size: 24px;
          font-weight: 600;
          color: #003b5c;
        }
        .stat-label {
          font-size: 14px;
          color: #666;
        }
        .tp-agent-profile-section {
          margin-bottom: 30px;
        }
        .tp-agent-profile-section-title {
          font-size: 18px;
          font-weight: 600;
          color: #003b5c;
          margin-bottom: 15px;
        }
        .contact-info-list {
          margin-bottom: 20px;
        }
        .contact-item {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
        }
        .contact-icon {
          margin-right: 15px;
          color: #003b5c;
        }
        .contact-label {
          display: block;
          font-size: 14px;
          color: #666;
        }
        .contact-value {
          color: #003b5c;
          text-decoration: none;
        }
        .contact-value:hover {
          text-decoration: underline;
        }
        .tp-agent-profile-about p {
          color: #666;
          line-height: 1.6;
        }
        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }
        .info-item {
          display: flex;
          justify-content: space-between;
          padding: 15px;
          background: #f8f9ff;
          border-radius: 5px;
        }
        .info-label {
          color: #666;
          font-weight: 500;
        }
        .info-value {
          color: #003b5c;
          font-weight: 600;
        }
        .tp-agent-contact-form .form-group {
          margin-bottom: 20px;
        }
        .tp-agent-contact-form label {
          color: #333;
          font-weight: 500;
          margin-bottom: 8px;
        }
        .tp-agent-contact-form .form-control {
          border: 1px solid #ddd;
          border-radius: 5px;
          padding: 12px;
          font-size: 14px;
        }
        .tp-agent-contact-form .form-control:focus {
          border-color: #003b5c;
          box-shadow: 0 0 0 0.2rem rgba(0, 59, 92, 0.25);
        }
      `}</style>
    </>
  );
}
