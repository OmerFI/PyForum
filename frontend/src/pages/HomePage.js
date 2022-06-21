import { useEffect, useState } from "react";
import { useAnonimAxios } from "../utils/useAxios";
import Category from "../components/Category";
import SkeletonCategory from "../components/skeletons/SkeletonCategory";

const HomePage = () => {
  let anonimApi = useAnonimAxios();
  let [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    anonimApi.get("/api/category/").then((res) => {
      setCategoryData(res.data);
    });
  }, []);

  return (
    <main>
      <div className="categories">
        <div className="container">
          {categoryData &&
            categoryData.map((category) => (
              <Category categoryData={category} key={category.id} />
            ))}
          {!categoryData &&
            [...Array(5)].map((_, index) => <SkeletonCategory key={index} />)}
        </div>
      </div>
    </main>
  );
};

export default HomePage;
