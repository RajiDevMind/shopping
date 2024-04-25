import React, { useEffect, useState } from "react";
import "./Profile.scss";
import PageMenu from "../../components/pageMenu/PageMenu";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/card/Card";
import { getUser, updateImg, updateUser } from "../../redux/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import { AiOutlineCloudUpload } from "react-icons/ai";

const cloudName = "rajidevmind";
const uploadPreset = "dqmuli5h";

const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

const Profile = () => {
  // useSelector to select an item from redux anywhere in your application
  const { isLoading, user } = useSelector((state) => state.auth);

  const initialState = {
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    role: user?.role || "",
    photo: user?.photo || "",
    address: {
      address: user?.address?.address || "",
      state: user?.address?.state || "",
      country: user?.address?.country || "",
    },
  };

  const [profile, setProfile] = useState(initialState);
  const [profileImg, setProfileImg] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);

  const dispatch = useDispatch();

  // fetching data from db
  useEffect(() => {
    if (user) {
      setProfile(initialState);
    }
  }, [dispatch, user]);

  // placing data from db to the form field
  useEffect(() => {
    if (user === null) {
      dispatch(getUser());
    }
  }, [dispatch, user]);

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = async (e) => {
    setProfileImg(e.target.files[0]);
    setImgPreview(URL.createObjectURL(e.target.files[0]));
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    if (!user.name || !user.phone) {
      return toast.error("Name and Contact are required!!!");
    }
    const userData = {
      name: profile.name,
      phone: profile.phone,
      address: {
        address: profile.address,
        state: profile.state,
        country: profile.country,
      },
    };
    await dispatch(updateUser(userData));
  };

  const savePhoto = async (e) => {
    e.preventDefault();
    let imageURL;
    try {
      if (
        profileImg !== null &&
        (profileImg.type === "image/jpeg" ||
          profileImg.type === "image/jpg" ||
          profileImg.type === "image/png")
      ) {
        const image = new FormData();
        image.append("file", profileImg);
        image.append("cloudName", cloudName);
        image.append("uploadPreset", uploadPreset);

        // save to cloudinary
        const resp = await fetch(url, { method: "POST", body: image });
        const imgData = await resp.json();
        imageURL = imgData.secure_url.toString();
      }

      // save image to mongodb
      const userData = { photo: profileImg ? imageURL : profile.photo };
      await dispatch(updateImg(userData));
      setImgPreview(null);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <section>
        {isLoading && <Loader />}
        <div className="container">
          <PageMenu />
          <h2>Profile</h2>
          <div className="--flex-start profile">
            <Card cardClass={"card"}>
              {!isLoading || (!user && <p>Check your internet connection!</p>)}
              {!isLoading && user && (
                <>
                  <div className="profile-photo">
                    <div>
                      <img
                        src={imgPreview === null ? user?.photo : imgPreview}
                        alt="user Profile Image"
                      />
                      <h3>Role: {profile.role}</h3>
                      {imgPreview !== null && (
                        <div className="--center-all">
                          <button
                            className="--btn --btn-secondary"
                            onClick={savePhoto}
                          >
                            <AiOutlineCloudUpload size={18} />
                            Upload Photo
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <form onSubmit={saveProfile}>
                    <p>
                      <label htmlFor="name">Change Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        name="image"
                        onChange={handleImageChange}
                      />
                    </p>
                    <p>
                      <label htmlFor="name">Name:</label>
                      <input
                        type="text"
                        placeholder="Your Name?"
                        name="name"
                        value={profile?.name}
                        onChange={handleInputChange}
                        required
                      />
                    </p>
                    <p>
                      <label htmlFor="name">Email:</label>
                      <label htmlFor="name" style={{ color: "red" }}>
                        Note: You can't edit Email
                      </label>
                      <input
                        type="email"
                        placeholder="roi4tech@gmail.com"
                        name="email"
                        value={profile?.email}
                        onChange={handleInputChange}
                        disabled
                        required
                      />
                    </p>
                    <p>
                      <label htmlFor="name">Phone No:</label>
                      <input
                        type="text"
                        placeholder="+234-7016271182"
                        name="phone"
                        value={profile?.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </p>
                    <p>
                      <label htmlFor="name">Address:</label>
                      <input
                        type="text"
                        name="address"
                        value={profile?.address?.address}
                        onChange={handleInputChange}
                        required
                      />
                    </p>
                    <p>
                      <label htmlFor="name">State:</label>
                      <input
                        type="text"
                        name="state"
                        value={profile?.address?.state}
                        onChange={handleInputChange}
                        required
                      />
                    </p>
                    <p>
                      <label htmlFor="name">Country:</label>
                      <input
                        type="text"
                        name="country"
                        value={profile?.address?.country}
                        onChange={handleInputChange}
                        required
                      />
                    </p>
                    <button className="--btn --btn-primary --btn-block">
                      Update Profile
                    </button>
                  </form>
                </>
              )}
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
