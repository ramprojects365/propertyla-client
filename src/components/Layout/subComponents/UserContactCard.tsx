"use client";

import { SocialLinksThree } from "@/components/UI/SocialLinks";
import { CallThreeSvg, TeamEmailSvg } from "@/components/SVG";
import Image from "next/image";
import Link from "next/link";

interface UserContactCardProps {
  user?: {
    id?: string;
    username?: string;
    email?: string;
    phoneNumber?: string;
    profileImage?: string;
    fullName?: string;
    bio?: string;
    companyName?: string;
    designation?: string;
    experienceYears?: number;
    emailVerified?: boolean;
    createdAt?: string;
    updatedAt?: string;
  };
}

export default function UserContactCard({ user }: UserContactCardProps) {
  // Use dynamic data if available, otherwise fallback to default
  const agentName = user?.username || "";
  const agentPhone = user?.phoneNumber || "";
  const agentEmail = user?.email || "agent@propertyla.com.my";
  const agentImage =
    user?.profileImage || "/assets/img/team/team-details/user.png";
  const agentWhatsAppNumberLabel = user?.phoneNumber || "";
  const agentWhatsAppNumber = agentWhatsAppNumberLabel.replace(/\D/g, "");

  const handleWhatsAppClick = () => {
    const url = window.location.href;
    const message = encodeURIComponent(
      `Hi, I'm interested in this property and would like to know more ${url}`,
    );
    window.open(
      `https://wa.me/${agentPhone.replace(/\D/g, "")}?text=${message}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  // Create clean agent profile URL with full user data
  const getAgentProfileUrl = () => {
    if (!user) return `/property-agent/david-hussy-2987852`;

    // Use user ID or create a slug from name
    const slug: string = user.username || "";
    const cleanSlug = slug
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    // Serialize user data to pass to agent page
    // Use actual API data if available, otherwise use defaults
    const userData = {
      id: user.id || cleanSlug,
      username: user.username || "",
      email: user.email || "",
      phoneNumber: user.phoneNumber || "",
      profileImage: user.profileImage || "",
      fullName: user.fullName || user.username || "",
      designation: user.designation || "Real Estate Agent",
      experienceYears: user.experienceYears || 5,
      bio:
        user.bio ||
        "Professional real estate agent specializing in Malaysian properties.",
      companyName: user.companyName || "",
      emailVerified: user.emailVerified ?? true,
      createdAt: user.createdAt || new Date().toISOString(),
      updatedAt: user.updatedAt || new Date().toISOString(),
    };

    const encodedData = btoa(JSON.stringify(userData));
    return `/property-agent/${cleanSlug}?data=${encodedData}`;
  };

  return (
    <>
      <div className="tp-team-details-widget mb-40">
        <div className="tp-team-details-info-box">
          <div className="tp-team-details-info-top">
            <div className="tp-team-details-info-user d-flex align-items-center">
              <div className="tp-team-details-info-user-thumb">
                <Image
                  src={agentImage}
                  alt={agentName}
                  width={50}
                  height={50}
                />
              </div>
              <div className="tp-team-details-info-user-content">
                <Link
                  href={getAgentProfileUrl()}
                  style={{
                    textDecoration: "underline",
                    textUnderlineOffset: "3px",
                    color: "#fff",
                    fontSize: "14px",
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  {agentName}
                </Link>
                <p>Property Consultant</p>
              </div>
            </div>
            <div className="tp-team-details-info-user-social text-center">
              <SocialLinksThree />
            </div>
          </div>
          <div className="tp-team-details-info-content text-center">
            <div className="tp-team-details-info-contact">
              <Link href={`tel:${agentWhatsAppNumber}`}>
                <span>
                  <CallThreeSvg width="16" height="16" />
                </span>
                {agentPhone}
              </Link>
              <Link href={`mailto:${agentEmail}`}>
                <span>
                  <TeamEmailSvg />
                </span>
                {agentEmail}
              </Link>
            </div>
            <div className="tp-header-dashboard-btn d-md-block">
              <button
                type="button"
                className="tp-btn"
                onClick={handleWhatsAppClick}
                style={{ background: "rgb(37, 211, 102)" }}
              >
                <span className="btn-wrap">
                  <b className="text-1">Enquiry on Whatsapp</b>
                  <b className="text-2">Enquiry on Whatsapp</b>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
