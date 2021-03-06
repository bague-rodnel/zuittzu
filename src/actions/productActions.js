import axios from "axios";

import {
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ADMIN_PRODUCTS_FAIL,
  ADMIN_PRODUCTS_REQUEST,
  ADMIN_PRODUCTS_SUCCESS,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  ARCHIVE_PRODUCT_REQUEST,
  ARCHIVE_PRODUCT_SUCCESS,
  ARCHIVE_PRODUCT_FAIL,
  UNARCHIVE_PRODUCT_REQUEST,
  UNARCHIVE_PRODUCT_SUCCESS,
  UNARCHIVE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  ADMIN_VARIANTS_REQUEST,
  ADMIN_VARIANTS_SUCCESS,
  ADMIN_VARIANTS_FAIL,
  GET_VARIANTS_REQUEST,
  GET_VARIANTS_SUCCESS,
  GET_VARIANTS_FAIL,
  NEW_VARIANT_REQUEST,
  NEW_VARIANT_SUCCESS,
  NEW_VARIANT_RESET,
  NEW_VARIANT_FAIL,
  VARIANT_DETAILS_REQUEST,
  VARIANT_DETAILS_SUCCESS,
  VARIANT_DETAILS_FAIL,
  UPDATE_VARIANT_REQUEST,
  UPDATE_VARIANT_SUCCESS,
  UPDATE_VARIANT_RESET,
  UPDATE_VARIANT_FAIL,
  DELETE_VARIANT_REQUEST,
  DELETE_VARIANT_SUCCESS,
  DELETE_VARIANT_RESET,
  DELETE_VARIANT_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstants";

import store from "../store";

export const getProducts =
  (keyword = "", currentPage = 1, price, category, rating = 0, filter) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCTS_REQUEST });

      let link = `${
        process.env.REACT_APP_API_HOST
      }/api/products?keyword=${keyword.toLowerCase()}&page=${currentPage}&price[lte]=${
        price[1]
      }&price[gte]=${price[0]}&ratings[gte]=${rating}&filters=${filter}`;

      if (category) {
        link = link.concat(`&category=${category}`);
      }

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_PRODUCTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCTS_FAIL,
        // ,      payload: error.response.data.message
      });
    }
  };

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_HOST}/api/products/${id}`
    );

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    alert(error.toJSON());
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });

    const token = await store.getState().auth.token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        API_KEY: `${process.env.REACT_APP_API_KEY}`,
      },
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_API_HOST}/api/products`,
      productData,
      config
    );

    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const token = await store.getState().auth.token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        API_KEY: `${process.env.REACT_APP_API_KEY}`,
      },
    };

    const { data } = await axios.put(
      `${process.env.REACT_APP_API_HOST}/api/products/${id}`,
      productData,
      config
    );

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const archiveProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: ARCHIVE_PRODUCT_REQUEST });

    const token = await store.getState().auth.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        API_KEY: `${process.env.REACT_APP_API_KEY}`,
      },
    };

    const { data } = await axios.put(
      `${process.env.REACT_APP_API_HOST}/api/products/${id}/archive`,
      {},
      config
    );

    dispatch({
      type: ARCHIVE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: ARCHIVE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const unarchiveProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: UNARCHIVE_PRODUCT_REQUEST });

    const token = await store.getState().auth.token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        API_KEY: `${process.env.REACT_APP_API_KEY}`,
      },
    };

    const { data } = await axios.put(
      `${process.env.REACT_APP_API_HOST}/api/products/${id}/unarchive`,
      {},
      config
    );

    dispatch({
      type: UNARCHIVE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UNARCHIVE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const token = await store.getState().auth.token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        API_KEY: `${process.env.REACT_APP_API_KEY}`,
      },
    };

    const { data } = await axios.delete(
      `${process.env.REACT_APP_API_HOST}/api/products/${id}`,
      config
    );

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const token = await store.getState().auth.token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        API_KEY: `${process.env.REACT_APP_API_KEY}`,
      },
    };

    const { data } = await axios.put(
      `${process.env.REACT_APP_API_HOST}/api/products/reviews`,
      reviewData,
      config
    );

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAdminProducts = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCTS_REQUEST });

    const token = await store.getState().auth.token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        API_KEY: `${process.env.REACT_APP_API_KEY}`,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_HOST}/api/products/admin`,
      config
    );

    dispatch({
      type: ADMIN_PRODUCTS_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getProductReviews = (productId) => async (dispatch) => {
  try {
    dispatch({ type: GET_REVIEWS_REQUEST });

    const token = await store.getState().auth.token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        API_KEY: `${process.env.REACT_APP_API_KEY}`,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_HOST}/api/products/reviews?productId=${productId}`,
      config
    );

    dispatch({
      type: GET_REVIEWS_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: GET_REVIEWS_FAIL,
      // ,
      // payload: error.response.data.message
    });
  }
};

export const deleteReview = (id, productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const token = await store.getState().auth.token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        API_KEY: `${process.env.REACT_APP_API_KEY}`,
      },
    };

    const { data } = await axios.delete(
      `${process.env.REACT_APP_API_HOST}/api/products/reviews?id=${id}&productId=${productId}`,
      config
    );

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
