import { useEffect, useState } from "react";
import plus from "../assets/plus.svg";
import Ingredients from "../components/Ingredients";
import axios from "../helpers/axios";
import { useNavigate, useParams } from "react-router-dom";

export default function RecipeForm() {
  let { id } = useParams();
  let navigate = useNavigate();
  let [ingredients, setIngredients] = useState([]);
  let [newIngredient, setNewIngredient] = useState("");
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [errors, setErrors] = useState([]);
  let [file, setFile] = useState(null);
  let [preview, setPreview] = useState(null);

  useEffect(() => {
    let fetchRecipe = async () => {
      if (id) {
        let res = await axios.get("/api/recipes/" + id);
        if (res.status === 200) {
          setPreview(import.meta.env.VITE_BACKEND_URL + res.data.photo);
          setTitle(res.data.title);
          setDescription(res.data.description);
          setIngredients(res.data.ingredients);
        }
      }
    };
    fetchRecipe();
  }, [id]);

  let addIngredient = () => {
    setIngredients((prev) => [newIngredient, ...prev]);

    setNewIngredient("");
  };

  let submit = async (e) => {
    try {
      e.preventDefault();
      console.log("create");

      let recipe = {
        title,
        description,
        ingredients,
      };
      let response;
      if (id) {
        response = await axios.patch("/api/recipes/" + id, recipe);
      } else {
        response = await axios.post("/api/recipes", recipe);
      }
      let formData = new FormData();
      formData.set("photo", file);

      let uploadRes = await axios.post(
        `/api/recipes/${response.data._id}/upload`,
        formData,
        {
          headers: {
            Accept: "multipart/form-data",
          },
        }
      );
      console.log(uploadRes);
      if (response.status === 200) {
        navigate("/");
      }
    } catch (e) {
      setErrors(Object.keys(e.response.data.errors));
    }
  };

  let upload = (e) => {
    let file = e.target.files[0];
    setFile(file);

    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      setPreview(e.target.result);
    };
    fileReader.readAsDataURL(file);
  };
  return (
    <div className="mx-auto max-w-md border-2 border-white p-4">
      <h1 className="text-2xl font-bold text-blue-500 text center mb-6">
        Recipe {id ? "Edit" : "Create"} Form
      </h1>

      <form action="" className="space-y-5" onSubmit={submit}>
        <ul className="list-disc pl-4">
          {!!errors.length &&
            errors.map((error, i) => (
              <li className="text-red-500 text-sm" key={i}>
                {error} is invalid value
              </li>
            ))}
        </ul>

        <input type="file" onChange={upload} />
        {preview && (
          <img className="mx-auto h-44 object-contain" src={preview} />
        )}
        <input
          type="text"
          placeholder="Recipe Title"
          className="w-full p-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Recipe Description"
          rows="5"
          className="w-full p-1"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <div className="flex space-x-2 items-center">
          <input
            type="text"
            value={newIngredient}
            onChange={(e) => setNewIngredient(e.target.value)}
            placeholder="ingredients"
            className="w-full p-1"
          />
          <img
            src={plus}
            onClick={addIngredient}
            alt=""
            className="cursor-pointer w-8 h-8"
          />
        </div>
        <div>
          <Ingredients ingredients={ingredients} />
        </div>
        <button
          type="submit"
          className="w-full px-3 py-1 rounded-full bg-blue-400"
        >
          {id ? "Update" : "Create"} Recipe
        </button>
      </form>
    </div>
  );
}
