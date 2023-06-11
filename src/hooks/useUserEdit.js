import axios from "axios";
import { useState } from "react";
import url from "../url/url";

const useUserEdit = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [categoryOne, setCategoryOne] = useState("");
  const [categoryTwo, setCategoryTwo] = useState("");
  const [categoryThree, setCategoryThree] = useState("");
  const [userLoading, setUserLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const id = localStorage.getItem("userID");

  const handleUserSave = async (e) => {
    e.preventDefault();
    setUserLoading(true);
    try {
      const response = await axios.put(`${url.mainUrl}/updateUserDetail`, {
        id,
        name,
        category,
        subcategoryOne: categoryOne,
        subcategoryTwo: categoryTwo,
        subcategoryThree: categoryThree,
      });
      if (response.data.status === "success") {
        setMessage("user saved successfully");
        setTimeout(() => setMessage(""), 5000);
        if (name) {
          localStorage.setItem("name", name);
        }
        if (category) {
          localStorage.setItem("category", category);
        }
        if (categoryOne) {
          localStorage.setItem("categoryOne", categoryOne);
        }
        if (categoryTwo) {
          localStorage.setItem("categoryTwo", categoryTwo);
        }
        if (categoryThree) {
          localStorage.setItem("categoryThree", categoryThree);
        }
        e.target.reset();
        setSuccess(true);
      }
    } catch (error) {
      alert("Server error");
    }
    setUserLoading(false);
  };

  return {
    setName,
    setCategory,
    setCategoryOne,
    setCategoryTwo,
    setCategoryThree,
    userLoading,
    message,
    handleUserSave,
    success,
  };
};

export default useUserEdit;
