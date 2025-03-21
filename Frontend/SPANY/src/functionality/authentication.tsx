import Toast from "react-native-toast-message";
import { Authorization, baseURL, SPANYaxios } from "./APICall";
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';
import axios from "axios";


async function savetoken(navigation: any, accessToken: string, refreshToken: string, userDetails: any, fetchdata: any) {
    try {
        await RNSecureStorage.setItem('access_token', accessToken, { accessible: ACCESSIBLE.WHEN_UNLOCKED });
        await RNSecureStorage.setItem('refresh_token', refreshToken, { accessible: ACCESSIBLE.WHEN_UNLOCKED });
        await RNSecureStorage.setItem('userDetails', userDetails, { accessible: ACCESSIBLE.WHEN_UNLOCKED });
        console.log('Tokens saved successfully');
        Authorization(navigation, fetchdata)
    } catch (error) {
        console.error('Error saving tokens:', error);
        throw error;
    }
}

export async function userregistration(navigation: any, formData: any,fetchdata:Function) {    
    try {
        const response = await axios.post(`${baseURL}/registration/`,formData,{headers: {'Content-Type': 'multipart/form-data'}})
        if (response.status === 200 || response.status === 201) {
            const userData = response.data
            const accessToken = userData.access
            const refreshToken = userData.refresh
            const userDetails = JSON.stringify({ ...userData.user, ...userData.custom_user })
            savetoken(navigation, accessToken, refreshToken, userDetails, fetchdata)
            Toast.show({type: 'success',visibilityTime: 5000, text1: 'User Verified',text2: 'Welcome back, champ! 🏆 We missed you! 👋'});
            setTimeout(() => {navigation.navigate('Tab');}, 1500);
        } else {
            Toast.show({type: 'error',visibilityTime: 5000, text1: 'User Already Exists',text2: 'This Mail id is alredy registered 👋'});            
        }
    }
    catch (err) {
        Toast.show({type: 'error',visibilityTime: 5000, text1: 'User Already Exists',text2: 'This email is already registered 😞. Please use a different one.'});            
    }

}

export async function userfetchdata(navigation: any, params: any) {
    try {
        const response = await SPANYaxios.get(`/customerfetch/${params}`, params)
        if (response.status === 200 || response.status === 201) {
            Toast.show({type: 'success', visibilityTime: 5000, text1: 'User Verified', text2: 'Welcome back, champ! 🏆👋'});
            setTimeout(() => {navigation.navigate('Password', response.data[0]);},1500);
        } else {
            Toast.show({type: 'error', visibilityTime: 5000, text1: 'Invalid User', text2: 'This Mail id is not registered 👋'});
        }
    }
    catch (error) {
        Toast.show({type: 'error', visibilityTime: 5000, text1: 'Invalid User', text2: 'This Mail id is not registered 👋'});
    }
}


export async function userlogin(navigation: any, params: any,userData:any,fetchdata: any) {
    try {
        const response = await SPANYaxios.post(`/login/`, params)
        if (response.status === 200 || response.status === 201) {
            const userData = response.data
            const accessToken = userData.access
            const refreshToken = userData.refresh
            const userDetails = JSON.stringify({ ...userData.user, ...userData.custom_user })
            savetoken(navigation, accessToken, refreshToken, userDetails, fetchdata)
            Toast.show({type: 'success', visibilityTime: 5000, text1: 'Login Successful', text2: 'Welcome back, you’re all set! 👋'});
        } else {
            Toast.show({type: 'error', visibilityTime: 5000, text1: 'Login Failed', text2: 'Invalid credentials, please try again. 😞'});
        }
    }
    catch (error) {
        Toast.show({type: 'error', visibilityTime: 5000, text1: 'Login Failed', text2: 'Invalid credentials, please try again. 😞'});
        setTimeout(() => {navigation.navigate('PasswordRecovery',userData)},1500);
    }
}

export async function PasswordRecovery(navigation:any,userData:any,data:any) {
    try {
        const response = await SPANYaxios.post(`/otp-verification/`,data)
        if (response.status === 200 || response.status === 201) {
            console.log(userData);
            Toast.show({type: 'success', visibilityTime: 5000, text1: 'OTP Sent Successfully!', text2: 'You’re just one step away from resetting your password. 💪🔐'});
            setTimeout(() => {navigation.navigate('PasswordRecoveryCode', {...response.data,userData,data});},1500);
        } else {
            Toast.show({type: 'warning', visibilityTime: 5000, text1: 'Oops! Something went wrong', text2: 'Please try again or contact support if the issue persists. 😕'});
        }
    }
    catch (error) {
        Toast.show({type: 'warning', visibilityTime: 5000, text1: 'Oops! Something went wrong', text2: 'Please try again or contact support if the issue persists. 😕'});
    }
}

export async function SetupPassword(navigation:any,data:any) {
    try {
        const response = await SPANYaxios.patch(`/forgetpassword/`,data)
        if (response.status === 200 || response.status === 201) {
            Toast.show({type: 'success',visibilityTime: 5000,text1: 'Password Updated Successfully!',text2: 'Your password has been updated. You can now log in with your new password. 💪🔐'});
            setTimeout(() => {navigation.navigate('Login');},1500);
        } else {
            Toast.show({type: 'error',visibilityTime: 5000,text1: 'Error Updating Password',text2: 'Something went wrong. Please try again later. ⚠️',});
        }
    }
    catch (error) {
        Toast.show({type: 'error',visibilityTime: 5000,text1: 'Error Updating Password',text2: 'Something went wrong. Please try again later. ⚠️',});
    }
}

export async function logout(navigation: any) {
    try {
        await RNSecureStorage.removeItem('access_token');
        await RNSecureStorage.removeItem('refresh_token');
        await RNSecureStorage.removeItem('userDetails');
        console.log('Tokens removed successfully');
                navigation.navigate('Login');  // Example: Navigate to the Login screen
    } catch (error) {
        console.error('Error removing tokens:', error);
        throw error;
    }
}
