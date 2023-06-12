import UserInfo from '../UserInfo/UserInfo'
import Tab from '../Tab/Tab';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import TweetList from '../TweetList/TweetList';
const Main = ({ userId }) => {
  // const { id } = useParams();
  const { user } = useAuth();



  useEffect(() => {
    console.log('params id:', userId); // params id: 123
  }, []);



  return (
    <>
      <UserInfo userId={userId} />
      <Tab userId={user && user.id} />
      <TweetList userId={userId} />
    </>
  )

}


/*
    <Routes>
    <Route path="tweets/*" element={<TweetList userId={id}/>} />
        <Route path="replies/*" element={<ReplyList userId={id}/>} />
        <Route path="likes/*" element={<LikeList userId={id}/>} />
    </Routes>
    <Tab onTabChange={setActiveTab} />
    <TweetList activeTab={activeTab} />
    
    
    const Main = () => {
  const { userId, tab } = useParams();
  const [tweets, setTweets] = useState([]);
  useEffect(() => {
    const tabRoutes = {
      tweets: 'tweets',
      replied: 'replied_tweets',
      likes: 'likes',
    };
    const fetchData = async () => {
      const endpoint = tabRoutes[tab] || 'tweets'; //登入後第一個頁面
      const result = await axios(`/api/users/${userId}/${endpoint}`);
      setTweets(result.data);
    };
    fetchData();
  }, [userId, tab]);


  return (
    <div>
      <Routes>
        <Route path="user/:userId/:tab">
          <Tab />
          <TweetList tweets={tweets} />
        </Route>
        <Route path="/user/:userId">
          <Navigate to={`/user/${userId}/tweets`} />
        </Route>
      </Routes>

    </div>)
};*/
export default Main;
