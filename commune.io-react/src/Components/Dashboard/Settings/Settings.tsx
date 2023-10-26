import React, { Dispatch, SetStateAction } from "react";
import { Tab } from "@headlessui/react";
import "./Settings.css";
import EditProfile from "./EditProfile/EditProfile";
import Security from "./Security/Security";
import SecurityNotifications from "./Notifications/SecurityNotifications";

interface SettingsProps {
  setUser: Dispatch<SetStateAction<any>>;
  user: any; // Use the appropriate type instead of 'any'
  profilePicture: string;
}

function Settings({ setUser, user, profilePicture }: SettingsProps) {
  return (
    <div>
      <div className="xl:ml-[320px] md:ml-[320px] px-12 py-8 ">
        <label className="font-medium text-3xl">Settings</label>
        <div className="tab-scroll-container mt-10">
          <Tab.Group>
            <div className="tab-list-wrapper overflow-x-auto">
              <Tab.List className="text-slate-400 space-x-10 whitespace-nowrap">
                {[
                  "Edit Profile",
                  "Security",
                  "Notifications",
                  "Terms of Service",
                  "Privacy Policy",
                  "Cookie Policy",
                  "Help Center",
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
                  setUser={setUser}
                  user={user}
                  profilePicture={profilePicture}
                />
              </Tab.Panel>
              <Tab.Panel>
                <Security />
              </Tab.Panel>
              <Tab.Panel>
                <SecurityNotifications />
              </Tab.Panel>
              <Tab.Panel>Content 4</Tab.Panel>
              <Tab.Panel>Content 5</Tab.Panel>
              <Tab.Panel>Content 6</Tab.Panel>
              <Tab.Panel>Content 7</Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
}

export default Settings;
