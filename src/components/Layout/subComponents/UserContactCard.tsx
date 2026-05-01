"use client";

import userImg from "../../../../public/assets/img/team/team-details/user.png";
import { SocialLinksThree } from "@/components/UI/SocialLinks";
import { CallThreeSvg, TeamEmailSvg } from "@/components/SVG";
import Image from "next/image";
import Link from "next/link";

export default function UserContactCard() {
  const agentWhatsAppNumberLabel = "+601126368426";
  const agentWhatsAppNumber = agentWhatsAppNumberLabel.replace(/\D/g, "");

  const handleWhatsAppClick = () => {
    const url = window.location.href;
    window.open(
      `https://wa.me/${agentWhatsAppNumber}?text=${encodeURIComponent(url)}`,
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
                <Image src={userImg} alt="user image" />
              </div>
              <div className="tp-team-details-info-user-content">
                <h4>David Hussy</h4>
                <p>25 Property</p>
              </div>
            </div>
            <div className="tp-team-details-info-user-social text-center">
              <SocialLinksThree />
            </div>
          </div>
          <div className="tp-team-details-info-content text-center">
            <div className="tp-team-details-info-contact">
              <Link href={`tel:${agentWhatsAppNumberLabel}`}>
                {" "}
                <span>
                  <CallThreeSvg width="16" height="16" />
                </span>
                {agentWhatsAppNumberLabel}
              </Link>
              <Link href="mailto:hi@gmail.com">
                <span>
                  <TeamEmailSvg />
                </span>
                agent@gmail.com
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
                  <b className="text-1">Contact on Whatsapp</b>
                  <b className="text-2">Contact on Whatsapp</b>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
