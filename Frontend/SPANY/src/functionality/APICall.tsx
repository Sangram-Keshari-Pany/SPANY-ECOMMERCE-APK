export const useData = () => useContext(DataContext);
import React from 'react'
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import RNSecureStorage from 'rn-secure-storage';
import { domycategories, domyproducts, domysubCategories, flashSales } from "../assets/domyvalue/domyvalue";


// export const  baseURL = 'https://spany-djapp.onrender.com/'
export const baseURL = 'http://192.168.92.47:8000/'

export const SPANYaxios = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    }
})



export async function Authorization(navigation: any, fetchdata: Function) {
    async function getAccessToken() {
        try {
            const accessToken = await RNSecureStorage.getItem('access_token');
            return accessToken;
        } catch (error) {
            console.error('Error getting access token:', error);
        }
    }
    
    const AccessToken = await getAccessToken();
    if (AccessToken) {
        SPANYaxios.defaults.headers['Authorization'] = `Bearer ${AccessToken}`;
        navigation.navigate("HelloCardScreen");
        await fetchdata();
    }
}
const defaultData = {
    userDetails: {},
    categories: domycategories,
    subcategories: domysubCategories,
    products: domyproducts,
    flashshales: [],
    favorites: [],
    reviews: [],
    cartitems: [],
    deliveritems: [],
    shippingaddress: [],
    vouchers: [],
    loading: true,
    savedcards: [],
    shippingupdate: [],
    error: null,
    fetchdata: () => { }
};

const DataContext = createContext(defaultData);

const APICall = ({ children}: any) => {
    const [userDetails, setUserDetails] = useState({})
    const [categories, setCategories] = useState(domycategories);
    const [subcategories, setSubcategories] = useState(domysubCategories);
    const [products, setProducts] = useState(domyproducts);
    const [flashshales, setFlashshales] = useState([]);
    const [favorites, setFavorites] = useState([])
    const [cartitems, setCartitems] = useState([])
    const [reviews, setReviews] = useState([])
    const [deliveritems, setDeliveritems] = useState([])
    const [shippingaddress, setShippingAddress] = useState([])
    const [vouchers, setVouchers] = useState([])
    const [savedcards, setSavedcards] = useState([])
    const [shippingupdate, setShippingupdate] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const handleTokenExpiration = async(error:any, navigation:any) => {
        if (error.response && error.response.status === 401) {
            delete SPANYaxios.defaults.headers['Authorization'];
            await RNSecureStorage.removeItem('access_token');
            await RNSecureStorage.removeItem('refresh_token');
            await RNSecureStorage.removeItem('userDetails');  
            navigation.navigate("Login");
        }
        return Promise.reject(error);
    };
    
    SPANYaxios.interceptors.response.use(
        (response) => response,
        (error) => handleTokenExpiration(error, error.config.navigation)
    );
    

    async function ApiCall(path: string, setFunction: Function) {
        try {
            const response = await SPANYaxios.get(path);
            setFunction(response.data);
        } catch (err: any) {
            setError(err.message);
        }
    }

    async function fetchdata(execution = "all") {
        if (execution === "all") {
            async function userDetails() {
                const response = await RNSecureStorage.getItem('userDetails')
                return (response)
            };
            const user_Details: any = await userDetails()
            setUserDetails(JSON.parse(user_Details))
        }

        if (execution === "all" || execution === "category") await ApiCall('/category', setCategories);
        if (execution === "all" || execution === "sub_category") await ApiCall('/sub_category', setSubcategories);
        if (execution === "all" || execution === "product") await ApiCall('/product', setProducts);
        if (execution === "all" || execution === "flashshales") await ApiCall('/flashshale', setFlashshales);
        if (execution === "all" || execution === "favorites") await ApiCall('/favorites', setFavorites);
        if (execution === "all" || execution === "review") await ApiCall('/review', setReviews);
        if (execution === "all" || execution === "cartitems") await ApiCall('/cartitems', setCartitems);
        if (execution === "all" || execution === "deliveritems") await ApiCall('/deliveritems', setDeliveritems);
        if (execution === "all" || execution === "shippingaddress") await ApiCall('/shippingadress', setShippingAddress);
        if (execution === "all" || execution === "shippingupdate") await ApiCall('/shippingupdateView', setShippingupdate);
        if (execution === "all" || execution === "payment_cards") await ApiCall('/payment_cards', setSavedcards);
        if (execution === "all" || execution === "vouchers") await ApiCall('/vouchers', setVouchers);
        setLoading(false);
    }
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const AccessToken = await RNSecureStorage.getItem('access_token');
                if (AccessToken) {
                    SPANYaxios.defaults.headers['Authorization'] = `Bearer ${AccessToken}`;
                    fetchdata()
                }
            } catch (error) {
                console.log('Error fetching token:', error);
            }
            finally {

            }
        };

        checkAuthStatus();
    }, []);
    return (
        <DataContext.Provider value={{ userDetails, categories, subcategories, products, flashshales, favorites, reviews, cartitems, deliveritems, shippingaddress, vouchers, savedcards, shippingupdate, loading, error, fetchdata }}>
            {children}
        </DataContext.Provider>
    )
}

export default APICall


export function demo() {
    console.log("demo");

}


