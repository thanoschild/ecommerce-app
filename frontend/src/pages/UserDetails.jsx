import React, { useEffect, useState } from "react";
import summaryApi from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from "../components/ChangeUserRole";
import { setUserDetails } from "../store/userSlice";

function UserDetails() {
  const [allUser, setAllUser] = useState([]);
  const [openUpdateRole, setopenUpdateRole] = useState(false);
  const [updateUserDetails, SetUpdateUserDetails] = useState({
    _id: "",
    email: "",
    name: "",
    role: "",
  });

  async function fetchAllUsers() {
    const fetchData = await fetch(summaryApi.allUser.url, {
      method: summaryApi.allUser.method,
      credentials: "include",
    });

    const resData = await fetchData.json();
    if (resData.success) {
      setAllUser(resData.data);
    }
    if (resData.error) {
      toast.error(resData.message);
    }
  }

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="bg-white pb-6">
      <table className="w-full userTable">
        <thead>
          <tr className="bg-red-500">
            <th>Sr No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUser.map((element, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{element?.name}</td>
                <td>{element?.email}</td>
                <td>{element?.role}</td>
                <td>{moment(element?.createdAt).format("LL")}</td>
                <td>
                  <button
                    className="bg-green-200 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white"
                    onClick={() => {
                      SetUpdateUserDetails(element);
                      setopenUpdateRole(true);
                    }}
                  >
                    <MdModeEdit />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {openUpdateRole && (
        <ChangeUserRole
          userId={updateUserDetails._id}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          onClose={() => setopenUpdateRole(false)}
          callFunc={fetchAllUsers}
        />
      )}
    </div>
  );
}

export default UserDetails;
