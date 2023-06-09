//settingPage.jsx
import { Component, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../../components/Navbars/Navbars';
import Header from '../../components/Headers/Headers';
import { AuthInput } from '../../components';
import style from './SettingPage.module.scss'
import Swal from 'sweetalert2';
import { useAuth } from '../../context/AuthContext';
import { getUsers } from '../../apis/user';
import { useLocation } from 'react-router-dom';

const SettingPage = () => {
  const [account, setAccount] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [checkPassword, setCheckPassword] = useState('')
  const [responseError, setResponseError] = useState(false)
  const [errorInfo, setErrorInfo] = useState('')
  const navigate = useNavigate();
  const { pathname } = useLocation();



  const { putUserSetting, isAuthenticated, user } = useAuth()
  // user)
  const currentUserId = user && user.id



  const handleSubmit = async (e) => {
    const id = user.id
    e.preventDefault();



    if (!account?.trim() || !password?.trim() || !name?.trim() || !checkPassword?.trim() || !email?.trim()) {
      Swal.fire({
        title: '內容不可空白',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
        position: 'top',
      });
      return
    }
    const { success, message } = await putUserSetting({
      id,
      account,
      name,
      email,
      password,
      checkPassword

    });
    if (success) {

      Swal.fire({
        title: '編輯成功',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
        position: 'top',
      });
      setResponseError(false)
      navigate(`/profile`)

      return
    }

    if (!success) {

      Swal.fire({
        title: `${message}`,
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
        position: 'top',
      });
      setResponseError(true)
      setErrorInfo(message)
      return
    }
  }
  useEffect(() => {
    const controller = new AbortController();

    const fetchCurrentUserData = async () => {
      const data = await getUsers({ id: currentUserId, signal: controller.signal })
      if (data) {
        const { account, email, name } = data
        setAccount(account)
        setName(name)
        setEmail(email)
      }
    }
    fetchCurrentUserData()
    return () => {
      controller.abort()
    }
  }, [currentUserId])

  const authInputCollection = [
    { label: '帳號', id: 'account', type: 'text', placeholder: '請輸入帳號', value: account, onChange: (accountValue) => setAccount(accountValue) },
    { label: '名稱', id: 'name', type: 'text', placeholder: '請輸入使用者名稱', value: name, maxLength: 50, onChange: (nameValue) => setName(nameValue) },
    { label: 'Email', id: 'email', type: 'email', placeholder: '請輸入Email', value: email, onChange: (emailValue) => setEmail(emailValue) },
    { label: '密碼', id: '密碼', type: 'password', placeholder: '請輸入密碼', value: password, onChange: (passwordValue) => setPassword(passwordValue) },
    { label: '密碼確認', id: '密碼確認', type: 'password', placeholder: '請再次輸入密碼', value: checkPassword, onChange: (checkPasswordValue) => setCheckPassword(checkPasswordValue) },
  ];

  return (
    <div className={style.homeContainer}>
      <div className={style.homeColumn}>
        <div className={style.leftColumn}>
          <Navbar />
        </div>
        <div className={style.middleColumn}>
          <div className={style.settingHeader}>帳戶設定</div>
          <form className={style.form} onSubmit={handleSubmit}>
            {authInputCollection.map(({ label, id, type, placeholder, value, maxLength, onChange }) => (
              <AuthInput
                key={id}
                label={label}
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                maxLength={maxLength}
                onChange={onChange}
                responseError={responseError}
                errorInfo={errorInfo}
              />
            ))}
            <button className={style.button} type="submit">儲存</button>
          </form >
        </div>
        <div className={style.rightColumn}>
          <div className={style.navbarContainer}></div>

        </div>
      </div>
    </div>
  )
}


/*不確定Router*/



export default SettingPage