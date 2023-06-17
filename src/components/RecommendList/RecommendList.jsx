import style from './RecommendList.module.scss';
import RecommendItem from '../RecommendItem/RecommendItem';
import {useState, useEffect} from 'react'; 
import {getTopFollowers} from '../../apis/user';
import useFollow from "../../hooks/FollowHook";
//import {postFollowShips, deleteFollowShips } from '../../apis/followship';
//import {useAuth} from '../../context/AuthContext';
import { useUpdateTag } from '../../context/UpdateTagContext';

 const RecommendList = ({userId,loginUserId})=>{
    const [users, setUsers] = useState([]);
    const { updateTag, setUpdateTag } = useUpdateTag();
    const { handleFollow, handleUnFollow } = useFollow(loginUserId, setUsers, setUpdateTag);

    useEffect(()=>{
        const fetchTopFollowers = async () => {
      
            const userData =await getTopFollowers();
            console.log (userData);//測試
            if (userData) {
                setUsers(userData);
            }
        }
        fetchTopFollowers();
    },[userId,updateTag]);

    return (
    <div className={style.recommendListContainer}>
      <h5 className="justify center">推薦跟隨</h5>
      {users.map(user => (
        <RecommendItem 
        key={user.id} 
        user={user}
        loginUserId={loginUserId}
        onFollow={handleFollow}
        onUnfollow={handleUnFollow} />
      ))}
    </div>
  )
};

export default RecommendList;