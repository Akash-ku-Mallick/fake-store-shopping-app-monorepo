import { Toaster } from "react-hot-toast";

const AppToaster = () => {
  return (
    <>
      {/* 🔔 Top Right Toaster (for normal notifications) */}
      <Toaster
        toasterId="topRight"
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1f2937", // gray-800
            color: "#f9fafb",      // gray-50
            borderRadius: "0.5rem",
            padding: "12px 16px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
          },
        }}
      />

      {/* ⚡ Center Toaster (for important alerts) */}
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <Toaster
          toasterId="center"
          position="top-center"
          containerStyle={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          toastOptions={{
            duration: 5000,
            style: {
              background: "#111827", // gray-900
              color: "#fef2f2",      // rose-50
              fontWeight: "600",
              borderRadius: "0.75rem",
              padding: "16px 20px",
              fontSize: "1rem",
              boxShadow: "0 6px 20px rgba(0,0,0,0.35)",
            },
          }}
        />
      </div>
    </>
  );
}

export default AppToaster