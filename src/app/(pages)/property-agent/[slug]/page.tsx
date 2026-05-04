"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import { CallThreeSvg, TeamEmailSvg, MessageSvgTwo } from "@/components/SVG";
import userImg from "../../../../../public/assets/img/team/team-details/user.png";

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

// Function to fetch agent data from API by slug
const fetchAgentBySlug = async (slug: string) => {
  try {
    const base = process.env.NEXT_PUBLIC_API_BASE ?? "http://159.223.92.101:3008";
    const response = await fetch(`${base}/api/users/slug/${slug}`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    return data.data || data; // Handle different response formats
  } catch (error) {
    console.error('Error fetching agent data:', error);
    return null;
  }
};

// Function to fetch agent data by ID as fallback
const fetchAgentById = async (agentId: string) => {
  try {
    const base = process.env.NEXT_PUBLIC_API_BASE ?? "http://159.223.92.101:3008";
    const response = await fetch(`${base}/api/users/${agentId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    return data.data || data; // Handle different response formats
  } catch (error) {
    console.error('Error fetching agent data:', error);
    return null;
  }
};

export default function PropertyAgentPage({ params }: { params: { slug: string } }) {
  const [agent, setAgent] = useState<AgentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAgent = async () => {
      const resolvedParams = await params;
      const slug = resolvedParams.slug;
      
      if (!slug) {
        notFound();
        return;
      }
      
      let agentData = await fetchAgentBySlug(slug);
      
      // If slug doesn't work, try as ID
      if (!agentData) {
        agentData = await fetchAgentById(slug);
      }
      
      if (!agentData) {
        notFound();
        return;
      }
      
      setAgent(agentData);
      setLoading(false);
    };

    loadAgent();
  }, [params]);

  if (loading || !agent) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border" role="status" style={{ color: "#003B5C" }}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading agent profile...</p>
      </div>
    );
  }

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(`Hi ${agent.fullName || agent.username}, I found your profile on PropertyLA and would like to inquire about property services.`);
    window.open(`https://wa.me/${agent.phoneNumber.replace(/\D/g, '')}?text=${message}`, "_blank");
  };

  return (
    <>
      {/* Breadcrumb Area Start */}
      <section className="tp-breadcrumb-area pt-25 pb-10" style={{ backgroundColor: "#f8f9ff" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="tp-breadcrumb">
                <Breadcrumb
                  items={[
                    { label: "Home", href: "/" },
                    { label: "Property Agent", href: "/property-agent" },
                    { label: agent.fullName || agent.username }
                  ]}
                />
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
                      src={agent.profileImage || "/assets/img/team/team-details/user.png"} 
                      alt={agent.fullName || agent.username}
                      width={200}
                      height={200}
                      style={{ borderRadius: "50%", objectFit: "cover" }}
                    />
                  </div>
                  <div className="tp-agent-profile-basic-info">
                    <h2 className="tp-agent-profile-name">{agent.fullName || agent.username}</h2>
                    <p className="tp-agent-profile-designation">{agent.designation || "Real Estate Agent"}</p>
                    <div className="tp-agent-profile-stats">
                      <div className="stat-item">
                        <span className="stat-number">25</span>
                        <span className="stat-label">Properties</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-number">{agent.experienceYears || 0}</span>
                        <span className="stat-label">Years Exp</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="tp-agent-profile-contact">
                  <h3 className="tp-agent-profile-section-title">Contact Information</h3>
                  <div className="contact-info-list">
                    <div className="contact-item">
                      <div className="contact-icon">
                        <CallThreeSvg width="16" height="16" />
                      </div>
                      <div className="contact-details">
                        <span className="contact-label">Phone</span>
                        <Link href={`tel:${agent.phoneNumber}`} className="contact-value">
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
                        <Link href={`mailto:${agent.email}`} className="contact-value">
                          {agent.email}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="tp-agent-profile-actions">
                  <button 
                    onClick={handleWhatsAppClick}
                    className="tp-btn tp-btn-whatsapp w-100 mb-15"
                    style={{ background: "#25d366", border: "none" }}
                  >
                    <i className="fab fa-whatsapp me-2"></i>
                    Chat on WhatsApp
                  </button>
                  <Link href="#contact-form" className="tp-btn w-100">
                    Send Message
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="col-lg-8">
              <div className="tp-agent-profile-details">
                {/* About Section */}
                <div className="tp-agent-profile-section" id="Agent-RightSideProfile">
                  <h3 className="tp-agent-profile-section-title">About {agent.fullName || agent.username}</h3>
                  <div className="tp-agent-profile-about">
                    <p>{agent.bio || "No bio available."}</p>
                  </div>
                </div>

                {/* Professional Information */}
                <div className="tp-agent-profile-section">
                  <h3 className="tp-agent-profile-section-title">Professional Information</h3>
                  <div className="tp-agent-professional-info">
                    <div className="info-grid">
                      <div className="info-item">
                        <span className="info-label">Company Name</span>
                        <span className="info-value">{agent.companyName || "N/A"}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Designation</span>
                        <span className="info-value">{agent.designation || "Real Estate Agent"}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Experience</span>
                        <span className="info-value">{agent.experienceYears || 0} Years</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">IC/Passport</span>
                        <span className="info-value">{agent.icPassport || "N/A"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="tp-agent-profile-section" id="contact-form">
                  <h3 className="tp-agent-profile-section-title">Send Message to {agent.fullName || agent.username}</h3>
                  <div className="tp-agent-contact-form">
                    <form className="contact-form">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Your Name *</label>
                            <input type="text" className="form-control" required />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Your Email *</label>
                            <input type="email" className="form-control" required />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Your Phone *</label>
                            <input type="tel" className="form-control" required />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Subject</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group">
                            <label>Message *</label>
                            <textarea className="form-control" rows={5} required></textarea>
                          </div>
                        </div>
                        <div className="col-12">
                          <button type="submit" className="tp-btn">
                            <span className="btn-wrap">
                              <b className="text-1">Send Message</b>
                              <b className="text-2">Send Message</b>
                            </span>
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
        .tp-agent-profile-card {
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          padding: 30px;
          margin-bottom: 30px;
        }

        .tp-agent-profile-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .tp-agent-profile-image {
          margin-bottom: 20px;
        }

        .tp-agent-profile-name {
          font-size: 28px;
          font-weight: 600;
          color: #003B5C;
          margin-bottom: 8px;
        }

        .tp-agent-profile-designation {
          color: #666;
          font-size: 16px;
          margin-bottom: 20px;
        }

        .tp-agent-profile-stats {
          display: flex;
          justify-content: center;
          gap: 40px;
          margin-bottom: 20px;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          display: block;
          font-size: 24px;
          font-weight: 600;
          color: #003B5C;
        }

        .stat-label {
          font-size: 14px;
          color: #666;
        }

        .tp-agent-profile-section {
          background: #fff;
          border-radius: 12px;
          padding: 30px;
          margin-bottom: 30px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .tp-agent-profile-section-title {
          font-size: 20px;
          font-weight: 600;
          color: #003B5C;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 2px solid #f0f0f0;
        }

        .contact-info-list {
          margin-bottom: 20px;
        }

        .contact-item {
          display: flex;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #f0f0f0;
        }

        .contact-item:last-child {
          border-bottom: none;
        }

        .contact-icon {
          width: 40px;
          height: 40px;
          background: #f8f9fa;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 15px;
          color: #003B5C;
        }

        .contact-details {
          flex: 1;
        }

        .contact-label {
          display: block;
          font-size: 12px;
          color: #666;
          margin-bottom: 4px;
        }

        .contact-value {
          color: #003B5C;
          text-decoration: none;
          font-weight: 500;
        }

        .contact-value:hover {
          text-decoration: underline;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }

        .info-item {
          padding: 15px;
          background: #f8f9fa;
          border-radius: 8px;
        }

        .info-label {
          display: block;
          font-size: 14px;
          color: #666;
          margin-bottom: 5px;
        }

        .info-value {
          font-size: 16px;
          font-weight: 500;
          color: #003B5C;
        }

        .tp-agent-contact-form .form-group {
          margin-bottom: 20px;
        }

        .tp-agent-contact-form .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: #333;
        }

        .tp-agent-contact-form .form-control {
          width: 100%;
          padding: 12px 15px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 14px;
        }

        .tp-agent-contact-form .form-control:focus {
          outline: none;
          border-color: #003B5C;
          box-shadow: 0 0 0 3px rgba(0, 59, 92, 0.1);
        }

        .tp-btn-whatsapp:hover {
          background: #128c7e !important;
        }
      `}</style>
    </>
  );
}
