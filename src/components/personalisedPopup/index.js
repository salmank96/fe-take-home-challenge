import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";

function PersonalizedPopup({ isPopup, setIsPopup, setQuery, setSourceQuery }) {
  const [formData, setFormData] = useState({
    source: [],
    categories: "",
  });
  const categories = [
    { name: "Science", link: "science" },
    { name: "Business", link: "business" },
    { name: "Sports", link: "sports" },
    { name: "Technology", link: "technology" },
    { name: "Entertainment", link: "entertainment" },
  ];
  const sourcesData = [
    { name: "BBC News", link: "bbc-news" },
    { name: "CNN", link: "cnn" },
    { name: "Al Jazeera", link: "al-jazeera-english" },
    { name: "The Washington Post", link: "the-washington-post" },
    { name: "Reuters", link: "reuters" },
  ];
  const handleSource = (item) => {
    setFormData((prevFormData) => {
      const isSelected = prevFormData.source.find(
        (source) => source.link === item.link
      );
      let updatedSources;

      if (isSelected) {
        // Remove item if already selected
        updatedSources = prevFormData.source.filter(
          (source) => source.link !== item.link
        );
      } else {
        // Add item if not selected
        updatedSources = [...prevFormData.source, item];
      }

      return {
        ...prevFormData,
        source: updatedSources,
      };
    });
  };
  const handleCategory = (item) => {
    setFormData({ ...formData, categories: item.name });
  };

  const handleSave = () => {
    if (formData.source.length == 0 && formData?.categories.length == 0) {
      return;
    }
    const sourceLinks = formData.source.map((source) => source.link);
    const categoryLinks = formData.categories;
    localStorage.setItem("sources", JSON.stringify(sourceLinks));
    localStorage.setItem("categories", JSON.stringify(categoryLinks));
    setQuery(categoryLinks);
    setSourceQuery(sourceLinks);
    setIsPopup(false);
  };
  return (
    <>
      <div
        role="alert"
        className="fixed left-0 right-0 top-0 bottom-0 z-50 bg-gray-800 bg-opacity-40 flex justify-center items-center"
      >
        <OutsideClickHandler onOutsideClick={() => setIsPopup(false)}>
          <div className=" w-96 bg-white dark:bg-gray-800 shadow px-3 md:px-6 pt-4 pb-6 rounded">
            <div className="pl-4">
              <p className="text-base md:text-lg font-bold md:leading-none text-gray-800 dark:text-gray-100">
                Customize your news feed by ctegory and sources
              </p>
            </div>

            <div className="mt-5">
              <div>
                <p>Select Different Sources</p>
                <div className="flex items-center gap-2 flex-wrap mt-2">
                  {sourcesData.map((item) => (
                    <div
                      key={item.link}
                      onClick={() => handleSource(item)}
                      className={`border border-gray-300 h-6 w-fit px-4 mb-4 md:mb-0 rounded-full flex items-center justify-center cursor-pointer ${
                        formData.source.some(
                          (source) => source.link === item.link
                        )
                          ? "bg-blue-500 text-white"
                          : "bg-white text-gray-800"
                      }`}
                    >
                      <span className="text-xs font-normal">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <p>Select Different Categories</p>
                <div className="flex items-center gap-2 flex-wrap mt-2">
                  {categories.map((item) => (
                    <div
                      key={item.link}
                      onClick={() => handleCategory(item)}
                      className={`border border-gray-300 h-6 w-fit px-4 mb-4 md:mb-0 rounded-full flex items-center justify-center cursor-pointer ${
                        formData.categories === item.name
                          ? "bg-blue-500 text-white"
                          : "bg-white text-gray-800"
                      }`}
                    >
                      <span className="text-xs font-normal">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex space-x-6 items-center justify-end w-full mt-5">
              <button
                className="w-1/2 focus:outline-none py-3 bg-indigo-100 hover:bg-indigo-200 rounded"
                onClick={() => setIsPopup(false)}
              >
                <p className="text-xs font-medium leading-3 text-indigo-700">
                  Cancle
                </p>
              </button>
              <button
                onClick={handleSave}
                className="w-1/2 focus:outline-none py-3 bg-indigo-700 hover:bg-opacity-80  dark:bg-indigo-600 rounded"
              >
                <p className="text-xs font-medium leading-3 text-gray-100">
                  Save
                </p>
              </button>
            </div>
          </div>
        </OutsideClickHandler>
      </div>
    </>
  );
}

export default PersonalizedPopup;
