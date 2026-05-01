"use client";
import { useState, useRef, useEffect, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  profileSchema,
  changePasswordSchema,
} from "@/schemas/validationSchema";
import { ClosedEyeSvg, OpenEyeSvg } from "../SVG";
import ErrorMessage from "./ErrorMassage";
import { toast } from "sonner";
import apiClient from "@/config/axios";
import UserSvg from "@/components/SVG/UserSvg";

interface ProfileFormData {
  fullName: string;
  aboutYou?: string;
  companyName?: string;
  icPassport?: string;
  designation?: string;
  experience?: number;
  phone: string;
  email?: string;
}

interface PasswordFormData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface UserProfile {
  fullName?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  aboutYou?: string;
  about?: string;
  bio?: string;
  about_me?: string;
  companyName?: string;
  company?: string;
  company_name?: string;
  icPassport?: string;
  ic_passport?: string;
  icNumber?: string;
  passport?: string;
  designation?: string;
  title?: string;
  jobTitle?: string;
  job_title?: string;
  experience?: number;
  yearsOfExperience?: number;
  experienceYears?: number;
  profileImage?: string;
  profileImageUrl?: string;
  avatar?: string;
  avatarUrl?: string;
  imageUrl?: string;
  email?: string;
  emailAddress?: string;
  mail?: string;
  phone?: string;
  phoneNumber?: string;
  mobile?: string;
  mobileNumber?: string;
}

