import { faHeart, faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { addFavorite } from "../../fetches/addFavorite";
import { fetchFavorites } from "../../fetches/fetchFavorites";
import { Favorite } from "../../interfaces";
import { useCarvingContext } from "../../providers/carvings.provider";
import { useFavoriteContext } from "../../providers/favorites.provider";
import { NavBar } from "../NavBar/NavBar";
import { deleteFavorites } from "../../fetches/deleteFavorite";
import "./ProductPage.css";

export const ProductPage = () => {
  const location = useLocation();
  const { carvingArray, addPurchaseItems, cartItems } = useCarvingContext();
  const [favoriteArray, setFavoriteArray] = useState<Favorite[]>([]);
  const [carvingQty, setCarvingQty] = useState(0);
  const { getUserId } = useFavoriteContext();

  const checkIfInCart = () => {
    const itemQty = cartItems.find(
      (item) => item.id === location.state.productId
    );
    return itemQty;
  };

  const inStock = () => {
    const findId = carvingArray.find(
      (id) => id.id === location.state.productId
    );
    const cartQty = checkIfInCart();
    if (findId !== undefined && cartQty === undefined) {
      setCarvingQty(findId.qty);
    }
  };

  const findFavorites = (favsArray: Favorite[]) => {
    const userId = getUserId();
    const favs = favsArray.filter((favorite) => favorite.userId === userId);
    const carving = favs.filter(
      (carving) => carving.carvingId === location.state.productId
    );
    if (carving.length) {
      setFavoriteArray(carving);
    }
  };

  const addFavorites = (id: number) => {
    const userId = getUserId();
    addFavorite(userId, id).then((res) => {
      if (res.ok) {
        setFavoriteArray([
          ...favoriteArray,
          { userId: userId, carvingId: id, id: 0 },
        ]);
      } else {
        res.json().then((data) => {
          toast.error(data.message);
        });
      }
    });
  };

  const deleteAFavorites = (id: number) => {
    const userId = getUserId();
    const getFavorite = favoriteArray.find(
      (favorite) => favorite.carvingId === id
    );
    if (getFavorite !== undefined) {
      deleteFavorites(getFavorite, userId).then((res) => {
        if (res.ok) {
          setFavoriteArray(
            favoriteArray.filter((carving) => carving.carvingId !== id)
          );
        } else {
          res.json().then((data) => {
            toast.error(data.message);
          });
        }
      });
    }
  };

  const addItemToCart = (id: string) => {
    const findItem = carvingArray.find(
      (carving) => carving.id === parseInt(id)
    );

    if (findItem !== undefined && findItem.qty > 0) {
      addPurchaseItems(findItem);
    }
  };

  useEffect(() => {
    const userId = getUserId();
    if (userId !== undefined) {
      fetchFavorites(userId).then((data) => {
        findFavorites(data);
      });
    }
  }, [favoriteArray.length, cartItems.length]);

  useEffect(() => {
    inStock();
  }, [carvingArray.length]);

  return (
    <div className="product-page-wrapper" id="productPage">
      <NavBar />
      <div className="page-content-wrapper">
        {carvingArray.map((carving) =>
          carving.id === location.state.productId ? (
            <div className="parent-div" key={carving.id}>
              <div className="h2-wrapper">
                <h2>{carving.carvingName}</h2>
              </div>
              <div className="product-img-wrapper">
                <img src={carving.image} alt="" />
                {favoriteArray.length ? (
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="heart-icon whole"
                    onClick={() => {
                      deleteAFavorites(carving.id);
                    }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faHeartBroken}
                    className="heart-icon broken"
                    onClick={() => {
                      addFavorites(carving.id);
                    }}
                  />
                )}
              </div>
              <div className="story-div">
                <p>{carving.story}</p>
              </div>
              <div className="buttons-container">
                {carving.price && carving.qty > 0 ? (
                  <button
                    id={`${carving.id}`}
                    onClick={() => {
                      addItemToCart(`${carving.id}`);
                    }}
                    disabled={carvingQty === 0}
                  >{`Add to Cart $${
                    carving.qty ? carving.price.toFixed(2) : ""
                  }`}</button>
                ) : null}
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};
