import { apiService } from "./apiService";

export async function getBookingsByUser() {
    const userId = localStorage.getItem('userId')
    if (!userId) {
        return []
    }
    let response
    try {
        response = await apiService('GET', 'bookings?userId=' + userId, true);
    } catch (err) {
        //error handling
        return []
    }
    return response
}

export async function getBookingsByProduct(productId) {
    let response
    try {
        response = await apiService('GET', 'bookings?productId=' + productId, true);
    } catch (err) {
        //error handling
        return []
    }
    return response
}

export async function getBooking(id) {
    let response
    try {
        response = await apiService('GET', 'bookings/' + id, true);
    } catch (err) {
        //error handling
        return 
    }
    return response
}

export async function createBooking({ tripId, people, meetings }) {
    const userId = parseInt(localStorage.getItem('userId'))
    if (!userId) {
        return false
    }
    try {
        const payload = {
            userId: userId,
            tripId: tripId,
            people: people,
            meetings, meetings
        }
        await apiService('POST', 'bookings', true, payload);
    } catch (err) {
        //error handling
        return false
    }
    return true
}

export async function updateBooking({ bookingId, tripId, people, meetings }) {
    const userId = parseInt(localStorage.getItem('userId'))
    if (!userId) {
        return false
    }
    try {
        const payload = {
            userId: userId,
            tripId: tripId,
            people, people,
            meetings, meetings
        }
        await apiService('PUT', 'bookings/' + bookingId, true, payload);
    } catch (err) {
        //error handling
        return false
    }
    return true
}

export async function deleteBooking(bookingId) {
    try {
        await apiService('DELETE', 'bookings/' + bookingId, true);
    } catch (err) {
        //error handling
        return false
    }
    return true
}