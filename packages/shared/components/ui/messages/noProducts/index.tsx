import { Icon } from "@iconify/react";

export default function NoProducts() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center text-gray-500 py-10">
      <Icon icon="mdi:package-variant-remove" width="48" height="48" className="mb-3" />
      <p className="text-lg font-medium">No products found</p>
    </div>
  );
}
