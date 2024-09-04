// only works with async operations in server components - all page.js file
// this file activate streaming automatically from the server to the client
// JS must be enabled for streaming

import Spinner from "@/app/_components/Spinner";

export default function Load() {
  return <Spinner />
}