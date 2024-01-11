import { api } from "@/trpc/react";

// import { api } from "@/utils/api";

export default function DashboardPage() {
  const { mutate } = api.admin.sensitive.useMutation();

  return (
    <div>
      Dashboard{" "}
      <button
        onClick={() => {
          mutate;
        }}
      >
        top secret
      </button>
    </div>
  );
}
