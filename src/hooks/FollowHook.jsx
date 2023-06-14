import { useState,useEffect } from "react";
import { getUsers } from "../apis/user";
import { postFollowShips, deleteFollowShips } from "../apis/followship";
const useFollow = (users, setUsers) => {
const [updateFlag, setUpdateFlag] = useState(false);


const handleFollow = async (id) => {
  try {
    const response = await postFollowShips(id);
    if (response && response.status === 'success') {
      const updatedUser = await getUsers(id);
      if (updatedUser) {
        setUsers((currentUsers) => 
          currentUsers.map((user) => 
            user.id === id ? { ...user, ...updatedUser } : user
          )
        );
      }
    }
  } catch (error) {
    console.error('Error in handleFollow:', error);
  }
};

const handleUnFollow = async (id) => {
  try {
    const response = await deleteFollowShips(id);
    if (response && response.status === 'success') {
      const updatedUser = await getUsers(id);
      if (updatedUser) {
        setUsers((currentUsers) => 
          currentUsers.map((user) => 
            user.id === id ? { ...user, ...updatedUser } : user
          )
        );
      }
    }
  } catch (error) {
    console.error('Error in handleUnFollow:', error);
  }
};
  return { users, handleFollow, handleUnFollow, updateFlag };
};

export default useFollow;