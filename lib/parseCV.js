export const parseCV = async (fileInput) => {
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("x-apihub-key", process.env.API_KEY);
  myHeaders.append(
    "x-apihub-host",
    "HR-Resume-or-CV-File-Parser.allthingsdev.co"
  );
  myHeaders.append("x-apihub-endpoint", "82901f2c-a73d-4e06-87c2-db6d7b87b4b3");

  const formdata = new FormData();
  formdata.append("file", fileInput);
  formdata.append("language", "English");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      "https://HR-Resume-or-CV-File-Parser.proxy-production.allthingsdev.co/api/v1/hr/parse_resume",
      requestOptions
    );
    const result = await response.json();

    return result.job_id;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
