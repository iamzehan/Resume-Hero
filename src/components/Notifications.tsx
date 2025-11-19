import clsx from "clsx";
import { useEffect, useState } from "react";
export default function Notifications({
  notification,
  setNotification,
}: {
  notification: string | null;
  setNotification: (notification: string | null) => void;
}) {
  const notifications: { [key: string]: { [key: string]: string } } = {
    update: {
      message: "Updated successfully!",
      style: "bg-yellow-500 text-white",
    },
    add: {
      message: "Added successfully",
      style: "bg-green-500 text-white",
    },
    delete: {
      message: "Deleted!",
      style: "bg-red-500 text-white",
    },
  };

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!notification) return;
    async function handle() {
      setVisible(true);
      const hide = setTimeout(() => setVisible(false), 1000);
      const remove = setTimeout(() => setNotification(null), 1500);
      return () => {
        clearTimeout(remove);
        clearTimeout(hide);
      };
    }
    handle();
  }, [notification, setNotification]);

  const notify = notification ? notifications[notification] : null;
  if (!notify) {
    return;
  }
  return (
    <>
      <div
        className={clsx(
          `${notify.style}`,
          "fixed w-full z-500 rounded-b md:rounded px-5 py-1",
          "text-center text-shadow-2xs",
          "shadow",
          "transition-transform origin-top ease-in-out duration-500",
          { "-translate-y-full": !visible, "translate-y-0": visible },
          "md:w-fit md:top-[20%] md:right-0 md:transform-none md:rounded-r-none!",
          {"md:translate-x-full":!visible,
            "md:-translate-y-full":visible
           }

        )}
      >
        {notify.message}
      </div>
    </>
  );
}
