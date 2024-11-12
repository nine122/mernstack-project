import Ingredients from "./Ingredients";
import axios from "../helpers/axios";
import { Link } from "react-router-dom";

export default function RecipeCard({ recipe, onDeleted }) {
  let deleteRecipe = async () => {
    let res = await axios.delete("/api/recipes/" + recipe._id);
    if (res.status === 200) {
      onDeleted(recipe._id);
    }
  };

  return (
    <div>
      <div className="bg-white p-5 rounded-2xl space-y-4">
        <img
          className="mx-auto h-64 object-contain"
          src={import.meta.env.VITE_BACKEND_URL + recipe.photo}
          alt=""
        />
        <div className="flex justify-between">
          <h2 className="text-xl font-bold text-blue-500">{recipe.title}</h2>
          <div className="space-x-3">
            <Link
              to={`/recipes/edit/${recipe._id}`}
              className="bg-yellow-300 px-2 py-1 rounded-lg text-sm"
            >
              Edit
            </Link>
            <button
              onClick={deleteRecipe}
              className="bg-red-500 px-2 py-1 rounded-lg text-white text-sm"
            >
              Delete
            </button>
          </div>
        </div>
        <p>Description</p>
        <p>{recipe.description}</p>
        <Ingredients ingredients={recipe.ingredients} />
        <p className="text-gray-400">published at {recipe.createdAt}</p>
      </div>
    </div>
  );
}
