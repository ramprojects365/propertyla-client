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
  const agentName = user?.username ?? "Ram Gollapalli";
  const agentEmail = user?.email ?? "ramgollapalli88@gmail.com";
  const agentWhatsAppNumberLabel = user?.phoneNumber ?? "+601126368426";
  const agentWhatsAppNumber = agentWhatsAppNumberLabel.replace(/\D/g, "");
  const agentImage = user?.profileImage?.trim() || null;

  const handleWhatsAppClick = () => {
    const url = window.location.href;
    window.open(
      `https://wa.me/${agentWhatsAppNumber}?text=${encodeURIComponent(url)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  // Create agent profile URL with user data as parameters
  const getAgentProfileUrl = () => {
    if (!user) return `/property-agent/ram-gollapalli`;

    const userData = btoa(JSON.stringify(user)); // Encode user data
    return `/property-agent/${agentName
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")}?data=${userData}`;
  };

  return (
    <>
      <div className="tp-team-details-widget mb-40">
        <div className="tp-team-details-info-box">
          <div className="tp-team-details-info-top">
            <div className="tp-team-details-info-user d-flex align-items-center">
              <div className="tp-team-details-info-user-thumb">
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
                <Link
                  href={getAgentProfileUrl()}
                  style={{ textDecoration: "underline", color: "#003B5C" }}
                >
                  <span
                    style={{
                      margin: 0,
                      cursor: "pointer",
                      color: "#fff",
                      textDecoration: "underline",
                    }}
                  >
                    {agentName}
                  </span>
                </Link>
                <p>{user?.email ? "Property Agent" : "25 Property"}</p>
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
                {agentWhatsAppNumberLabel}
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
