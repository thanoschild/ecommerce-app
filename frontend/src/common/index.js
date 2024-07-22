const domain = "http://localhost:8000";

const summaryApi = {
    signUp: {
        url: `${domain}/api/users/register`,
        method: "post"
    },
    signIn: {
        url: `${domain}/api/users/login`,
        method: "post"
    },
    currentUser: {
        url: `${domain}/api/users/user-details`,
        method: "get"
    },
    logoutUser: {
        url: `${domain}/api/users/logout`,
        method: "get"
    },
    allUser: {
        url: `${domain}/api/users/all-users`,
        method: "get"
    },
    updateUser: {
        url: `${domain}/api/users/update-user`,
        method: "post"
    },
    uploadProduct: {
        url: `${domain}/api/products/upload-product`,
        method: "post"
    },
    allProduct: {
        url: `${domain}/api/products/all-products`,
        method: "get"
    },
    updateProduct: {
        url: `${domain}/api/products/update-product`,
        method: "post"
    },
    categoryProduct: {
        url: `${domain}/api/products/catagory-products`,
        method: "get"
    },
    singleCategoryProduct: {
        url: `${domain}/api/products/catagory-product`,
        method: "post"
    },
    productDetails: {
        url: `${domain}/api/products/product-details`,
        method: "post"
    },
    addToCart: {
        url: `${domain}/api/cart/add-product`,
        method: "post"
    },
    cartNumber: {
        url: `${domain}/api/cart/cart-number`,
        method: "get"
    },
    cartProduct: {
        url: `${domain}/api/cart/cart-product`,
        method: "get"
    },
    updateCartProduct: {
        url: `${domain}/api/cart/update-cart`,
        method: "post"
    },
    deleteCartProduct: {
        url: `${domain}/api/cart/delete-cart`,
        method: "post"
    },
    searchProduct: {
        url: `${domain}/api/products/search`,
        method: "get"
    },
    filterProduct: {
        url: `${domain}/api/products/filter-product`,
        method: "post"
    }
}

export default summaryApi;
// filter-product