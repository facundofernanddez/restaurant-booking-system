import { api } from "@/trpc/react";

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
