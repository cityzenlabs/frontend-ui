import React from "react";
import { Tab } from "@headlessui/react";
import EditProfile from "./EditProfile/EditProfile";
import Security from "./Security/Security";
import SecurityNotifications from "./Notifications/SecurityNotifications";
import IContainer from "../../../Library/Container/IContainer";
import ILabel from "../../../Library/Label/ILabel";
import Subscriptions from "./Subscriptions/Subscriptions";

function Settings({ profilePicture, getUpdatedUser, userHome, token }: any) {
  return (
    <div>
      <IContainer className="pt-8">
        <ILabel text="Settings"></ILabel>
        <div className="tab-scroll-container mt-10">
          <Tab.Group>
            <div className="tab-list-wrapper overflow-x-auto">
              <Tab.List className="text-slate-400 space-x-10 whitespace-nowrap">
                {[
                  "Profile",
                  "Security",
                  "Notifications",
                  "Subscription",
                  "Billing",
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
                <EditProfile
                  profilePicture={profilePicture}
                  getUpdatedUser={getUpdatedUser}
                  userHome={userHome}
                />
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
      </IContainer>
    </div>
  );
}

export default Settings;
