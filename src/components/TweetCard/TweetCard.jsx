//import {useState, useEffect} from 'react';
//import axios from 'axios';
import {ReactComponent as LikeIcon} from '../../assets/icon/like_1.svg';
import {ReactComponent as IsLikeIcon} from '../../assets/icon/like.svg';
import replyIcon from '../../assets/icon/reply_1.svg'
//mport { ReactComponent as Avatar } from '../../assets/icon/img.svg'
import style from './TweetCard.module.scss';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useNavigate } from 'react-router-dom';

dayjs.extend(relativeTime);
dayjs.locale('zh-tw');
function getTime(createdAt) {
    const currentTime = dayjs();
    const createdTime = dayjs(createdAt);

    if (currentTime.diff(createdTime, 'hour') < 24) {
        return createdTime.fromNow();//day.js的套件
    } else {
        return createdTime.format('YYYY/MM/DD');
    }
}


const TweetCard = ({ tweet,onLike,onUnLike }) => {
    const navigate = useNavigate();
    const handleAvatarClick = (userId) => {
        navigate(`/${userId}`);
      };
      
    const handleButtonClick =  () =>{
        console.log('like:',onLike, 'unlike:', onUnLike,'isCurrentUserLiked:', tweet.isCurrentUserLiked);
        if (tweet.isCurrentUserLiked){
         onUnLike (tweet.id);
        } else{
            onLike (tweet.id);
        }
    };
    const {
        User: {name,account,avatar}= {},
        description,
        repliesCount,
        likesCount,
        createdAt,
        isCurrentUserLiked,
    } = tweet;


        return (
            <>
                <div className={style.tweetCardContainer}>
                <div className={style.tweetCard}>
                    <img src={avatar} className={style.avatar}  onClick={() => handleAvatarClick(tweet.User.id)}alt="avatar"/>
                    <div className={style.contentContainer}>
                        <div className={style.nameAndUserId}>
                            <span className={style.name}>{name}</span>
                            <span className={style.userIdTime}>@{account}・{getTime(createdAt)}</span>
                        </div>
                        <div className={style.tweet}>
                            {description}
                        </div>
                        <div className={style.countContainer}>
                            <div className={style.count}>
                                <img src={replyIcon} alt="reply" />{repliesCount}</div>
                            <div className={style.count}>
                               {isCurrentUserLiked? 
                                    <IsLikeIcon className={style.isLikeIcon} onClick={handleButtonClick}/>
                                    :
                                    <LikeIcon className={style.likeIcon} onClick={handleButtonClick} />
                                }
                                {likesCount}</div>
                        </div>
                    </div>

                </div>
                </div>
            </>
        );

}

export default TweetCard;



//const TweetCard = () =

   // return (
        //<div className={style.tweetCardContainer}>
          /*第一組
          <div className={style.tweetCard}>
                <div className={style.avatar}> <Avatar/></div>
                <div className={style.contentContainer}>
                <div className={style.nameAndUserId}>
                    <span className={style.name}>John Doe</span>
                    <span className={style.userIdTime}>@heyjohn・3小時</span>
                </div>
            
            <div className={style.tweet}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
            <div className={style.countContainer}>
                <div className={style.count}>
                    <img src= {replyIcon} alt="reply"/>13</div>
                    <div className={style.count}>
                    <img src= {likeIcon} alt="like"/>76
                </div>
            </div>
            </div>
             第一組結尾
             </div>
             /*第二組reply
             <div className={style.tweetCard}>
            <div className={style.avatar}> <Avatar/></div>
                <div className={style.contentContainer}>
                <div className={style.nameAndUserId}>
                    <span className={style.name}>John Doe</span>
                    <span className={style.userIdTime}>@heyjohn・3小時</span>
                </div>
                <div className={style.replyContainer}>
                    <div className={style.reply}>回覆</div>
                    <div className={style.replyId}>@apple</div> </div>
            <div className={style.tweet}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
            
            </div>
            </div>
            /*第二組結尾
        </div>
    );
}
export default TweetCard;*/


/*const TweetCard = ({tweet}) =>{
const [replyCount, setReplyCount] = useState(0);
const [likeCount, setLikeCount] =useState(0);

useEffect(() => {
    const fetchRepliesAndLikes = async () => {
      const replyResult = await axios.get(`/api/tweets/${tweet.id}/replies`);
      const likeResult = await axios.get(`/api/tweets/${tweet.id}/like`);
      setReplyCount(replyResult.data.length);
      setLikeCount(likeResult.data.length);
    }
    fetchRepliesAndLikes();
  }, [tweet.id]);

  return (
    <div>
<img src= {tweet.avatar} alt="avatar" />
<div>{tweet.userName}</div>
<div>{tweet.userId}</div>
<div>{tweet.timeStamp}</div>
<div>{tweet.content}</div>
<div><img src={likeIcon} alt="like"/>
{replyCount} </div>
<div><img src={likeIcon} alt="like"/>
{likeCount} </div>
    </div>

  );

}

export default TweetCard;*/
