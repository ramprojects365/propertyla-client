"use client";
import Image from "next/image";
import React from "react";
import logoIconBlue from "../../../public/assets/img/logo/logo-icon-blue.png";
import logoIconWhite from "../../../public/assets/img/logo/logo-icon-white.png";
import ProfileDropdown from "./ProfileDropdown";
import OffcanvasArea from "../../components/OffCanvas/OffcanvasArea";
import useGlobalContext from "@/hooks/useContext";
import NavMenus from "../subComponents/NavMenus";
import UserSvg from "@/components/SVG/UserSvg";
import useSticky from "@/hooks/useSticky";
import Link from "next/link";
import { requireAuth } from "@/utils/auth";

export default function HeaderOne() {
  const { toggleOffcanvas } = useGlobalContext();
  const { sticky } = useSticky();

  const handlePostPropertyClick = () => {
    const isAuthenticated = requireAuth("/dashboard/add-new-property");
    // If user is authenticated, navigate to the dashboard
    if (isAuthenticated) {
      window.location.href = "/dashboard/add-new-property";
    }
  };

  const renderHeaderContent = () => (
    <div className="container container-large">
      <div className="row align-items-center">
        <div className="col-xl-2 col-lg-4 col-md-3 col-8">
          <div className="tp-header-logo" style={{ paddingTop: "10px" }}>
            <Link href="/">
              {sticky ? (
                <>
                  <span className="logo-icon-black">Property</span>{" "}
                  <Image
                    className="logo-header"
                    src={logoIconBlue}
                    alt="image"
                  />
                  <span className="logo-icon-black">La</span>
                </>
              ) : (
                <>
                  <span className="logo-icon-white">Property</span>{" "}
                  <Image
                    className="logo-header"
                    src={logoIconWhite}
                    alt="image"
                  />
                  <span className="logo-icon-white">La</span>
                </>
              )}
            </Link>
          </div>
        </div>
        <div className="col-xl-6 col-lg-4 d-none d-lg-block">
          <div className="tp-header-1-menu">
            <div className="tp-main-menu d-none d-xl-block">
              <nav>
                <NavMenus />
              </nav>
            </div>
          </div>
        </div>
        <div className="col-xl-2 col-lg-2 col-md-4 col-2 d-flex align-items-center justify-content-center">
          <div
            className="tp-header-dashboard-btn d-none d-md-block"
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
        </div>
        <div className="col-xl-2 col-lg-2 col-md-5 col-2">
          <div className="tp-header-main-right d-flex align-items-center justify-content-end">
            <div className="tp-header-right-user d-md-flex align-items-center">
              {(() => {
                const username =
                  typeof window !== "undefined"
                    ? localStorage.getItem("loginUser")
                    : null;
                return username ? (
                  <ProfileDropdown />
                ) : (
                  <div className="tp-header-right-user-icon">
                    <Link href="/sign-in">
                      <span>
                        <UserSvg />
                      </span>
                    </Link>
                  </div>
                );
              })()}

              <div
                className="tp-header-right-user-content d-show"
                style={{ paddingLeft: "5px" }}
              >
                {(() => {
                  const username =
                    typeof window !== "undefined"
                      ? localStorage.getItem("loginUser")
                      : null;
                  return username ? <p></p> : <p>Hi, Sign In</p>;
                })()}
              </div>
            </div>
            <div className="tp-header-hamburger d-xl-none offcanvas-open-btn">
              <button onClick={toggleOffcanvas} className="hamburger-btn">
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <header className="tp-header-1-ptb tp-header-transparent top p-relative">
        <div className="tp-header-main-sticky p-relative">
          {renderHeaderContent()}
        </div>
      </header>
      <header
        className={`tp-header-1-ptb p-relative tp-int-menu tp-header-sticky-cloned ${
          sticky ? "tp-header-pinned" : ""
        }`}
      >
        <div className="tp-header-main-sticky tp-header-1-main p-relative">
          {renderHeaderContent()}
        </div>
      </header>
      {/* Offcanvas Area */}
      <OffcanvasArea />
    </>
  );
}
