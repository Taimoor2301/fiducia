import axios from "axios";
import { baseURL } from "src/Constants/Constants";
import { useAuth } from "./useAuth";
import { useRouter } from "next/router";


export default function useAPI(){

  const {logout} = useAuth()
  const route = useRouter()

  const instance = axios.create({
    baseURL:baseURL,
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      tenant: 'root'
    }
  });

  instance.interceptors.request.use(config => {
      const token = localStorage.getItem('accessToken')
      if(token){
        config.headers.Authorization = `Bearer ${token}`
      };

      return config
  } , error => Promise.reject(error));

  instance.interceptors.response.use(res => res , async error => {
    if(error.response){

      if(error.response.status === 401 ){
        const originalRequest = error.config;

        const oldRefreshToken = localStorage.getItem('refreshToken')
        const oldAccessToken = localStorage.getItem('accessToken')

        if(!oldRefreshToken || !oldAccessToken) {
              logout()

              return Promise.reject(error)
        }

        try {
          const res = await axios.post(baseURL+'/tokens/token.getrefreshtokenasync' , {refreshToken:oldRefreshToken , token:oldAccessToken},{
            headers: {
              'Content-Type': 'application/json',
              accept: 'application/json',
              tenant: 'root'
            }
          })
          const {token , refreshToken} = res.data.data;
          localStorage.setItem('accessToken' , token)
          localStorage.setItem('refreshToken',refreshToken)
          originalRequest.headers.Authorization = `Bearer ${token}`

          return instance.request(originalRequest)

        } catch (error) {
          console.log(error)
          logout()

          return Promise.reject(error)
        }


      } else{
        return Promise.reject(error)
      }

    }else{
      return Promise.reject(error)
    }
  })

  return instance
}

