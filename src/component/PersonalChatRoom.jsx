import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { sendMesaagesUser } from "../redux/PostsSlice";

const PersonalChatRoom = () => {
  const { id, name } = useParams();
  //sau pratham to aa page ma te badha msg hova joiye k jema sender k user hoy tema loginuser?.id hoy
  // user ni id param ni id sathe match thay to teno msg left blue ma and 
  // login ni id and sender ni id match thay te right side white msg ma

  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state?.registration?.user);
  const showmessage = useSelector((state) => state?.Userposts?.messge);
  const [Messagess, setMessagess] = useState("")

  const sendMesaage = (e) => {
    e.preventDefault();
    dispatch(sendMesaagesUser({
      user_id: id,
      user_name: name,
      sender_id: loginUser?.id,
      sender_name: loginUser?.name,
      sender_message: Messagess
    }))
    setMessagess("")
  }


  // as a receiver ma jovu pade sender ma nai
  const allMessagesforThisPage = showmessage?.filter((value) => value?.user_id == loginUser?.id || value?.sender_id == loginUser?.id)

  return (
    <div>
      <section style={{ backgroundColor: "#eee" }}>
        <div className="container py-5">
          <div className="row d-flex justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-4">
              <div className="card" id="chat1" style={{ borderRadius: 15 }}>
                <div
                  className="card-header d-flex justify-content-between align-items-center p-3 bg-info text-white border-bottom-0"
                  style={{ borderTopLeftRadius: 15, borderTopRightRadius: 15 }}
                >
                  <i className="fas fa-angle-left" />
                  <p className="mb-0 fw-bold">Live chat</p>
                  <i className="fas fa-times" />
                </div>
                <div className="card-body" style={{ maxHeight: "500px", overflow: "scroll", position: "relative" }}>
                {
                    allMessagesforThisPage?.map((msg, index) => {

                      if (msg?.user_id == id) {
                        return <div key={index} className="d-flex flex-row justify-content-end mb-4">
                          <div
                            className="p-3 me-3 border"
                            style={{ borderRadius: 15, backgroundColor: "#fbfbfb" }}
                          >
                            <span>
                              <strong>{msg?.sender_name}</strong>
                            </span>
                            <p className="small mb-0">
                              {msg?.sender_message}
                            </p>
                          </div>
                        </div>

                      }else if (msg?.sender_id == id) {
                        return <div key={index} className="d-flex flex-row justify-content-start mb-4">
                          <div
                            className="p-3 ms-3 "
                            style={{
                              borderRadius: 15,
                              backgroundColor: "rgba(57, 192, 237,.2)",
                            }}
                          >
                            <span>
                              <strong>{msg?.sender_name}</strong>
                            </span>
                            <p className="small mb-0">
                              {msg?.sender_message}
                            </p>
                          </div>
                        </div>
                      }
                    })
                  } 

                  <div>
                    <form
                      className="form-outline d-flex align-items-center justify-content-between"
                      style={{ position: "sticky" }}
                      onSubmit={sendMesaage}
                    >
                      <input
                        type="text"
                        className="w-75 border-0"
                        placeholder="Enter Name.."
                        value={Messagess}
                        onChange={(e) => setMessagess(e.target.value)}
                        required
                      />
                      <button
                        type="submit"
                        className="btn btn-sm btn-primary w-25"
                      >
                        send
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PersonalChatRoom;
