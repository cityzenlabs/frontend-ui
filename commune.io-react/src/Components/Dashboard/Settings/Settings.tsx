import React from "react";
import { Tab } from "@headlessui/react";
import EditProfile from "./EditProfile/EditProfile";
import Security from "./Security/Security";
import SecurityNotifications from "./Notifications/SecurityNotifications";
import ILabel from "../../../Library/Label/ILabel";
import Subscriptions from "./Subscriptions/Subscriptions";

function Settings({ token }: any) {
  return (
    <div>
      <div className="pt-4 pb-4">
        <ILabel text="Settings"></ILabel>
      </div>
      <div className="tab-scroll-container ">
        <Tab.Group>
          <div className="tab-list-wrapper overflow-x-auto">
            <Tab.List className="text-slate-400 space-x-10 whitespace-nowrap">
              {[
                "Profile",
                "Security",
                "Notifications",
                "Subscription",
                "Support",
              ].map((tab) => (
                <Tab
                  key={tab}
                  as="button"
                  className={({ selected }) => `
                                        ${
                                          selected
                                            ? "text-regal-blue "
                                            : "border-b-2 border-transparent"
                                        }
                                        outline-none
                                        `}
                >
                  {tab}
                </Tab>
              ))}
            </Tab.List>
          </div>
          <Tab.Panels className="mt-16">
            <Tab.Panel>
              <EditProfile />
            </Tab.Panel>
            <Tab.Panel>
              <Security />
            </Tab.Panel>
            <Tab.Panel>
              <SecurityNotifications />
            </Tab.Panel>
            <Tab.Panel>
              <Subscriptions token={token} />
            </Tab.Panel>
            <Tab.Panel>Content 5</Tab.Panel>
            <Tab.Panel>Content 6</Tab.Panel>
            <Tab.Panel>Content 7</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}

export default Settings;
