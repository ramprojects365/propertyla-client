import logoIcon from "../../../public/assets/img/logo/logo-icon-white.png";
import useGlobalContext from "@/hooks/useContext";
import OffcanvasMenus from "./OffcanvasMenus";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { requireAuth } from "@/utils/auth";

export default function OffcanvasArea() {
  const { openOffcanvas, toggleOffcanvas } = useGlobalContext();

  const handlePostPropertyClick = () => {
    const isAuthenticated = requireAuth("/dashboard/add-new-property");
    // If user is authenticated, navigate to the dashboard
    if (isAuthenticated) {
      toggleOffcanvas(); // Close the offcanvas before navigating
      window.location.href = "/dashboard/add-new-property";
    }
  };

  return (
    <>
      {/* -- offcanvas area start -- */}
      <div
        className={`offcanvas__area ${openOffcanvas ? "offcanvas-opened" : ""}`}
      >
        <div className="offcanvas__close">
          <button
            onClick={toggleOffcanvas}
            className="offcanvas__close-btn offcanvas-close-btn"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 1L1 11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1 1L11 11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="offcanvas__wrapper">
          <div className="offcanvas__content">
            <div className="offcanvas__top mb-40" onClick={toggleOffcanvas}>
              <div className="offcanvas__logo">
                <Link href="/">
                  <>
                    <span className="logo-icon-white">Property</span>{" "}
                    <Image className="logo-header" src={logoIcon} alt="image" />
                    <span className="logo-icon-white">La</span>
                  </>
                </Link>
              </div>
            </div>
            <div
              className="tp-header-dashboard-btn d-md-block d-flex align-items-center"
              style={{ marginTop: "0px" }}
            >
              <button
                className="tp-btn"
                onClick={handlePostPropertyClick}
                style={{
                  padding: "12px 16px 7px",
                  whiteSpace: "nowrap",
                  minWidth: "auto",
                }}
              >
                <span className="btn-wrap">
                  <b className="text-1">Post Property</b>
                  <b className="text-2">Post Property</b>
                </span>
              </button>
            </div>

            <div className="tp-offcanvas-menu fix d-xl-none mb-30">
              <nav>
                <OffcanvasMenus />
              </nav>
            </div>
            <div className="offcanvas__contact d-none d-xl-block">
              <div className="offcanvas__text mb-30">
                <p>
                  The design readable content of a page hen looking at its
                  layout The point our of using Movie template
                </p>
              </div>
              <div className="offcanvas__gallery mb-30">
                <h4 className="offcanvas__title">Gallery</h4>
              </div>
            </div>
            <div className="offcanvas-info mb-30">
              <h4 className="offcanvas__title">Contacts</h4>
              <div className="offcanvas__contact-content d-flex">
                <div className="offcanvas__contact-content-icon">
                  <i className="fa-sharp fa-solid fa-location-dot"></i>
                </div>
                <div className="offcanvas__contact-content-content">
                  <Link href="https://www.google.com/maps/search/86+Road+Broklyn+Street,+600+New+York,+USA/@40.6897806,-74.0278086,12z/data=!3m1!4b1">
                    86 Jalan Berhla, Brickfields{" "}
                  </Link>
                </div>
              </div>
              <div className="offcanvas__contact-content d-flex">
                <div className="offcanvas__contact-content-icon">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div className="offcanvas__contact-content-content">
                  <Link href="mailto:needhelp@company.com">
                    {" "}
                    support@propertyla.com.my{" "}
                  </Link>
                </div>
              </div>
              <div className="offcanvas__contact-content d-flex">
                <div className="offcanvas__contact-content-icon">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div className="offcanvas__contact-content-content">
                  <Link href="tel:01310-069824"> +60 11 2636 8426</Link>
                </div>
              </div>
            </div>
            <div className="offcanvas__social">
              <Link className="icon facebook" href="#">
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link className="icon twitter" href="#">
                <i className="fab fa-twitter"></i>
              </Link>
              <Link className="icon youtube" href="#">
                <i className="fab fa-youtube"></i>
              </Link>
              <Link className="icon linkedin" href="#">
                <i className="fab fa-linkedin"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={toggleOffcanvas}
        className={`body-overlay ${openOffcanvas ? "overlay-open" : ""}`}
      ></div>
      {/* -- offcanvas area end -- */}
    </>
  );
}
