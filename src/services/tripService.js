import { apiService } from "./apiService";

export async function getTrips() {
  let response 
  try {
    response = await apiService('GET', 'trips', false);
  } catch (err) {
    //error handling
    return []
  }
  return response
}

export async function getTrip(id) {
  console.log(id)
  let response 
  try {
    response = await apiService('GET', 'trips/'+id, false);
  } catch (err) {
    //error handling
    return
  }
  console.log(response)
  return response
}

export async function getTripByPublisher() {
  const publisherId = localStorage.getItem('userId')
  if (!publisherId) {
    return []
  }
  let response
  try {
    response = await apiService('GET', 'trips?userId='+publisherId, false);
  } catch (err) {
    //error handling
    return []
  }
  return response
}

export async function createTrip({ title, description, img, startTrip, endTrip, pricePerPerson, meetings }) {
  const publisherId = parseInt(localStorage.getItem('userId'))
  if (!publisherId) {
    return 
  }
  try {
    const newTrip = {
      userId: publisherId,
      title,
      description,
      img: parseInt(img),
      startTrip,
      endTrip,
      pricePerPerson,
      meetings
    }
    await apiService('POST', 'trips', true, newTrip);
  } catch  {
    //error handling
    return false
  }
  return true
}

export async function updateTrip({ id, title, description, img, startTrip, endTrip, pricePerPerson, meetings }) {
  const publisherId = parseInt(localStorage.getItem('userId'))
  if (!publisherId) {
    return 
  }
  try {
    const newTrip = {
      userId: publisherId,
      title,
      description,
      img: parseInt(img),
      startTrip,
      endTrip,
      pricePerPerson,
      meetings,
      id
    }
    await apiService('PUT', 'trips/'+id, true, newTrip);
  } catch {
    //error handling
    return false
  }
  return true
}

export async function deleteTrip({ id }) {
  try {
    await apiService('DELETE', 'trips/'+id, true);
  } catch {
    return false
  }
  return true
}