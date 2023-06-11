//import TweetContext from '../Tab/Tab';
import { useEffect, useState } from 'react';
import LikeCard from '../LikeCard/LikeCard';
import { getUserLike } from '../../apis/user';
import { useParams } from 'react-router-dom';

//import style from '';
//假設有Authcontext(還沒寫)

const LikeList =({userId })=> {
    const [likes, setLikes] =useState([]);


    useEffect(()=>{
        const fetchLikes = async () => {
            const data = await getUserLike(userId);  
            console.log(data);//測試
            if (data) {
                setLikes(data);
            }
        }
        fetchLikes();
     }, [userId]);
return likes?likes.map((like,index) => <LikeCard like={like} key={like.id} type="like"/>): null;
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