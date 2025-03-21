"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import { Carousel, Image, message, Modal } from "antd";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import axios from "axios";
import { useRouter } from 'next/navigation'; 
import { api } from "../../Host/host";
import Comments from "../../comments/Comments";
import Addcom from "../../Addcomment/Addcom";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Send, UserPen } from "lucide-react";

export default function page() {
  const [data, setData] = useState();
  const [rate, setrate] = useState(0);
  const [comment, setcomment] = useState("");
  const [isModalOpen, setisModalOpen] = useState(false);

   const route =useRouter()
const token = localStorage.getItem("token");

  const pathname = usePathname();

  console.log(pathname);

  const id = pathname.split("/")[2]; // `&` bo‘yicha bo‘lish


 



  const sendChats = async () => {
    try {
      // Set loading state if applicable
      // setLoading(true);
  
      const response = await axios({
        url: `${api}/blog/chats/create/`,
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        data: {
          announcement_id: id, // ID of the announcement
        },
      });
  
      console.log(response);
      if (response.data) {
        toast.success("Chat created successfully!");
        route.push(`/chat/${response.data.id}`);
      }
    } catch (err) {
      console.error("Error creating chat:", err);
      if (err.response) {
        console.error("Response status:", err.response.status);
        console.error("Response data:", err.response.data);
        toast.error(err.response.data?.message || "Failed to create chat");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      // Reset loading state if applicable
      // setLoading(false);
    }
  };




  const getData = async () => {
    try {
      const response = await axios.get(`${api}/blog/announcements/${id}`);
      setData(response.data); // Fixed: using response instead of res
      console.log("API Response:", response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleOk = () => {
    if (rate === 0) {
      showToast();
    } else {
      sendDataComment();
    }
  };
  const sendDataComment = async () => {
    try {
      const formData = new FormData();
      formData.append("text", comment);
      formData.append("rating", rate);
      formData.append("announcement", id);

      try {
        const token = localStorage.getItem("token");
        console.log(token, "token");

        const response = await axios({
          url: `${api}/blog/comments/`,
          method: "POST",
          data: formData,
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        setText("");
        setRating("");
        setisModalOpen(false);
      } catch (err) {
        console.log(err);
        if (err.response && err.response.data) {
          console.log("Server error details:", err.response.data);
        }
      }
    } catch (err) {
      console.log(err);
      // Log specific error details to help debug
      if (err.response && err.response.data) {
        console.log("Server error details:", err.response.data);
      }
    }
  };
  const showToast = () => {
    toast.error("Вы не оценили товар. Пожалуйста, оцените его.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };
  
  const handleCancel = () => {
    setisModalOpen(false);
    setrate(0);
    setcomment("");
  };
  useEffect(() => {
    getData();
  }, [id]);



  return (
    <div className="info">
      <Navbar />
      <div className="info_rows">
        {data && (
          <div className="info_ri">
            <h1>{data?.title}</h1>
            <div className="carousel">
           <Carousel  arrows infinite={false}>
      <div >
      <h3 className="contentStyle"><img
                    src={data.images.length>0?data.images[0].image:'/car.png'}
                    alt={data.title || "Product image"}
                    style={{
                      width: "auto",
                      height: "100%",
                      borderRadius: "15px",
                      position:'center',
                      flexWrap:"nowrap",
                      display:"flex",
                      justifyContent:"center"
                    }}/></h3>
      </div>
      <div>
        <h3 className="contentStyle"><img
                    src={data.images.length>0?data.images[0].image:'/car.png'}
                    alt={data.title || "Product image"}
                    style={{
                      width: "auto",
                      height: "100%",
                      borderRadius: "15px",
                      position:'center',
                      flexWrap:"nowrap",
                      display:"flex",
                      justifyContent:"center"
                    }}/></h3>
      </div>
      <div>
        <h3 className="contentStyle"><img
                    src={data.images.length>0?data.images[0].image:'/car.png'}
                    alt={data.title || "Product image"}
                    style={{
                      width: "auto",
                      height: "100%",
                      borderRadius: "15px",
                      position:'center',
                      flexWrap:"nowrap",
                      display:"flex",
                      justifyContent:"center"
                    }}/></h3>
      </div>
      <div>
        <h3 className="contentStyle"><img
                    src={data.images.length>0?data.images[0].image:'/car.png'}
                    alt={data.title || "Product image"}
                    style={{
                      width: "auto",
                      height: "100%",
                      borderRadius: "15px",
                      position:'center',
                      flexWrap:"nowrap",
                      display:"flex",
                      justifyContent:"center"
                    }}/></h3>
      </div>
    </Carousel>
    </div>
            <div className="info_row">
              <div className="info_col">
                <p>
                  Category:{" "}
                  <span>
                    {data?.category?.name || JSON.stringify(data?.category)}
                  </span>
                </p>
                <p>
                  Condition:{" "}
                  <span>
                    {data?.condition?.name || JSON.stringify(data?.condition)}
                  </span>
                </p>
                <p>
                  Location:{" "}
                  <span>
                    {data?.location?.name || JSON.stringify(data?.location)}
                  </span>
                </p>
                <p>
                  Status:{" "}
                  <span>
                    {data?.status?.name || JSON.stringify(data?.status)}
                  </span>
                </p>
              </div>
              <div className="info_col2">
                <p>
                  Plan: <span>{data?.plan}</span>
                </p>
                <p>
                  Priority: <span>{data?.priority}</span>
                </p>
                <p>
                  Price: <span>{data?.price}</span>
                </p>
              </div>
            </div>
            <div className="info_text">
              <h2>Description</h2>
              <p>{data?.description}</p>
            </div>
            <div></div>
            <div className="com_all">
              <h1>Комментарии</h1>
              <Comments />
            </div>
            <button
              onClick={() => {
                setisModalOpen(true);
              }}
              className="add_com_btn"
            >
              Добавить комментарий
            </button>
            <div className="chat_box">
        <div className="chat_box_text">
          <div className="chat_icon">
            <p><UserPen/></p>
          <p><Send/></p>
          </div>
          <button onClick={sendChats}>Chatga otish</button>
          </div>
        </div>
          </div>
        )}

        <Modal
          title="Добавить комментарий"
          open={isModalOpen}
          okText="Отправить"
          cancelText="Отменить"
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div className="com_form_item">
            <label>Оцените товар</label>
            <div className="add_stars">
              <div
                onClick={() => {
                  setrate(1);
                }}
                className={`add_star ${rate >= 1 ? "active_star" : ""}`}
              >
                <FaRegStar className="star_icon" />{" "}
                <FaStar className="active_star_icon" />
              </div>
              <div
                onClick={() => {
                  setrate(2);
                }}
                className={`add_star ${rate >= 2 ? "active_star" : ""}`}
              >
                <FaRegStar className="star_icon" />{" "}
                <FaStar className="active_star_icon" />
              </div>
              <div
                onClick={() => {
                  setrate(3);
                }}
                className={`add_star ${rate >= 3 ? "active_star" : ""}`}
              >
                <FaRegStar className="star_icon" />{" "}
                <FaStar className="active_star_icon" />
              </div>
              <div
                onClick={() => {
                  setrate(4);
                }}
                className={`add_star ${rate >= 4 ? "active_star" : ""}`}
              >
                <FaRegStar className="star_icon" />{" "}
                <FaStar className="active_star_icon" />
              </div>
              <div
                onClick={() => {
                  setrate(5);
                }}
                className={`add_star ${rate >= 5 ? "active_star" : ""}`}
              >
                <FaRegStar className="star_icon" />{" "}
                <FaStar className="active_star_icon" />
              </div>
            </div>
          </div>
          <div className="com_form_item">
            <label>Комментарий</label>
            <textarea
              rows={6}
              value={comment}
              onChange={(e) => {
                setcomment(e.target.value);
              }}
            ></textarea>
          </div>
        </Modal>
      
<div className="advertise">
<div className="right_col advertise_col">
            <img src="/main2.jpg" alt="Katalog rasmi" style={{ width: "100%", height: "auto" }} />
            <img src="/main3.jpg" alt="Katalog rasmi" style={{ width: "100%", height: "auto" }} />
            <img src="/luxury.jpg" alt="Katalog rasmi" style={{ width: "100%", height: "auto" }} />
            <div className="right_text  advertise_col_text">
              <h2>
              Здесь вы можете разместить свою рекламу. Купить и продать</h2>
            </div>
          </div>
</div>

      

        {/* <div className="things_right info_left">
          <h1>Добавить комментарий</h1>
          <div className="right_col2">
          <div className="com_add">
           <Addcom/>
            </div>
          </div>
        </div> */}
      </div>
      <ToastContainer />

    </div>
  );
}
