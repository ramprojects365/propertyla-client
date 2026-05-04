"use client";

import { SocialLinksThree } from "@/components/UI/SocialLinks";
import { CallThreeSvg, TeamEmailSvg } from "@/components/SVG";
import Image from "next/image";
import Link from "next/link";

interface UserContactCardProps {
  user?: {
    username?: string;
    email?: string;
    phoneNumber?: string;
    profileImage?: string;
  };
}

export default function UserContactCard({ user }: UserContactCardProps) {
<<<<<<< HEAD
  // Use dynamic data if available, otherwise fallback to default
  const agentName = user?.fullName || user?.username || "David Hussy";
  const agentPhone = user?.phoneNumber || "+601126368426";
  const agentEmail = user?.email || "agent@propertyla.com.my";
  const agentImage =
    user?.profileImage || "/assets/img/team/team-details/user.png";
  const agentProperties = 25; // This would come from API in real implementation
=======
  const agentName = user?.username ?? "David Hussy";
  const agentEmail = user?.email ?? "hi@gmail.com";
  const agentWhatsAppNumberLabel = user?.phoneNumber ?? "+601126368426";
  const agentWhatsAppNumber = agentWhatsAppNumberLabel.replace(/\D/g, "");
  const agentImage = user?.profileImage?.trim() || null;
>>>>>>> 51e801853711ed0a7bde4cf9c917000dbacbced0

  const handleWhatsAppClick = () => {
    const url = window.location.href;
    const message = encodeURIComponent(
      `Hi ${agentName}, I'm interested in this property and would like to know more.`,
    );
    window.open(
      `https://wa.me/${agentPhone.replace(/\D/g, "")}?text=${message}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  // Create clean agent profile URL
  const getAgentProfileUrl = () => {
    if (!user) return `/property-agent/david-hussy-2987852`;

    // Use user ID or create a slug from name
    const slug = user.fullName || user.username;
    const cleanSlug = slug
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    return `/property-agent/${cleanSlug}`;
  };

  return (
    <>
      <div className="tp-team-details-widget mb-40">
        <div className="tp-team-details-info-box">
          <div className="tp-team-details-info-top">
            <div className="tp-team-details-info-user d-flex align-items-center">
              <div className="tp-team-details-info-user-thumb">
<<<<<<< HEAD
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
                  style={{ textDecoration: "underline", color: "#003B5C" }}
                >
                  <h4 style={{ margin: 0, cursor: "pointer" }}>{agentName}</h4>
                </Link>
                <p>{agentProperties} Property</p>
=======
                {agentImage ? (
                  <Image
                    src={agentImage}
                    alt={agentName}
                    width={60}
                    height={60}
                    style={{ borderRadius: "50%", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      backgroundColor: "white",
                      color: "#003b5c",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "24px",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                    }}
                  >
                    {agentName.charAt(0)}
                  </div>
                )}
              </div>
              <div className="tp-team-details-info-user-content">
                <h4>{agentName}</h4>
                <p>{user?.email ? "Property Agent" : "25 Property"}</p>
>>>>>>> 51e801853711ed0a7bde4cf9c917000dbacbced0
              </div>
            </div>
            <div className="tp-team-details-info-user-social text-center">
              <SocialLinksThree />
            </div>
          </div>
          <div className="tp-team-details-info-content text-center">
            <div className="tp-team-details-info-contact">
              <Link href={`tel:${agentWhatsAppNumberLabel}`}>
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
