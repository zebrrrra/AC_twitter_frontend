//import TweetContext from '../Tab/Tab';
import { useEffect, useState } from 'react';
import LikeCard from '../LikeCard/LikeCard';
import { getUserLike } from '../../apis/user';
import useLike from '../../hooks/LikeHook';
import { useAuth } from '../../context/AuthContext';
import { useUpdateTag } from '../../context/UpdateTagContext';

const LikeList =({userId })=> {
    const {user} =useAuth();
    const currentUserId = user?.id;
    const { updateTag, setUpdateTag } = useUpdateTag();
    const [likes,setLikes] = useState([]);
    const {likeTweets: updateLikes,handleLike,handleUnLike} =useLike({
        dataItems:likes,
        currentUserId: currentUserId,    
        setUpdateTag
    });

    useEffect(()=>{
        const fetchLikes = async () => {
            const data = await getUserLike(userId);  
            console.log(data);//測試
            if (data) {
                setLikes(data);
            }
        }
        fetchLikes();
     }, [userId,updateTag] );
     
     console.log('likeTweets', updateLikes);
return updateLikes?updateLikes.map((like,index) => 
<LikeCard 
like={like}
 key={like.id}
 onLike={()=>handleLike(like.Tweet.id)}
 onUnLike={()=>handleUnLike(like.Tweet.id)} 
 type="like"/>): null;
    }

export default LikeList;

/*const TweetList =({tweetsContext})=>{

    return (
        <div className="tweetList">
            {tweetsContext.sort((a,b)=> b.timeStamp- a.timeStamp).map((tweet)=>(
                <TweetCard key={tweet.id} tweet={tweet}/>
            ))}
        </div>
    );
};
export default TweetList;*/