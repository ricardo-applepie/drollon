// utils.ts
const backendUrl = "http://localhost:4000";

// Generic GET request function
export async function getData(url: string) {
  try {
    const response = await fetch(backendUrl+url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error("GET request failed", error);
    throw error; // Propagate the error to handle it later
  }
}

// Generic POST request function
export async function postData(url: string, body: object) {
  try {
    const response = await fetch(backendUrl+url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("POST request failed", error);
    throw error; // Propagate the error to handle it later
  }
}
