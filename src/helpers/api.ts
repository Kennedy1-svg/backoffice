import axios from 'axios';
import { useStore } from 'vuex';

const store:any = useStore();

// api helper to fetch data from the backend
export const getData = async (url:any) => {
  try {
    // console.log('token here', token)
    console.log('url here', url)
    const response:any = await axios.get(`${url}`);
    console.log('response', response)
    return response.data
  } catch (err) {
    return err
  }
}

// api helper to fetch data from the backend
export const fetchData = async (url:any, token:any) => {
  try {
    // console.log('token here', token)
    console.log('url here', url)
    const response:any = await axios.get(`${url}`, { headers: { Authorization: `Bearer ${token}` } });
    console.log('response', response)
    return response.data
  } catch (err) {
    return err
  }
}

// api helper to fetch data by ID from the backend
export const fetchDataByParams = async (url: any, token:any) => {
  try {
    const response:any = await axios.get(`${url}`, { headers: { Authorization: `Bearer ${token}` } })
    // console.log('response', response.data)
    return response.data
  } catch (err) {
    return err
  }
}

// api helper to add data to the backend
export const addData = async (url: any, data: any = null, token:any) => {
  try {
    const response:any = await axios.post(url, data, { headers: { Authorization: `Bearer ${token}` } })
    console.log('response', response.data)
    // setTimeout(() => {
    //   store.dispatch()
    // })
    return response.data
  } catch (err) {
    console.log('err', err)
    return err
  }
}

export const addEmptyData = async (url: any, token:any) => {
  try {
    // console.log('token in add empty', token)
    const response:any = await axios.post(url, { headers: { Authorization: `Bearer ${token}` } })
    console.log('response', response)
    // setTimeout(() => {
    //   store.dispatch()
    // })
    return response.data
  } catch (err) {
    console.log('err', err)
    return err
  }
}

// const response = await axios.post(url, data, { headers: { 'Content-Type': 'multipart/form-data'}
//     })

export const addDataFile = async (url: any, data: any, token:any) => {
  try {
    const response:any = await axios.post(url, data, { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}`}
  })
    console.log('response', response.data)
    // setTimeout(() => {
    //   store.dispatch()
    // })
    return response.data
  } catch (err) {
    console.log('err', err)
    return err
  }
}

// api helper to edit data in the backend
export const editData = async (url: any, payload: any, token:any) => {
  try {
    const response:any = await axios.patch(url, payload, { headers: { Authorization: `Bearer ${token}` } })
    return response.data
  } catch (err) {
    return err
  }
}

// api helper to edit data in the backend
export const editDataPut = async (url: any, payload: any, token:any) => {
  try {
    const response:any = await axios.put(url, payload, { headers: { Authorization: `Bearer ${token}` } })
    return response.data
  } catch (err) {
    return err
  }
}

// api helper to delete data from the backend
export const removeData = async (url: any, token:any) => {
  // console.log('token here', token)
  console.log('url here', url)
  console.log('i am here')

  try {
    const response:any = await axios.delete(url, { headers: { Authorization: `Bearer ${token}` } })
    return response.data
  } catch (err) {
    return err
  }
}

// api helper to delete data from the backend
export const deleteData = async (url: any, token:any) => {
  // console.log('token here', token)
  console.log('url here', url)
  console.log('i am here')

  try {
    const response:any = await axios.post(url, { headers: { Authorization: `Bearer ${token}` } })
    return response.data
  } catch (err) {
    return err
  }
}
