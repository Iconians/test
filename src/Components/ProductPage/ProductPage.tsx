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
    const getQty = carvingArray.find(
      (carvingPiece) => carvingPiece.id === findId?.qty
    );
    if (getQty !== undefined && cartQty === undefined) {
      setCarvingQty(getQty.qty);
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
    inStock();
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
        toast.error(
          "there was an error while trying to favorite the product please try again or contact us for further assistance"
        );
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
          toast.error(
            "there was an error while trying to unfavorite the product please try again or contact us for further assistance"
          );
        }
      });
    }
  };

  const addItemToCart = (id: string) => {
    const findItem = carvingArray.find(
      (carving) => carving.id === parseInt(id)
    );
    setCarvingQty(0);
    if (findItem !== undefined) addPurchaseItems(findItem);
  };

  useEffect(() => {
    const userId = getUserId();
    fetchFavorites(userId).then((data) => {
      findFavorites(data);
    });
  }, [favoriteArray.length, cartItems.length]);

  return (
    <div className="product-page-wrapper" id="productPage">
      <NavBar />
      <div className="page-content-wrapper">
        {carvingArray.map((carving) =>
          carving.id === location.state.productId ? (
            <>
              <div className="h2-wrapper" key={carving.id}>
                <h2>{carving.carvingName}</h2>
              </div>
              <div className="product-img-wrapper">
                <img src={carving.image} alt="" />
                {favoriteArray.length ? (
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="heart-icon"
                    onClick={() => {
                      deleteAFavorites(carving.id);
                    }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faHeartBroken}
                    className="heart-icon"
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
                {carving.price ? (
                  <button
                    id={`${carving.id}`}
                    onClick={() => {
                      addItemToCart(`${carving.id}`);
                    }}
                    disabled={carvingQty === 0}
                  >{`Add to Cart $${carving.price.toFixed(2)}`}</button>
                ) : null}
              </div>
            </>
          ) : null
        )}
      </div>
    </div>
  );
};
