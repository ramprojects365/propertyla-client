"use client";

import { SocialLinksThree } from "@/components/UI/SocialLinks";
import { CallThreeSvg, TeamEmailSvg } from "@/components/SVG";
import Image from "next/image";
import Link from "next/link";

// Define the user interface to match API response
interface UserContactCardProps {
  user?: {
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
  };
}

export default function UserContactCard({ user }: UserContactCardProps) {
  // Use dynamic data if available, otherwise fallback to default
  const agentName = user?.fullName || user?.username || "David Hussy";
  const agentPhone = user?.phoneNumber || "+601126368426";
  const agentEmail = user?.email || "agent@propertyla.com.my";
  const agentImage = user?.profileImage || "/assets/img/team/team-details/user.png";
  const agentProperties = 25; // This would come from API in real implementation

  const handleWhatsAppClick = () => {
    const url = window.location.href;
    const message = encodeURIComponent(`Hi ${agentName}, I'm interested in this property and would like to know more.`);
    window.open(
      `https://wa.me/${agentPhone.replace(/\D/g, '')}?text=${message}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <>
      <div className="tp-team-details-widget mb-40">
        <div className="tp-team-details-info-box">
          <div className="tp-team-details-info-top">
            <div className="tp-team-details-info-user d-flex align-items-center">
              <div className="tp-team-details-info-user-thumb">
                <Image src={agentImage} alt={agentName} width={50} height={50} />
              </div>
              <div className="tp-team-details-info-user-content">
                <Link href={`/property-agent/${user?.id || agentName.toLowerCase().replace(/\s+/g, '-')}/#Agent-RightSideProfile`} style={{ textDecoration: "underline", color: "#003B5C" }}>
                  <h4 style={{ margin: 0, cursor: "pointer" }}>{agentName}</h4>
                </Link>
                <p>{agentProperties} Property</p>
              </div>
            </div>
            <div className="tp-team-details-info-user-social text-center">
              <SocialLinksThree />
            </div>
          </div>
          <div className="tp-team-details-info-content text-center">
            <div className="tp-team-details-info-contact">
              <Link href={`tel:${agentPhone}`}>
                {" "}
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
