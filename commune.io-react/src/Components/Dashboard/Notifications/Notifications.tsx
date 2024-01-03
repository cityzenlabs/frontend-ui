import React, { useContext } from "react";
import ILabel from "../../../Library/Label/ILabel";
import IPanel from "../../../Library/Panel/IPanel";
import moment from "moment";
import IButton from "../../../Library/Button/IButton";
import { WebSocketContext } from "../../../Context/WebSocketContext";
import * as NotificationsService from "../../../Services/NotificationsService/NotificationsService";
import { useAuth } from "../../../Context/AuthContext";
function NotificationsComponent() {
  const webSocketContext = useContext(WebSocketContext);
  const accessToken = useAuth();
  const { messages, markNotificationAsRead } = webSocketContext as any;

  const readNotification = async (id: any) => {
    try {
      const response = await NotificationsService.readNotification(
        accessToken.token,
        id,
      );
      if (response.ok) {
        markNotificationAsRead(id);
      }
    } catch (error) {}
  };

  const getTimeCategory = (timestamp: any) => {
    const now = moment();
    const messageDate = moment(timestamp);

    if (now.isSame(messageDate, "week")) {
      return "This week";
    } else if (now.subtract(1, "weeks").isSame(messageDate, "week")) {
      return "Last week";
    }
    return "Older";
  };

  const categorizedMessages = messages?.reduce((acc: any, msg: any) => {
    const category = getTimeCategory(msg.timestamp);
    acc[category] = [...(acc[category] || []), msg];
    return acc;
  }, {});

  const unreadStyle = {
    borderLeft: "2px solid blue",
    paddingLeft: "12px",
    borderBottom: "1px solid #DADEE5",
  };

  const readStyle = {
    paddingLeft: "16px",
    borderBottom: "1px solid #DADEE5",
  };

  const renderMessage = (msg: any) => (
    <div
      onClick={() => readNotification(msg.id)}
      key={msg.id}
      style={msg.read ? readStyle : unreadStyle}
      className="p-6"
    >
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
      >
        <div style={{ marginRight: "8px", marginLeft: "12px" }}>
          <img
            src={msg.userImage || "default-avatar.png"}
            alt="User"
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "20px",
            }}
          />
        </div>
        <div>
          <div>{msg.message}</div>
          <div className="text-sm text-[#7E858B] font-light">
            {moment(msg.timestamp).fromNow()}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div style={{ paddingBottom: "16px", paddingTop: "16px" }}>
        <ILabel text="Notifications" />
      </div>
      {Object.keys(categorizedMessages).map((category) => (
        <IPanel key={category} title={category} buttonLabel="Mark all as read">
          <div className="mt-8">
            {categorizedMessages[category].map((msg: any) =>
              renderMessage(msg),
            )}
          </div>
        </IPanel>
      ))}
    </div>
  );
}

export default NotificationsComponent;
