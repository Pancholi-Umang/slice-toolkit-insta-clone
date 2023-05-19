import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './chat.css'

const ChatRoom = () => {
  const chat = useSelector(state => state?.registration?.users)
  const loginUser = useSelector((state) => state?.registration?.user);

  const appFilter = chat.filter((app)=>{
    return loginUser?.id !== app?.id
  })

  return (
    <div>
      <section style={{ backgroundColor: "#eee" }}>
        <div className="container py-5">
          <div className="row d-flex justify-content-center">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 mb-4 mb-md-0">
              <h5 className="font-weight-bold mb-3 text-center text-lg-center">
                Member
              </h5>
              <div className="card">
                <div className="card-body">
                  <ul className="list-unstyled mb-0">
                    {
                      appFilter?.map((allusers, index) => {
                        const {name,id,profile,email} = allusers;
                        return (
                          <li className="p-2 border-bottom mb-3"
                            style={{ backgroundColor: "#eee" }}
                            key={index}
                          >
                            <Link to={`/allchat/${id}/${name}`} className="d-flex justify-content-between">
                              <div className="d-flex flex-row">
                                <img
                                  src={profile}
                                  alt="avatar"
                                  className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                                  width={60}
                                />
                                <div className="pt-1">
                                  <p className="fw-bold mb-0">{name}</p>
                                  <p className="small text-muted">
                                    {email}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChatRoom;
