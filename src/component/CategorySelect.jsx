import { useEffect, useState } from "react";
import Select from "react-select";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import useUserSave from "../hooks/useUserSave";
import url from "../url/url";
import { Link } from "react-router-dom";

const CategorySelect = () => {
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
    select,
    setSelect,
    userLoading,
    message,
    handleUserSave,
    success,
  } = useUserSave();

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
    if (success) {
      setSelectedCategory(null);
      setSelectedSubCategory(null);
      setSelectedSubSubCategory(null);
      setSelectedSubSubSubCategory(null);
    }
  }, [success]);

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
          options={selectedCategory?.subCategory.map((subCategory) => ({
            value: subCategory?.name,
            label: subCategory?.name,
            subCategory: subCategory?.subCategory || null,
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
          options={selectedSubCategory.subCategory.map((subCategory) => ({
            value: subCategory.name,
            label: subCategory.name,
            subCategory: subCategory.subCategory || null,
          }))}
        />
      );
    }
    return null;
  };

  const renderSubSubSubCategories = () => {
    if (selectedSubSubCategory && selectedSubSubCategory.subCategory) {
      return (
        <Select
          className="mt-3"
          required
          value={selectedSubSubSubCategory}
          onChange={handleSubSubSubCategoryChange}
          options={selectedSubSubCategory.subCategory.map((subCategory) => ({
            value: subCategory.name,
            label: subCategory.name,
          }))}
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
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control mt-3"
              placeholder="Name"
            />
            <Select
              required
              value={selectedCategory}
              onChange={handleCategoryChange}
              options={categories?.map((category) => ({
                value: category?.name,
                label: category?.name,
                subCategory: category?.subCategory || null,
              }))}
              className="mt-3"
            />
            {renderSubCategories()}
            {renderSubSubCategories()}
            {renderSubSubSubCategories()}
            <div className="form-check mt-3">
              <input
                required
                className="form-check-input"
                type="checkbox"
                onClick={() => setSelect(!select)}
              />
              <label className="form-check-label">Agree to terms</label>
            </div>
            <button type="submit" className="btn btn-success mt-3">
              Save
            </button>
          </form>
          <Link to={"/edit"} className="btn btn-primary mt-3">
            Edit user
          </Link>
        </div>
      )}
    </>
  );
};

export default CategorySelect;
