"use server";

export const getParsedCV = async (jobId) => {
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("x-apihub-key", process.env.NEXT_PUBLIC_API_KEY);
  myHeaders.append(
    "x-apihub-host",
    "HR-Resume-or-CV-File-Parser.allthingsdev.co"
  );
  myHeaders.append("x-apihub-endpoint", "c447dbb4-d0a2-4f1e-bfe4-eb4047dce945");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PARSER_BACKEND_URL}/job/status/${jobId}`,
    requestOptions
  );
  const result = await response.json();
  return result; // Log the full CV data
};
