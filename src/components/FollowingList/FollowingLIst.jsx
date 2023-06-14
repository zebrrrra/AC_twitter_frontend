import FollowCard from "../FollowCard/FollowCard";
import useFollow from "../../hooks/FollowHook";

const FollowingList = ({users, setUsers})=>{
    
    const {handleFollow, handleUnFollow} = useFollow(users,setUsers);
    console.log('Rendering FollowingList with users:', users);


    return (
        <>
        {users&& users.map(user => (
    <FollowCard
    key ={user.id}
    user={user}
    onFollow={handleFollow}
    onUnfollow={handleUnFollow}/>
    
     ))}
     </>
    )
    };

export default FollowingList;