//import { useAuth } from '';
//import { useEffect } from 'react;
//import { useNavigate } from 'react-router-dom';
import RecommendList from '../../components/RecommendList/RecommendList';
import Navbar from '../../components/Navbars/Navbars';
import Header from '../../components/Headers/Headers';
import Main from '../../components/Main/Main';
import style from './ProfilePage.module.scss'
import AuthContext from '../../context/AuthContext'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { useAuth } from '../../context/AuthContext';

const ProfilePage = () => {
  const { id } = useParams();
  //const {userId } = useParams();
  /*不確定Router*/
  const { isAuthenticated } = useAuth();
  //const navigate = useNavigate ();
  //useEffect (()=>{
  // if (isAuthenticated){
  //    navigate ('/login');
  //  } else {
  //    navigate('/');
  //  }
  //})
  console.log(id)
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate, isAuthenticated])

  return (
    <div className={style.profileContainer}>
      <div className={style.homeColumn}>
        <div className={style.leftColumn}>
          <Navbar />
        </div>
        <div className={style.middleColumn}>
          <Header />
          <Main userId={id} />
        </div>
        <div className={style.rightColumn}>
          <RecommendList />
        </div>
      </div>
    </div>
  )
}

export default ProfilePage;