import FollowerCard from "../FollowCard/FollowerCard";
import useFollow from "../../hooks/FollowHook";

const FollowersList = ({users, setUsers})=>{
const {handleFollow,handleUnFollow}=useFollow(users,setUsers);
console.log('Rendering FollowerList with users:', users);


    return (
        <>
        {users&&users.map(user => (
    <FollowerCard
    key ={user.id}
    user={user}
    onFollow={handleFollow}
    onUnfollow={handleUnFollow}/>
    
     ))}
     </>
    )
    };

export default FollowersList;