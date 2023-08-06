import axios from 'axios';


const BaseUrl=`https://blog-backend-c06h.onrender.com/post`;
//Request interceptors for API calls
// axios.interceptors.request.use(
//   config => {
//     if(localStorage.getItem('userData'))
//     config.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('userData')).token}`;
//         return config;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );

const token=()=>{
  
  if(localStorage.getItem('userData'))
  return JSON.parse(localStorage.getItem('userData')).token

 
}


  export const savePost =(post)=>{
        return axios.post(BaseUrl,post);
    }

  export const getPosts =()=>{
        return axios.get(BaseUrl);
    }

  export const deletePost =(id)=>{
      return axios.delete(BaseUrl+"/"+id);
  }

  export const updatePost =(post)=>{
    return axios.put(BaseUrl,post);
}

export const updatePostLike =(id)=>{
  return axios.patch(BaseUrl+"/"+id);
}

  export const getPostId =(id)=>{
        return axios.get(BaseUrl+"/"+id);
    }
  
  
  export const getPostBytitle =(name)=>{
        
        return axios.get(BaseUrl+name);
    }
  export const getBookByAuthor =(author)=>{
        
        return axios.get(BaseUrl+author);
    }


    
   
