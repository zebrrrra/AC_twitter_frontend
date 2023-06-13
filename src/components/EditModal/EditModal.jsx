import { useState } from "react"
import style from "../EditModal/EditModal.module.scss"
import AuthInput from "../AuthInput/AuthInput"
import editAvatar from '../../assets/icons/editAvatar.svg'
import editCover from "../../assets/icons/editCover.svg"
import { ReactComponent as Upload } from "../../assets/icons/camera.svg"
import { ReactComponent as Fork } from "../../assets/icons/Vector.svg"
import { putUserProfile } from "../../apis/user"

const EditModal = ({ open, onClose, onChange, payload }) => {
  //  name, introduction, avatar, cover
  const { name, introduction, avatar, cover } = payload || {};
  const [editName, setEditName] = useState(name);
  const [editAvatar, setEditAvatar] = useState(avatar);
  const [editCover, setEditCover] = useState(cover);
  const [editIntroduction, setEditIntroduction] = useState(introduction);

  //接api的資料
  // const [name, setName] = useState(payload.name)
  // const [avatar, setAvatar] = useState(payload.avatar)

  // const [cover, setCover] = useState(payload.cover)
  // const [introduction, setIntroduction] = useState(payload.introduction)

  const handleAvatarUpload = (e) => {
    // 取得使用者上傳的圖
    const data = e.target.files[0];
    if (!data) return;

    setEditAvatar(data)
  }
  const handleCoverUpload = (e) => {
    const data = e.target.files[0];
    if (!data) return;
    setEditCover(data)
  }

  // 儲存後發送api
  const handleProfileSave = async () => {
    const { id } = payload
    const savePayload = await putUserProfile({ id, name: editName, avatar: editAvatar, cover: editCover, introduction: editIntroduction })

    console.log(savePayload)
    onClose(false)
  }

  if (!open) return;
  return (
    <div className={style.grayBackground}>
      <div className={style.container}>
        <header className={style.header}>
          <div className={style.leftContainer}>
            <button onClick={() => onClose(false)}> X </button>
            <h5 className="title">編輯個人資料</h5>
          </div>
          <button className={style.saveButton} onClick={handleProfileSave}> 儲存 </button>
        </header>
        {/* <form className={style.uploadFormContainer} action="/api/users/:id/profile" method="POST" encType="multipart/form-data"> */}

        <label htmlFor="coverUpload" className={style.bgContainer}>
          <img src={editCover} alt="cover" />
          <Upload className={style.upload} />
          <Fork className={style.fork} />
        </label>
        <input type="file"
          id="coverUpload"
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleCoverUpload} />

        <label htmlFor="Avatarupload" className={style.avatarContainer}>
          <img src={editAvatar} alt="avatar" />
          <Upload className={style.upload} />
        </label>
        <input type="file"
          id="Avatarupload"
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleAvatarUpload} />

        {/* </form> */}



        <div className={style.inputContainer}>
          <AuthInput value={editName} label="名稱" id="名稱" type="text" placeholder="請輸入使用者名稱" maxLength={50} onChange={(nameValue) => setEditName(nameValue)} message />

          <AuthInput value={editIntroduction} label="自我介紹" id="introduction" type="text" placeholder="請輸入自我介紹" maxLength={160} onChange={(introductionValue) => setEditIntroduction(introductionValue)} message height={147} />
        </div>
      </div>
    </div>



  )
}
export default EditModal

