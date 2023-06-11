import axios from "axios";
import { useState } from "react";
import url from "../url/url";

const useUserSave = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [categoryOne, setCategoryOne] = useState("");
  const [categoryTwo, setCategoryTwo] = useState("");
  const [categoryThree, setCategoryThree] = useState("");
  const [select, setSelect] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleUserSave = async (e) => {
    e.preventDefault();
    setUserLoading(true);
    try {
      const response = await axios.post(`${url.mainUrl}/create`, {
        name,
        category,
        subcategoryOne: categoryOne,
        subcategoryTwo: categoryTwo,
        subcategoryThree: categoryThree,
        agreeToTerms: "agree",
      });
      if (response.data.status === "success") {
        setMessage("user saved successfully");
        setTimeout(() => setMessage(""), 5000);
        localStorage.setItem("userID", response.data.message);
        localStorage.setItem("name", name);
        localStorage.setItem("category", category);
        localStorage.setItem("categoryOne", categoryOne);
        localStorage.setItem("categoryTwo", categoryTwo);
        localStorage.setItem("categoryThree", categoryThree);
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
    select,
    setSelect,
    userLoading,
    message,
    handleUserSave,
    success,
  };
};

export default useUserSave;
