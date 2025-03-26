import axios from "axios";
import React, { useEffect, useState } from "react";
import { api } from "../Host/host";
import { usePathname } from "next/navigation";

export default function Comments() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const pathname = usePathname();
  const id = pathname.split("/")[2];

  useEffect(() => {
    const getData = async () => {
      if (!id) {
        setLoading(false);
        setError("ID not found in URL");
        return;
      }

      const fullUrl = `${api}/blog/comments/`;

      try {
        setLoading(true);
        const response = await axios.get(fullUrl);

        const filteredData = id
          ? response.data.filter(
              (comment) =>
                comment.announcement === parseInt(id) ||
                comment.announcement === id
            )
          : response.data;

        setData(filteredData);
        setLoading(false);
      } catch (err) {
        console.error("Error details:", err);
        setError(`Failed to load comments: ${err.message}`);
        setLoading(false);
      }
    };

    getData();
  }, [id]);

  if (loading) return <p>Отзывы загружаются....</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div className="com">
      {data && data.length > 0 ? (
        data.map((item, key) => (
          <div key={key} className="com_col">
            <div className="com_col_text">
              <div className="com_col_text1">
                <h2>{item.user_name}</h2>
                <span>{item.created_at}</span>
              </div>
              <div className="rating-stars">
                {Array.from({ length: item.rating }, (_, index) => (
                  <span key={index} className="star">
                    ★
                  </span>
                ))}
              </div>
            </div>
            <h1>{item.announcement_title}</h1>
            <p>{item.text}</p>
          </div>
        ))
      ) : (
        <p>Отзывы отсутствуют.</p>
      )}
    </div>
  );
}
