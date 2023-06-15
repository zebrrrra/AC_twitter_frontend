import {Navbars, RecommendList} from '../../components';
import { Route, Routes, } from 'react-router-dom';
import FollowTab from '../../components/Tab/FollowTab';
import {useAuth} from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import style from './FollowPage.module.scss';
import FollowingList from '../../components/FollowingList/FollowingLIst';
import FollowersList from '../../components/FollowersList/FollowersList';

const FollowPage = ()=>{

    const { user,isAuthenticated} = useAuth();
    console.log(user); //測試
    const navigate =useNavigate();
    useEffect(()=>{
      if (!isAuthenticated){
        navigate ('/login');
      }
      },[navigate,isAuthenticated])
  console.log('FollowPage測試:',user)

    return(
        <div className={style.followContainer}>
        <div className={style.homeColumn}>
          <div className={style.leftColumn}>
            <Navbars/>
            </div>
            <div className={style.middleColumn}>
      <FollowTab userId={user && user.id}/>
      <Routes>
        <Route path="followings" element={<FollowingList userId={user && user.id}/>} />
        <Route path="followers" element={<FollowersList userId={user && user.id} />} />
        <Route path="*" element={<FollowingList userId={user && user.id} />} /> 
      </Routes>
    </div>
        <div className={style.rightColumn}>
            <RecommendList/>
            </div>
      </div>
    </div>
    )
}

export default FollowPage;
