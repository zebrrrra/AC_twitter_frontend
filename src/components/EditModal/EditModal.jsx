import { useState } from "react"
import style from "../EditModal/EditModal.module.scss"
import AuthInput from "../AuthInput/AuthInput"
import editAvatar from '../../assets/icons/editAvatar.svg'
import editCover from "../../assets/icons/editCover.svg"
import { ReactComponent as Upload } from "../../assets/icons/camera.svg"
import { ReactComponent as Fork } from "../../assets/icons/Vector.svg"
import { PutUserProfile } from "../../api/user"

const EditModal = ({ open, onClose, onChange }) => {

  const [selectedImage, setSelectedImage] = useState(null);




  //接api的資料
  const [cover, setCover] = useState(editCover)
  const [avatar, setAvatar] = useState(editAvatar)

  const [description, setDescription] = useState('')
  const handleAvatarUpload = (e) => {
    const data = e.target.files[0];
    if (!data) return;
    const formData = new FormData();
    formData.append('avatar', data)
    console.log(formData.get('avatar'))

  }
  const handleCoverUpload = (e) => {
    const data = e.target.files[0];
    if (!data) return;

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
          <button className={style.saveButton} onClick={() => onClose(false)}> 儲存 </button>
        </header>
        <form className={style.uploadFormContainer} action="/api/users/:id/profile" method="POST" encType="multipart/form-data">

          <label htmlFor="coverUpload" className={style.bgContainer}>
            <img src={cover} alt="cover" />
            <Upload className={style.upload} />
            <Fork className={style.fork} />
          </label>
          <input type="file"
            id="coverUpload"
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleCoverUpload} />

          <label htmlFor="Avatarupload" className={style.avatarContainer}>
            <img src={avatar} alt="avatar" />
            <Upload className={style.upload} />
          </label>
          <input type="file"
            id="Avatarupload"
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleAvatarUpload} />

        </form>


        <div className={style.inputContainer}>
          <AuthInput value={56} label="名稱" id="username" type="text" placeholder="請輸入使用者名稱" maxLength={50} onChange={(nameValue) => onChange(nameValue)} message />

          <AuthInput value={description} label="自我介紹" id="description" type="text" placeholder="請輸入自我介紹" maxLength={160} onChange={(descriptionValue) => setDescription(descriptionValue)} message height={147} />
        </div>
      </div>
    </div>



  )
}
export default EditModal