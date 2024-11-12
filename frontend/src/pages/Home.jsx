import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import Pagination from "../components/pagination";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../helpers/axios";

export default function Home() {
  const [recipes, setRecipes] = useState([]);

  let [links, setLinks] = useState(null);
  let location = useLocation();
  let searchQuery = new URLSearchParams(location.search);
  let page = searchQuery.get("page");
  let navigate = useNavigate();
  page = parseInt(page) ? parseInt(page) : 1;

  useEffect(() => {
    let fetchRecipe = async () => {
      let response = await axios("/api/recipes?page=" + page);
      if (response.status === 200) {
        let data = response.data;
        setLinks(data.links);
        setRecipes(data.data);

        window.scroll({ top: 0, left: 0, behavior: "smooth" });
      }
    };

    fetchRecipe();
  }, [page]);

  let onDeleted = (_id) => {
    if (recipes.length === 1 && page > 1) {
      navigate("/?page" + (page - 1));
    } else {
      setRecipes((prev) => prev.filter((r) => r._id !== _id));
    }
  };

  return (
    <>
      <div className="grid grid-cols-3 space-x-2 space-y-3">
        {!!recipes.length &&
          recipes.map((recipe) => {
            return (
              <RecipeCard
                recipe={recipe}
                key={recipe._id}
                onDeleted={onDeleted}
              />
            );
          })}
      </div>
      {!!links && <Pagination links={links} page={page || 1} />}
    </>
  );
}
