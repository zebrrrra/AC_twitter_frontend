import style from './Tab.module.scss';
import { useState, useEffect} from 'react';
import { useNavigate, useLocation} from 'react-router-dom';



const FollowTab = ({ userId }) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("正在追隨");
    const location = useLocation();
  
    useEffect(() => {
        const currentPath = location.pathname.split('/').pop();
        switch (currentPath) {
            case 'followers':
                setActiveTab('追隨者');
                break;
            case 'followings':
                setActiveTab('正在追隨');
                break;
            default:
                setActiveTab('追隨者');
                break;
        }
    }, [location.pathname]);  
    
    const handleClick = (tabName) => {
        setActiveTab(tabName);
        switch (tabName) {
            case "追隨者":
                navigate(`/${userId}/followers`);
                break;
            case "正在追隨":
                navigate(`/${userId}/followings`);
                break;
            default:
                navigate(`/${userId}/followers`);
                break;
        }
    };

    return (
        <div className={style.tabContainer}>
            <div 
                className={`${style.tab} ${activeTab === "追隨者" ? style.active : ""}`}
                onClick={() => handleClick("追隨者")}
            >
                追隨者
            </div>
            <div 
                className={`${style.tab} ${activeTab === "正在追隨" ? style.active : ""}`}
                onClick={() => handleClick("正在追隨")}
            >
                正在追隨
            </div>
        </div>
    );
}

export default FollowTab;