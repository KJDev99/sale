"use client";
import React from "react";

export default function Message({ data }) {
  return (
    <div className="chat_row">
      {data ? (
        data.map((data) => (
          <div className="chat_col" key={data.id}>
            {data.messages.map((message, indx) => (
              <div key={indx} className="chat_col-item">
                <p className="p"> {message?.sender}</p>
                <p> {message?.text}</p>
                <div className="chat_col_text">
                  <span>{new Date(message?.created_at).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        ))
      ) : (
        <p>Чат недоступен</p>
      )}
    </div>
  );
}
