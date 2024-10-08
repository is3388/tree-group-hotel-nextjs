// this file should be placed in folder where doesn't have page.js
// use this approach if you want to alter data fetching directly from the database
// page.js returns html, route.js returns only JSON data
// cannot send html and JSON data at the same time - conflict
// create different route handlers, to handle different API endpoints (when a request hit that URL)
// for each http verbs - POST, PUT, PATCH, DELETE, HEAD
// http://localhost:3000/api/cabins/cabinId - make GET request and returns response

import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

export async function GET(request, { params }) {
  const { cabinId } = params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);

    return Response.json({ cabin, bookedDates });
  } catch {
    return Response.json({ message: "Cabin not found" });
  }
}
