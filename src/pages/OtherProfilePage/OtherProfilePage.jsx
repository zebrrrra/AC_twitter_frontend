import RecommendList from '../../components/RecommendList/RecommendList';
import Navbar from '../../components/Navbars/Navbars';
import Header from '../../components/Headers/Headers';
import Main from '../../components/Main/Main';
import style from "./OtherProfilePage.module.scss"
import AuthContext from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { useEffect, useContext } from 'react';
//import { useParmas } from 'react-router-dom';

const OtherProfilePage = () => {

  //const {userId } = useParams();
  /*不確定Router*/
  //const { isAuthenticated } =useAuth ();
  //const navigate = useNavigate ();
  //useEffect (()=>{
  // if (isAuthenticated){
  //    navigate ('/login');
  //  } else {
  //    navigate('/');
  //  }
  //})

  const { isAuthenticated, user } = useContext(AuthContext);
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
          <Main />
        </div>
        <div className={style.rightColumn}>
          <RecommendList />
        </div>
      </div>
    </div>
  )
}

export default OtherProfilePage;