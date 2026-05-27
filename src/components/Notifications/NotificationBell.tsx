"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import apiClient from "@/config/axios";

type NotificationItem = {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  propertyId?: string | null;
  actorName?: string | null;
  actorEmail?: string | null;
  actorPhone?: string | null;
  metadata?: {
    propertyUrl?: string | null;
    propertyTitle?: string | null;
  } | null;
};

const formatTime = (value: string): string => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleString("en-MY", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getStoredUserType = () => {
  if (typeof window === "undefined") return "";
  return (localStorage.getItem("loginUserType") || "").trim().toLowerCase();
};

const shouldShowBell = () => {
  const userType = getStoredUserType();
  if (!userType) return true;
  return ["agent", "owner", "agency", "ren"].includes(userType);
};

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const bellRef = useRef<HTMLDivElement>(null);

  const fetchNotifications = useCallback(async () => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

    if (!token || !shouldShowBell()) {
      setVisible(false);
      return;
    }

    setVisible(true);
    setLoading(true);
    try {
      const res = await apiClient.get("/notifications", {
        params: { limit: 10 },
      });
      setUnreadCount(res.data?.unreadCount ?? 0);
      setNotifications(res.data?.data ?? []);
    } catch {
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
    const interval = window.setInterval(fetchNotifications, 30000);
    const sync = () => fetchNotifications();

    window.addEventListener("storage", sync);
    window.addEventListener("propertyla-auth-changed", sync);
    window.addEventListener("propertyla-notifications-changed", sync);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("storage", sync);
      window.removeEventListener("propertyla-auth-changed", sync);
      window.removeEventListener("propertyla-notifications-changed", sync);
    };
  }, [fetchNotifications]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!bellRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const markAllRead = async () => {
    try {
      await apiClient.patch("/notifications/read-all");
      setNotifications((items) =>
        items.map((item) => ({ ...item, isRead: true })),
      );
      setUnreadCount(0);
    } catch {}
  };

  const markRead = async (item: NotificationItem) => {
    if (!item.isRead) {
      try {
        await apiClient.patch(`/notifications/${item.id}/read`);
        setNotifications((items) =>
          items.map((current) =>
            current.id === item.id ? { ...current, isRead: true } : current,
          ),
        );
        setUnreadCount((count) => Math.max(count - 1, 0));
      } catch {}
    }

    const url =
      item.metadata?.propertyUrl ||
      (item.propertyId ? `/property-details/${item.propertyId}` : "");
    if (url) window.location.href = url;
  };

  if (!visible) return null;

  return (
    <div
      ref={bellRef}
      style={{ position: "relative", marginLeft: 10, marginRight: 4 }}
    >
      <button
        type="button"
        aria-label="Notifications"
        title="Notifications"
        onClick={(event) => {
          event.stopPropagation();
          setOpen((prev) => !prev);
        }}
        style={{
          width: 42,
          height: 42,
          borderRadius: "50%",
          border: "1px solid rgba(0, 59, 92, 0.16)",
          background: "#fff",
          color: "#003B5C",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          boxShadow: "0 4px 14px rgba(0, 59, 92, 0.08)",
        }}
      >
        <i className="fa-regular fa-bell" style={{ fontSize: 18 }} />
        {unreadCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: -4,
              right: -4,
              minWidth: 18,
              height: 18,
              borderRadius: 9,
              background: "#EF4444",
              color: "#fff",
              fontSize: 11,
              lineHeight: "18px",
              fontWeight: 700,
              textAlign: "center",
              padding: "0 5px",
            }}
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 50,
            width: 330,
            maxWidth: "calc(100vw - 24px)",
            background: "#fff",
            border: "1px solid #e8eef3",
            borderRadius: 8,
            boxShadow: "0 18px 50px rgba(0, 0, 0, 0.15)",
            zIndex: 1000,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "12px 14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #edf2f7",
            }}
          >
            <strong style={{ color: "#111", fontSize: 15 }}>
              Notifications
            </strong>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllRead}
                style={{
                  border: 0,
                  background: "transparent",
                  color: "#003B5C",
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                Mark all read
              </button>
            )}
          </div>

          <div style={{ maxHeight: 360, overflowY: "auto" }}>
            {loading ? (
              <div style={{ padding: 16, color: "#777", fontSize: 14 }}>
                Loading...
              </div>
            ) : notifications.length === 0 ? (
              <div style={{ padding: 16, color: "#777", fontSize: 14 }}>
                No notifications yet.
              </div>
            ) : (
              notifications.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => markRead(item)}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    border: 0,
                    borderBottom: "1px solid #f0f3f6",
                    background: item.isRead ? "#fff" : "#f3f8fb",
                    padding: "12px 14px",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      color: "#111",
                      fontSize: 14,
                      fontWeight: item.isRead ? 600 : 800,
                      lineHeight: 1.35,
                    }}
                  >
                    {item.message || item.title}
                  </span>
                  {(item.actorEmail || item.actorPhone) && (
                    <span
                      style={{
                        display: "block",
                        color: "#64748B",
                        fontSize: 12,
                        marginTop: 4,
                        lineHeight: 1.35,
                      }}
                    >
                      {[item.actorEmail, item.actorPhone]
                        .filter(Boolean)
                        .join(" | ")}
                    </span>
                  )}
                  <span
                    style={{
                      display: "block",
                      color: "#94A3B8",
                      fontSize: 12,
                      marginTop: 6,
                    }}
                  >
                    {formatTime(item.createdAt)}
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