export default function UserProfileForm() {
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState("My Profile");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    reset: resetProfile,
    formState: { errors: profileErrors, isSubmitting: isProfileSubmitting },
  } = useForm<ProfileFormData>({
    resolver: yupResolver(profileSchema),
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPassword,
    formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting },
  } = useForm<PasswordFormData>({
    resolver: yupResolver(changePasswordSchema),
  });

  const formatNum = (phone: string): string => {
    if (!phone) return "";
    const num = phone.replace(/\D/g, "");

    if (num.startsWith("60")) return `+${num}`;
    if (num.startsWith("6")) return `+${num}`;
    if (num.startsWith("0")) return `+6${num}`;
    return `+60${num}`;
  };

  // ── GET /api/users/profile — fetch and bind data on mount ──
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const isRecord = (v: unknown): v is Record<string, unknown> =>
          typeof v === "object" && v !== null;

        const extractPayload = (v: unknown): unknown => {
          if (!isRecord(v)) return v;
          const data = v["data"];
          if (!isRecord(data)) return v;
          const dataData = data["data"];
          if (isRecord(dataData)) return dataData;
          const user = data["user"];
          if (isRecord(user)) return user;
          const profile = data["profile"];
          if (isRecord(profile)) return profile;
          return data;
        };

        const res = await apiClient.get<unknown>("/users/profile");
        const raw = extractPayload(res.data) ?? {};

        const profile = raw as UserProfile;

        const fullName =
          profile.fullName ||
          profile.name ||
          [profile.firstName, profile.lastName].filter(Boolean).join(" ") ||
          profile.username ||
          "";

        const aboutYou =
          profile.aboutYou ||
          profile.about ||
          profile.bio ||
          profile.about_me ||
          "";
        const companyName =
          profile.companyName || profile.company || profile.company_name || "";
        const icPassport =
          profile.icPassport ||
          profile.ic_passport ||
          profile.icNumber ||
          profile.passport ||
          "";
        const designation =
          profile.designation ||
          profile.title ||
          profile.jobTitle ||
          profile.job_title ||
          "";
        const experience =
          profile.experience ??
          profile.yearsOfExperience ??
          profile.experienceYears ??
          undefined;

        const phoneRaw =
          profile.phone ||
          profile.phoneNumber ||
          profile.mobile ||
          profile.mobileNumber ||
          "";
        const phone = phoneRaw.replace(/\D/g, "");
        const email = profile.email || profile.emailAddress || profile.mail || "";

        const profileImage =
          profile.profileImage ||
          profile.profileImageUrl ||
          profile.avatar ||
          profile.avatarUrl ||
          profile.imageUrl ||
          "";

        resetProfile({
          fullName,
          aboutYou,
          companyName,
          icPassport,
          designation,
          experience,
          phone,
          email,
        });

        // Set avatar
        if (profileImage) {
          setProfileImageUrl(profileImage);
        }

        // Set display name in header
        setDisplayName(fullName || "My Profile");
        if (profile.profileImage) {
          setProfileImageUrl(profile.profileImage);
        }

        setDisplayName(profile.fullName ?? profile.username ?? "My Profile");
      } catch (err: unknown) {
        const error = err as { response?: { status?: number } };
        if (error?.response?.status !== 401) {
          toast.error("Failed to load profile data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [resetProfile]);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProfileImageUrl(URL.createObjectURL(file));
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("profileImage", file);
      await apiClient.post("/users/profile/image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Profile image updated!");
    } catch {
      toast.error("Failed to upload image.");
    } finally {
      setUploadingImage(false);
    }
  };

  const onProfileSubmit = async (data: ProfileFormData) => {
    try {
      const normalizedPhone = data.phone?.trim() ? formatNum(data.phone) : "";
      await apiClient.patch("/users/profile", {
        fullName: data.fullName,
        aboutYou: data.aboutYou,
        companyName: data.companyName,
        icPassport: data.icPassport,
        designation: data.designation,
        experience: data.experience,
        phone: normalizedPhone,
      });
      setDisplayName(data.fullName);
      toast.success("Profile updated successfully!");
    } catch (err: unknown) {
      const error = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to update profile",
      );
    }
  };

  const onPasswordSubmit = async (data: PasswordFormData) => {
    try {
      await apiClient.post("/auth/change-password", {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });
      toast.success("Password changed successfully!");
      resetPassword();
    } catch (err: unknown) {
      const error = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to change password",
      );
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "40px 0", textAlign: "center", color: "#888" }}>
        Loading profile...
      </div>
    );
  }

  return (
    <>
      {/* Profile Image + Name */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          paddingBottom: 24,
          marginBottom: 24,
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <div
          style={{ position: "relative", width: 90, height: 90, flexShrink: 0 }}
        >
          {profileImageUrl ? (
            <span
              style={{
                display: "block",
                width: 90,
                height: 90,
                borderRadius: "50%",
                backgroundImage: `url('${profileImageUrl}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ) : (
            <span
              style={{
                display: "flex",
                width: 90,
                height: 90,
                borderRadius: "50%",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(212, 175, 55, 0.18)",
                border: "1px solid rgba(212, 175, 55, 0.75)",
                color: "#D4AF37",
              }}
              aria-label="default profile icon"
            >
              <UserSvg />
            </span>
          )}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              background: "#fff",
              border: "none",
              borderRadius: "50%",
              width: 28,
              height: 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
              cursor: "pointer",
              padding: 0,
            }}
          >
            {uploadingImage ? (
              <span style={{ fontSize: 9 }}>...</span>
            ) : (
              <i className="fa-light fa-camera" style={{ fontSize: 12 }} />
            )}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </div>
        <div>
          <h4 style={{ margin: "0 0 4px" }}>{displayName}</h4>
          <p style={{ margin: 0, color: "#888", fontSize: 14 }}>
            Update your personal details below
          </p>
        </div>
      </div>

      {/* Profile Information Form */}
      <form onSubmit={handleProfileSubmit(onProfileSubmit)}>
        <div className="tp-dashboard-profile-information pb-50">
          <h5 className="tp-dashboard-new-title">Personal Information</h5>
          <div className="tp-dashboard-profile-info">
            <div className="row g-3">
              <div className="col-lg-12">
                <div className="tp-dashboard-new-input">
                  <label>
                    Full Name <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    {...registerProfile("fullName")}
                    type="text"
                    placeholder="Enter full name"
                  />
                  <ErrorMessage
                    message={profileErrors.fullName?.message || ""}
                  />
                </div>
              </div>

              <div className="col-lg-12">
                <div className="tp-dashboard-new-input">
                  <label>About You</label>
                  <textarea
                    {...registerProfile("aboutYou")}
                    rows={4}
                    placeholder="Tell us about yourself"
                    style={{ width: "100%", resize: "vertical" }}
                  />
                  <ErrorMessage
                    message={profileErrors.aboutYou?.message || ""}
                  />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="tp-dashboard-new-input">
                  <label>Phone Number</label>
                  <input
                    {...registerProfile("phone")}
                    type="text"
                    inputMode="numeric"
                    maxLength={12}
                    placeholder="Enter phone number"
                    onInput={(e: React.FormEvent<HTMLInputElement>) => {
                      const target = e.currentTarget;
                      target.value = target.value.replace(/\D/g, "");
                    }}
                  />
                  <ErrorMessage message={profileErrors.phone?.message || ""} />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="tp-dashboard-new-input">
                  <label>Email</label>
                  <input
                    {...registerProfile("email")}
                    type="email"
                    readOnly
                    placeholder="Email"
                    style={{ background: "#f6f6f6" }}
                  />
                  <ErrorMessage message={profileErrors.email?.message || ""} />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="tp-dashboard-new-input">
                  <label>Company Name</label>
                  <input
                    {...registerProfile("companyName")}
                    type="text"
                    placeholder="Enter your company name"
                  />
                  <ErrorMessage
                    message={profileErrors.companyName?.message || ""}
                  />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="tp-dashboard-new-input">
                  <label>IC / Passport</label>
                  <input
                    {...registerProfile("icPassport")}
                    type="text"
                    placeholder="Enter your identification number"
                  />
                  <ErrorMessage
                    message={profileErrors.icPassport?.message || ""}
                  />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="tp-dashboard-new-input">
                  <label>Designation</label>
                  <input
                    {...registerProfile("designation")}
                    type="text"
                    placeholder="Enter your designation"
                  />
                  <ErrorMessage
                    message={profileErrors.designation?.message || ""}
                  />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="tp-dashboard-new-input">
                  <label>Experience (years)</label>
                  <input
                    {...registerProfile("experience")}
                    type="number"
                    min={0}
                    placeholder="Years of experience"
                  />
                  <ErrorMessage
                    message={profileErrors.experience?.message || ""}
                  />
                </div>
              </div>

              <div className="col-12">
                <div className="tp-dashboard-new-btn" style={{ marginTop: 8 }}>
                  <button type="submit" disabled={isProfileSubmitting}>
                    {isProfileSubmitting ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Change Password Form */}
      <form onSubmit={handlePasswordSubmit(onPasswordSubmit)}>
        <div className="tp-dashboard-profile-information mb-40">
          <h5 className="tp-dashboard-new-title">Change Password</h5>
          <div className="tp-dashboard-profile-info">
            <div className="row g-3">
              <div className="col-lg-4">
                <div className="tp-dashboard-new-input">
                  <label>
                    Old Password <span style={{ color: "red" }}>*</span>
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      {...registerPassword("oldPassword")}
                      type={oldPasswordVisible ? "text" : "password"}
                      placeholder="Old password"
                      style={{ paddingRight: 40 }}
                    />
                    <span
                      onClick={() => setOldPasswordVisible((v) => !v)}
                      style={{
                        position: "absolute",
                        right: 12,
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {oldPasswordVisible ? <OpenEyeSvg /> : <ClosedEyeSvg />}
                    </span>
                  </div>
                  <ErrorMessage
                    message={passwordErrors.oldPassword?.message || ""}
                  />
                </div>
              </div>

              <div className="col-lg-4">
                <div className="tp-dashboard-new-input">
                  <label>
                    New Password <span style={{ color: "red" }}>*</span>
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      {...registerPassword("newPassword")}
                      type={newPasswordVisible ? "text" : "password"}
                      placeholder="New password"
                      style={{ paddingRight: 40 }}
                    />
                    <span
                      onClick={() => setNewPasswordVisible((v) => !v)}
                      style={{
                        position: "absolute",
                        right: 12,
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {newPasswordVisible ? <OpenEyeSvg /> : <ClosedEyeSvg />}
                    </span>
                  </div>
                  <ErrorMessage
                    message={passwordErrors.newPassword?.message || ""}
                  />
                </div>
              </div>

              <div className="col-lg-4">
                <div className="tp-dashboard-new-input">
                  <label>
                    Confirm Password <span style={{ color: "red" }}>*</span>
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      {...registerPassword("confirmPassword")}
                      type={confirmPasswordVisible ? "text" : "password"}
                      placeholder="Confirm new password"
                      style={{ paddingRight: 40 }}
                    />
                    <span
                      onClick={() => setConfirmPasswordVisible((v) => !v)}
                      style={{
                        position: "absolute",
                        right: 12,
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {confirmPasswordVisible ? (
                        <OpenEyeSvg />
                      ) : (
                        <ClosedEyeSvg />
                      )}
                    </span>
                  </div>
                  <ErrorMessage
                    message={passwordErrors.confirmPassword?.message || ""}
                  />
                </div>
              </div>

              <div className="col-12">
                <div className="tp-dashboard-new-btn" style={{ marginTop: 8 }}>
                  <button type="submit" disabled={isPasswordSubmitting}>
                    {isPasswordSubmitting ? "Updating..." : "Update Password"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
