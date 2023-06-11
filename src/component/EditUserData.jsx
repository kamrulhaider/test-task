import { useEffect, useState } from "react";
import Select from "react-select";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import url from "../url/url";
import { Link } from "react-router-dom";
import useUserEdit from "../hooks/useUserEdit";

const EditUserData = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedSubSubCategory, setSelectedSubSubCategory] = useState(null);
  const [selectedSubSubSubCategory, setSelectedSubSubSubCategory] =
    useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    setName,
    setCategory,
    setCategoryOne,
    setCategoryTwo,
    setCategoryThree,
    userLoading,
    message,
    handleUserSave,
  } = useUserEdit();

  const username = localStorage.getItem("name");
  const category = localStorage.getItem("category");
  const categoryOne = localStorage.getItem("categoryOne");
  const categoryTwo = localStorage.getItem("categoryTwo");
  const categoryThree = localStorage.getItem("categoryThree");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${url.mainUrl}/category/all`);
        setCategories(response.data?.message[0]?.category);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (category) {
      const foundCategory = categories.find((cat) => cat.name === category);
      if (foundCategory) {
        setSelectedCategory({
          value: foundCategory.name,
          label: foundCategory.name,
          subCategory: foundCategory.subCategory || null,
        });
      }
    }
  }, [category, categories]);

  useEffect(() => {
    if (categoryOne && selectedCategory && selectedCategory.subCategory) {
      const foundSubCategory = selectedCategory.subCategory.find(
        (subCat) => subCat.name === categoryOne
      );
      if (foundSubCategory) {
        setSelectedSubCategory({
          value: foundSubCategory.name,
          label: foundSubCategory.name,
          subCategory: foundSubCategory.subCategory || null,
        });
      }
    }
  }, [categoryOne, selectedCategory]);

  useEffect(() => {
    if (categoryTwo && selectedSubCategory && selectedSubCategory.subCategory) {
      const foundSubSubCategory = selectedSubCategory.subCategory.find(
        (subSubCat) => subSubCat.name === categoryTwo
      );
      if (foundSubSubCategory) {
        setSelectedSubSubCategory({
          value: foundSubSubCategory.name,
          label: foundSubSubCategory.name,
          subCategory: foundSubSubCategory.subCategory || null,
        });
      }
    }
  }, [categoryTwo, selectedSubCategory]);

  useEffect(() => {
    if (
      categoryThree &&
      selectedSubSubCategory &&
      Array.isArray(selectedSubSubCategory.subCategory)
    ) {
      const foundSubSubSubCategory = selectedSubSubCategory.subCategory.find(
        (subSubSubCat) => subSubSubCat.name === categoryThree
      );
      if (foundSubSubSubCategory) {
        setSelectedSubSubSubCategory({
          value: foundSubSubSubCategory.name,
          label: foundSubSubSubCategory.name,
        });
      }
    }
  }, [categoryThree, selectedSubSubCategory]);

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
    setCategory(selectedOption.value);
    setSelectedSubCategory(null);
    setSelectedSubSubCategory(null);
    setSelectedSubSubSubCategory(null);
  };

  const handleSubCategoryChange = (selectedOption) => {
    setSelectedSubCategory(selectedOption);
    setCategoryOne(selectedOption.value);
    setSelectedSubSubCategory(null);
    setSelectedSubSubSubCategory(null);
  };

  const handleSubSubCategoryChange = (selectedOption) => {
    setSelectedSubSubCategory(selectedOption);
    setCategoryTwo(selectedOption.value);
    setSelectedSubSubSubCategory(null);
  };

  const handleSubSubSubCategoryChange = (selectedOption) => {
    setSelectedSubSubSubCategory(selectedOption);
    setCategoryThree(selectedOption.value);
  };

  const renderSubCategories = () => {
    if (selectedCategory && selectedCategory.subCategory) {
      return (
        <Select
          required
          className="mt-3"
          value={selectedSubCategory}
          onChange={handleSubCategoryChange}
          options={selectedCategory.subCategory.map((subCategory) => ({
            value: subCategory.name,
            label: subCategory.name,
            subCategory: subCategory.subCategory || null,
          }))}
        />
      );
    }
    return null;
  };

  const renderSubSubCategories = () => {
    if (selectedSubCategory && selectedSubCategory.subCategory) {
      return (
        <Select
          className="mt-3"
          required
          value={selectedSubSubCategory}
          onChange={handleSubSubCategoryChange}
          options={selectedSubCategory.subCategory.map((subSubCategory) => ({
            value: subSubCategory.name,
            label: subSubCategory.name,
            subCategory: subSubCategory.subCategory || null,
          }))}
        />
      );
    }
    return null;
  };

  const renderSubSubSubCategories = () => {
    if (
      selectedSubSubCategory &&
      Array.isArray(selectedSubSubCategory.subCategory) &&
      selectedSubSubCategory.subCategory.length > 0
    ) {
      return (
        <Select
          className="mt-3"
          required
          value={selectedSubSubSubCategory}
          onChange={handleSubSubSubCategoryChange}
          options={selectedSubSubCategory.subCategory.map(
            (subSubSubCategory) => ({
              value: subSubSubCategory.name,
              label: subSubSubCategory.name,
            })
          )}
        />
      );
    }
    return null;
  };

  return (
    <>
      {loading || userLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <div>
          <h5>
            Please enter your name and pick the Sectors you are currently
            involved in.
          </h5>
          {message && <h5>{message}</h5>}

          <form onSubmit={(e) => handleUserSave(e)}>
            <input
              required
              defaultValue={username}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control mb-3"
              placeholder="Name"
            />
            <Select
              required
              value={selectedCategory}
              onChange={handleCategoryChange}
              options={categories.map((category) => ({
                value: category.name,
                label: category.name,
                subCategory: category.subCategory || null,
              }))}
            />
            {renderSubCategories()}
            {renderSubSubCategories()}
            {renderSubSubSubCategories()}
            <div className="mt-3">
              <button type="submit" className="btn btn-primary">
                Save
              </button>
              <Link to="/">
                <button className="btn btn-danger mx-2">Cancel</button>
              </Link>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default EditUserData;
