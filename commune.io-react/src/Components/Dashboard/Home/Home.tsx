import React, { useEffect, useState } from "react";
import IPanel from "../../../Library/Panel/IPanel";
import ICommunityPanel from "../../../Library/CommunityPanel/ICommunityPanel";
import IAttributeBar from "../../../Library/AttributeBar/IAttributeBar";
import { attributeColors } from "./Constants/HomeConstats";
import { useDash } from "../../../Context/DashboardContext";
import { useNavigate } from "react-router-dom";
import IEventPanel from "../../../Library/EventPanel/IEventPanel";
import ISpinner from "../../../Library/Spinner/ISpinner";
import { formatDate, getIconForAttribute } from "../Constants/Constants";
import ILabel from "../../../Library/Label/ILabel";

function Home() {
  const navigate = useNavigate();
  const { userHome, user, isLoading } = useDash();

  if (isLoading) {
    return <ISpinner />;
  }

  console.log(userHome);

  return (
    <div>
      <div className="pt-4">
        <ILabel text="Dashboard" />
      </div>
      <div className="xl:flex gap-5 pt-4">
        <div className="xl:w-2/5 w-full">
          <div className="pb-4">
            <IPanel
              title={"Welcome, " + user?.firstName}
              height="100"
              buttonLabel="See Profile"
              onButtonClick={() => navigate(`/profile/${user.id}`)}
            ></IPanel>
          </div>

          <div className="pb-4">
            <IPanel title="Your Top 4 Attributes" height="h-[403px]">
              <div className="xl:flex lg:flex flex-wrap">
                {Object.entries(userHome?.topAttributes || {})
                  .sort(([, attrA]: any, [, attrB]: any) => {
                    if (attrA.level > attrB.level) return -1;
                    if (attrA.level < attrB.level) return 1;
                    return attrB.points - attrA.points;
                  })
                  .map(([attributeKey, attributeValue], index) => (
                    <div
                      key={attributeKey}
                      className="flex w-full items-center mb-6 mt-2"
                    >
                      <IAttributeBar
                        attributeKey={attributeKey}
                        attributeValue={attributeValue as any}
                        color={attributeColors[index % attributeColors.length]}
                      />
                      <div
                        className="ml-auto border py-3 px-3 rounded"
                        style={{
                          color:
                            attributeColors[index % attributeColors.length],
                          borderColor: `${
                            attributeColors[index % attributeColors.length]
                          }20`,
                          backgroundColor: `${
                            attributeColors[index % attributeColors.length]
                          }20`,
                        }}
                      >
                        {getIconForAttribute(attributeKey)}
                      </div>
                    </div>
                  ))}
              </div>
            </IPanel>
          </div>
        </div>
        <div className="xl:w-3/5 w-full pb-4">
          <IPanel
            title="Level up with these events"
            buttonLabel="Show All"
            height="h-[471px]"
          >
            <div className="pt-2">
              {Object.keys(userHome?.topAttributeEvents).map((attribute) => {
                const events = userHome?.topAttributeEvents[attribute];
                if (events.length > 0) {
                  const firstEvent = events[0];
                  return (
                    <div
                      onClick={() =>
                        navigate(`/event/${firstEvent.name}/${firstEvent.id}`)
                      }
                      key={firstEvent.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "16px",
                        background: "#f9f9f9",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        className="py-3 px-3 rounded"
                        style={{ width: "100px", height: "90px" }}
                      >
                        <img
                          src={firstEvent.photo}
                          alt={firstEvent.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "8px 8px 8px 8px",
                          }}
                        />
                      </div>
                      <div style={{ padding: "8px 16px" }}>
                        <div style={{ margin: "0" }} className="text-sm">
                          {firstEvent.name}
                        </div>
                        <div
                          style={{ margin: "0", color: "#666" }}
                          className="text-xs"
                        >
                          {formatDate(firstEvent.startTime) + " • "}
                          {formatDate(firstEvent.endTime)}
                        </div>
                        <div className="text-xs" style={{ color: "#666" }}>
                          {firstEvent.address + " | " + firstEvent?.attribute}
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return null; // If no events for this attribute, skip rendering
                }
              })}
            </div>
          </IPanel>
        </div>
      </div>

      {userHome?.upcomingEvents && (
        <IEventPanel
          events={userHome?.upcomingEvents}
          title="Upcoming Events"
          height="600px"
          buttonLabel="Show All"
          onEventClick={(eventName, eventId) => {
            navigate(`/event/${eventName}/${eventId}`);
          }}
          onButtonClick={() =>
            navigate(`/events/${encodeURIComponent("Upcoming Events")}`, {
              state: { events: userHome?.upcomingEvents },
            })
          }
        />
      )}

      {userHome?.recommendedCommunities && (
        <ICommunityPanel
          communities={userHome?.recommendedCommunities}
          title="Recommended Communities"
          height="600px"
          buttonLabel={"Show All"}
          onButtonClick={() =>
            navigate(
              `/communities/${encodeURIComponent("Recommended Communities")}`,
              { state: { communities: userHome?.recommendedCommunities } },
            )
          }
          onCommunityClick={(communityName, communityId) => {
            navigate(`/community/${communityName}/${communityId}`);
          }}
        />
      )}
    </div>
  );
}

export default Home;
